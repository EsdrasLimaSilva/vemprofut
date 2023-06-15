import fs from "fs";

export const pegarPartidas = () => {
    const file = fs.readFileSync("./partidas.json", "utf-8");
    return JSON.parse(file);
};

export const adicionarPartida = (partida) => {
    const partidas = pegarPartidas();
    partidas.push(partida);
    fs.writeFileSync("./partidas.json", JSON.stringify(partidas), {
        encoding: "utf-8",
    });
};
