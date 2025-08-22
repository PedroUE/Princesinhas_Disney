import express from "express";
import princesas from "./src/data/princesas.js";

const app = express();
const serverPorter = 3002;

app.get ("/", (req, res) => {
    res.send("Bem-vindos(as) ao reino mágico das Princesas Disney! ✨👑");
});


app.get ("/princesas", (req, res) => {
    res.json(princesas);
});

app.get ("/princesas/id/:id", (req, res) => {
    let id = req.params.id;

    id = parseInt(id);

    const princesa = princesas.find(p => p.id === id);

    if (princesa) {
        res.status(200).json({
            success: true,
            message: `princesa ${princesa.nome} encontrada! ⚡`,
            data: princesa
        });
    } else {
        
        res.status(404).json({
            success: false,
            error: "princesa não encontrada 😕",
            message: `Nenhuma princesa com ID ${id} foi encontrada`,
        });
    }
});


app.listen(serverPorter, () => {
    console.log(`Servidor funcionando na porta http://localhost:${serverPorter}`)
});