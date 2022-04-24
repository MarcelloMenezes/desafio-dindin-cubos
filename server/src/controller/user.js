const conexao = require("../database/connection");
const bcrypt = require('bcrypt');

const obterUsuario = async (req, res) => {
    const { id } = req.usuario

    try {
        const query = 'select * from usuarios where id = $1';
        const { rows, rowCount } = await conexao.query(query, [id])

        if (rowCount === 0) return res.status(404).json({ "mensagem": "Usuario não encontrado" })

        const { senha, ...usuario } = rows[0]

        res.status(200).json(usuario)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id, email: emailUsuario } = req.usuario

    if (!nome) return res.status(400).json({ "mensagem": "O campo nome é obrigatório" });
    if (!email) return res.status(400).json({ "mensagem": "O campo email é obrigatório" });
    if (!senha) return res.status(400).json({ "mensagem": "O campo senha é obrigatório" });
    try {
        const query = 'select * from usuarios where email = $1';
        
        const { rows: usuarioLogin } = await conexao.query(query, [emailUsuario]);

        const queryId = 'select * from usuarios where email = $1';

        const { rows: quantidadeUsuarios } = await conexao.query(queryId, [id]);

        if (quantidadeUsuarios && !usuarioLogin) return res.status(404).json({ "mensagem": "Já existe usuário cadastrado com o e-mail informado." });

        const hash = await bcrypt.hash(senha, 10)

        const queryUsuario = 'update usuarios set nome = $1, email = $2, senha = $3 where id = $4';
 
        const { rowCount: usuario } = await conexao.query(queryUsuario, [nome, email, hash, id]);

        if (!usuario) return res.status(400).json({ "mensagem": "Não foi possivel cadastrar o usuário" });

        return res.status(200).json({ "mensagem": "Usuário atualizado com sucesso" })

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    obterUsuario,
    atualizarUsuario
}