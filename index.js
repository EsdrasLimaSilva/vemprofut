const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

/**
 partida = {
    titulo: string;
    local: string;
    horario: string;
    listaDePresenca: {nome: string; telefone: string; confirmado: false}[];

 }
 */

app.use(express.static("public"));
app.use(express.json());

app.get("/fut", (req, res) => {
    const file = fs.readFileSync("./data.json", "utf-8");
    res.json(file);
});

app.put("/fut", (req, res) => {
    const body = req.body;
    fs.writeFileSync("./data.json", JSON.stringify(body), {encoding: "utf-8"});

    file = fs.readFileSync("./data.json", "utf-8");

    res.json(file);
})

app.listen(port);