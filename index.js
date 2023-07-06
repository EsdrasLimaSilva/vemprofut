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
    res.status(200).send(partidas);
});

//adiciona uma nova partida
app.put("/partidas", (req, res) => {
    const partida = req.body;
    const partidas = adicionarPartida(partida);

    res.status(200).json(partidas);
});

//delte uma partida
app.delete("/partidas", (req, res) => {
    const idPartida = req.query.id;
    const partidas = removerPartida(idPartida);
    res.status(200).json(partidas);
});

//resolve uma requisição de uma partida específica
app.get("/partida/:idPartida", (req, res) => {
    const partida = buscarPartida(req.params.idPartida);
    res.status(200).send(partida);
});

//atualiza um jogador especifigo se ele existir. Caso contrário cria um novo jogador
app.put("/jogador", (req, res) => {
    const body = req.body;

    let partidaAtualizada;

    if (!req.body.novoJogador) {
        partidaAtualizada = atualizarJogador(body.idPartida, body.jogador);
    } else {
        partidaAtualizada = adicionarJogador(
            req.body.idPartida,
            req.body.jogador
        );
    }
    res.send(partidaAtualizada);
});

app.delete("/jogador", (req, res) => {
    const idJogador = req.query.idJogador;
    const idPartida = req.query.idPartida;

    const partida = removerJogador(idPartida, idJogador);

    res.status(200).json(partida);
});

app.listen(port);
