const express = require('express');
const cors = require('cors');
const rotas = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(cors())
app.use(rotas);

app.listen(8000, () => console.log("Servidor rodando na porta 8000"));