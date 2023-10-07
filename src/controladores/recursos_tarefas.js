let { tarefas } = require('../bancodedados');

const criarTarefa = (req, res) => {
    const { titulo, descricao, dataVencimento, statusDaTarefa } = req.body;

    if (!titulo || !descricao || !dataVencimento || !statusDaTarefa) {
        return res.status(400).json({ mensagem: 'Titulo, descrição, data de vencimento e status da tarefa, são obrigatórios.' });
    };

    const tarefaJaExistente = tarefas.find((tarefa) => {
        return tarefa.titulo === titulo;
    });

    if (tarefaJaExistente) {
        return res.status(400).json({ mensagem: `Já existe uma tarefa com este titulo (${titulo}), por favor insira uma nova tarefa ou exclua a presente tarefa.` });
    };

    tarefas.push({
        id: tarefas.length + 1, titulo, descricao, dataVencimento, statusDaTarefa
    });

    return res.status(204).json();
};

const listarTarefas = (req, res) => {
    return res.json(tarefas);
};

const detalharTarefa = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensagem: 'Para encontrar a tarefa desejada é nescessário fornecer o indentificador desta tarefa.' });
    };

    const tarefaEncontrada = tarefas.find((tarefa) => {
        return tarefa.id === Number(id);
    });

    if (!tarefaEncontrada) {
        return res.status(404).json({ mensagem: 'A tarefa solicilita no indentidicador passado, não foi encontrada.' });
    };

    return res.json(tarefaEncontrada);
};

const atualizarTarefa = (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, dataVencimento, statusDaTarefa } = req.body;

    if (!id) {
        return res.status(400).json({ mensagem: 'Para encontrar a tarefa desejada é nescessário fornecer o indentificador desta tarefa.' });
    };

    const tarefaEncontrada = tarefas.find((tarefa) => {
        return tarefa.id === Number(id);
    });

    if (!tarefaEncontrada) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada pelo indentificador passado' });
    };

    if (!titulo || !descricao || !dataVencimento || !statusDaTarefa) {
        return res.status(400).json({ mensagem: 'Titulo, descrição, data de vencimento e status da tarefa, são obrigatórios.' });
    };

    const tarefaJaExistente = tarefas.find((tarefa) => {
        return tarefa.titulo === titulo;
    });

    if (tarefaJaExistente) {
        return res.status(400).json({ mensagem: `Já existe uma tarefa com este titulo (${titulo}), por favor insira uma nova tarefa ou exclua a presente tarefa.` });
    };

    tarefaEncontrada.titulo = titulo;
    tarefaEncontrada.descricao = descricao;
    tarefaEncontrada.dataVencimento = dataVencimento;
    tarefaEncontrada.statusDaTarefa = statusDaTarefa;

    return res.status(204).json();
};

const removerTarefa = (req, res) => {
    const { id } = req.params;

    const tarefaEncontrada = tarefas.find((tarefa) => {
        return tarefa.id === Number(id);
    });

    if (!tarefaEncontrada) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada pelo indentificado passado' });
    };

    tarefas = tarefas.filter((tarefa) => {
        return tarefa !== tarefaEncontrada;
    });

    return res.status(204).json();
};

module.exports = {
    criarTarefa,
    listarTarefas,
    detalharTarefa,
    atualizarTarefa,
    removerTarefa
};