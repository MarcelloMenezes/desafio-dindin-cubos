const bcrypt = require('bcrypt');
const conexao = require("../database/connection");
const jwt = require('jsonwebtoken');
const jwtSecret = require('../services/jwtSecret');

const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome) return res.status(400).json({ "mensagem": "O campo nome é obrigatório" });
    if (!email) return res.status(400).json({ "mensagem": "O campo email é obrigatório" });
    if (!senha) return res.status(400).json({ "mensagem": "O campo senha é obrigatório" });

    try {
        const query = 'select * from usuarios where email = $1';
        const { rowCount: quantidadeUsuarios } = await conexao.query(query, [email]);

        if (quantidadeUsuarios) return res.status(404).json({ "mensagem": "Já existe usuário cadastrado com o e-mail informado." });

        const hash = await bcrypt.hash(senha, 10)
        const queryUsuario = 'insert into usuarios (nome, email, senha) values ($1, $2, $3)';

        const { rowCount: usuario } = await conexao.query(queryUsuario, [nome, email, hash]);

        if (!usuario) return res.status(400).json({ "mensagem": "Não foi possivel cadastrar o usuário" });

        return res.status(200).json({ "mensagem": "Usuário cadastrado com sucesso" })

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email) return res.status(400).json({ "mensagem": "O campo email é obrigatório" });
    if (!senha) return res.status(400).json({ "mensagem": "O campo senha é obrigatório" });

    try {
        const queryEmail = 'select * from usuarios where email = $1';
        const usuarios = await conexao.query(queryEmail, [email]);

        if (usuarios.rowCount === 0) {
            return res.status(400).json({ "mensagem": "Email e senha não conferem" });
        }

        const infoUsuario = usuarios.rows[0];

        const senhaVerificada = await bcrypt.compare(senha, infoUsuario.senha)

        if (!senhaVerificada) return res.status(400).json({ "mensagem": "Email e senha não conferem" })

        const token = jwt.sign({
            id: infoUsuario.id
        }, jwtSecret, {
            expiresIn: "6h"
        });

        const { senha: senhaUsuario, ...usuario } = infoUsuario

        return res.json({ usuario, token });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrar,
    login
};