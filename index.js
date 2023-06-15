import { readFileSync } from "fs";
import express, { json } from "express";
import { adicionarPartida, pegarPartidas } from "./matchs.js";
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

app.listen(port);
