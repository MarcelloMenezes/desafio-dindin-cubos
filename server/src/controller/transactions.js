const conexao = require("../database/connection");
const { format } = require('date-fns');

const cadastroFinancas = async (req, res) => {
    const { descricao, valor, data, categoria, tipo } = req.body;
    const { id } = req.usuario

    try {
        const { rows: [{ id: categoria_id }] } = await conexao.query('select id from categorias where categorias.descricao = $1', [categoria])
        
        const queryInfo = 'insert into transacoes ( descricao, valor, data, categoria_id, usuario_id, tipo) values ($1, $2, $3, $4, $5, $6)';

        const usuario = await conexao.query(queryInfo, [descricao, valor, data, categoria_id, id, tipo]);
        if (usuario.rowCount === 0) {
            return res.status(400).json({ "mensagem": "Não foi possivel enviar as informações para o sistema" });
        }
        return res.status(200).json("Informações cadastradas com sucesso")
    } catch (error) {
        return res.status(400).json(error);
    }
};

const listarFinancas = async (req, res) => {
    const { id } = req.usuario
    
    try {
        const queryCategoria = 'select transacoes.id, data, transacoes.descricao, categorias.descricao as categoria, valor, tipo from transacoes join categorias on categorias.id = transacoes.categoria_id where usuario_id = $1';
        const { rows: usuario } = await conexao.query(queryCategoria, [id])

        const semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

        for (let i = 0; i < usuario.length; i++) {
            const diaSemana = semana[(new Date(usuario[i].data).getDay())]
            usuario[i].data = format(new Date(usuario[i].data), "dd/MM/yyyy")
            usuario[i].diaSemana = diaSemana
        }

        return res.json({ financas: usuario })
    } catch (error) {
        return res.status(400).json(error);
    }
}

const excluirFinancas = async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await conexao.query('select * from transacoes where id = $1', [id]);

        if (rowCount === 0) return res.status(404).json({ "mensagem": "Informações não consta no banco de dados" })

        const query = 'delete from transacoes where id = $1';
        const { rowCount: itemExcluido } = await conexao.query(query, [id]);

        if (itemExcluido === 0) return res.status(404).json({ "mensagem": "Não foi possível excluir as informacões" })

        return res.status(200).json({ "mensagem": "Informações excluidas com sucesso" });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const editarFinancas = async (req, res) => {
    const { descricao, valor, data, categoria, tipo } = req.body;
    const { id } = req.params

    try {
        const { rows: [{ id: categoria_id }] } = await conexao.query('select id from categorias where categorias.descricao = $1', [categoria])

        const query = 'update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6';

        const { rowCount: usuario } = await conexao.query(query, [descricao, valor, data, categoria_id, tipo, id]);

        if (usuario === 0) {
            return res.status(400).json('Não foi possivel enviar as informações para o sistema');
        }
        return res.status(200).json('Informações cadastradas com sucesso')
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const extratoFinancas = async (req, res) => {
    const { id } = req.usuario

    try {
        const { rows: somaEntrada, rowCount: entrada } = await conexao.query("select sum(valor) from transacoes where (tipo = 'entrada') and (usuario_id = $1)", [id])

        const { rows: somaSaida, rowCount: saida } = await conexao.query("select sum(valor) from transacoes where tipo = 'saida' and usuario_id = $1", [id])

        if (entrada === 0 || saida === 0) return res.status(400).json({ "mensagem": "Não foi possivel enviar as informações para o sistema" })

        return res.status(200).json({ "entrada": somaEntrada, "saida": somaSaida })
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastroFinancas,
    listarFinancas,
    excluirFinancas,
    editarFinancas,
    extratoFinancas
}