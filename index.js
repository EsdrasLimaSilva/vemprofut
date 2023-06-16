const express = require("express");
const { json } = require("express");
const path = require("path");

const {
    adicionarPartida,
    pegarPartidas,
    removerPartida,
    buscarPartida,
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

app.listen(port);
