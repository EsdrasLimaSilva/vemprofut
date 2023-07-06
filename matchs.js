const fs = require("fs");

//recebe as partidas e escreve elas no arquivo json
const escreverPartidas = (partidas) => {
    fs.writeFileSync("./partidas.json", JSON.stringify(partidas), {
        encoding: "utf-8",
    });
};

//lê as partidas no arquivo json e retorna elas
const pegarPartidas = () => {
    const file = fs.readFileSync("./partidas.json", "utf-8");
    return JSON.parse(file);
};

//busca uma determinada partida no arquivo
const buscarPartida = (idPartida) => {
    const partidas = pegarPartidas();
    return partidas.find((partida) => String(partida._id) === idPartida);
};

//adiciona uma nova partida e retorna todas as partidas (incluindo a criada)
const adicionarPartida = (partida) => {
    const partidas = pegarPartidas();
    partidas.push(partida);
    escreverPartidas(partidas);

    return partidas;
};

//remove uma partida específica
const removerPartida = (idPartida) => {
    const partidas = pegarPartidas();
    const novasPartidas = partidas.filter(
        (partida) => partida._id != idPartida
    );
    escreverPartidas(novasPartidas);

    return novasPartidas;
};

//atualiza os dados de um jogador específico
const atualizarJogador = (idPartida, jogador) => {
    const partidas = pegarPartidas();
    const partidaIndex = partidas.findIndex(
        (partida) => partida._id === idPartida
    );
    const jogadorIndex = partidas[partidaIndex].jogadores.findIndex(
        (jgdr) => jgdr._id === jogador._id
    );
    partidas[partidaIndex].jogadores[jogadorIndex] = jogador;

    escreverPartidas(partidas);

    return partidas[partidaIndex];
};

//cria um novo jogador
const adicionarJogador = (idPartida, jogador) => {
    const partidas = pegarPartidas();
    const partidaIndex = partidas.findIndex(
        (partida) => +partida._id === +idPartida
    );

    partidas
        .find((partida) => partida._id === idPartida)
        .jogadores.push(jogador);

    escreverPartidas(partidas);

    return partidas[partidaIndex];
};

//exclui um jogador específico de uma partida específica
const removerJogador = (idPartida, idJogador) => {
    const partidas = pegarPartidas();
    const partidaIndex = partidas.findIndex(
        (partida) => +partida._id === +idPartida
    );

    partidas[partidaIndex].jogadores = partidas[partidaIndex].jogadores.filter(
        (jogador) => jogador._id !== idJogador
    );
    escreverPartidas(partidas);

    return partidas[partidaIndex];
};

//exportando todas as funções
module.exports = {
    escreverPartidas,
    pegarPartidas,
    adicionarPartida,
    removerPartida,
    buscarPartida,
    atualizarJogador,
    adicionarJogador,
    removerJogador,
};
