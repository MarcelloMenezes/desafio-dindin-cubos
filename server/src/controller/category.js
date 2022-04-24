const conexao = require("../database/connection");

const listaCategorias = async (req, res) => {

    try {
        const { rows: categoriasSaida } = await conexao.query("select descricao from categorias where classe = $1", ['saida'])

        const { rows: categoriasEntrada } = await conexao.query("select descricao from categorias where classe = $1", ['entrada'])

        res.status(200).json({ categoriasSaida, categoriasEntrada });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }

}

module.exports = {
    listaCategorias
}