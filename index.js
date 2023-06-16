import express, { json } from "express";
import { adicionarPartida, pegarPartidas, removerPartida } from "./matchs.js";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(json());

app.get("/partidas", (req, res) => {
    const partidas = pegarPartidas();
    res.status(200).json(partidas);
});

app.put("/partidas", (req, res) => {
    const partida = req.body;
    adicionarPartida(partida);
    res.status(200).json({ message: "ok" });
});

app.delete("/partidas", (req, res) => {
    const idPartida = req.query.id;
    removerPartida(idPartida);
    res.status(200).json({ message: "ok" });
});

app.listen(port);
