const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

/**
 partida = {
    _id: string;
    titulo: string;
    local: string;
    horario: string;
    listaDePresenca: {nome: string; telefone: string; confirmado: false}[];

 }
 */

app.use(express.static("public"));
app.use(express.json());

app.get("/partidas", (req, res) => {
    const file = fs.readFileSync("./partidas.json", "utf-8");
    res.send(file);
});

app.put("/partidas", (req, res) => {
    // const body = req.body;
    // fs.writeFileSync("./partidas.json", JSON.stringify(body), {
    //     encoding: "utf-8",
    // });
    // file = fs.readFileSync("./partidas.json", "utf-8");
    // res.json(file);
});

app.listen(port);
