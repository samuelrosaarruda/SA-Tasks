const express = require('express');
const { criarTarefa, listarTarefas, detalharTarefa, atualizarTarefa, removerTarefa } = require('./controladores/recursos_tarefas');

const rotas = express();

rotas.post("/tasks", criarTarefa);
rotas.get("/tasks", listarTarefas);
rotas.get("/tasks/:id", detalharTarefa);
rotas.put("/tasks/:id", atualizarTarefa);
rotas.delete("/tasks/:id", removerTarefa);

module.exports = rotas;