const express = require('express');
const categorias = require('../controller/category')
const transacoes = require('../controller/transactions');
const usuario = require ('../controller/user');
const usuarios = require('../controller/users');
const verificaLogin = require('../filters/verifyLogin');
const rotas = express();

//usuarios
rotas.post('/usuario', usuarios.cadastrar)
rotas.post('/login', usuarios.login)

rotas.use(verificaLogin)

//Usuario
rotas.get('/usuario', usuario.obterUsuario)
rotas.put('/usuario', usuario.atualizarUsuario)

//categorias
rotas.get('/categoria', categorias.listaCategorias)

//transacões
rotas.post('/transacao', transacoes.cadastroFinancas)
rotas.get('/transacao', transacoes.listarFinancas)
rotas.delete('/transacao/:id', transacoes.excluirFinancas)
rotas.put('/transacao/:id', transacoes.editarFinancas)
rotas.get('/transacoes/extrato', transacoes.extratoFinancas)

module.exports = rotas;