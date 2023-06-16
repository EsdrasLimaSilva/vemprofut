const fs = require("fs");

const escreverPartidas = (partidas) => {
    fs.writeFileSync("./partidas.json", JSON.stringify(partidas), {
        encoding: "utf-8",
    });
};

const pegarPartidas = () => {
    const file = fs.readFileSync("./partidas.json", "utf-8");
    return JSON.parse(file);
};

const adicionarPartida = (partida) => {
    const partidas = pegarPartidas();
    partidas.push(partida);
    escreverPartidas(partidas);
};

const removerPartida = (idPartida) => {
    const partidas = pegarPartidas();
    const novasPartidas = partidas.filter(
        (partida) => partida._id != idPartida
    );
    escreverPartidas(novasPartidas);
};

module.exports = {
    escreverPartidas,
    pegarPartidas,
    adicionarPartida,
    removerPartida,
};
