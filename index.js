const express = require("express");
const { json } = require("express");
const path = require("path");

const {
    adicionarPartida,
    pegarPartidas,
    removerPartida,
    buscarPartida,
    atualizarJogador,
    adicionarJogador,
    removerJogador,
} = require("./matchs.js");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "/public")));
app.use(json());

//retorna todas as partidas
app.get("/partidas", (req, res) => {
    const partidas = pegarPartidas();
    res.status(200).json(partidas);
});

//adiciona uma nova partida
app.put("/partidas", (req, res) => {
    const partida = req.body;
    adicionarPartida(partida);
    res.status(200).json({ message: "ok" });
});

//delte uma partida
app.delete("/partidas", (req, res) => {
    const idPartida = req.query.id;
    removerPartida(idPartida);
    res.status(200).json({ message: "ok" });
});

//resolve uma requisição de uma partida específica
app.get("/partida/:idPartida", (req, res) => {
    const partida = buscarPartida(req.params.idPartida);
    res.status(200).send(partida);
});

//atualiza um jogador especifigo
app.put("/jogador", (req, res) => {
    const body = req.body;

    console.log(req.body.novoJogador);

    if (!req.body.novoJogador) atualizarJogador(body.idPartida, body.jogador);
    else adicionarJogador(req.body.idPartida, req.body.jogador);
    res.json({ message: "ok" });
});

app.delete("/jogador", (req, res) => {
    const idJogador = req.query.idJogador;
    const idPartida = req.query.idPartida;

    removerJogador(idPartida, idJogador);

    res.status(200).json({ message: "ok" });
});

app.listen(port);
