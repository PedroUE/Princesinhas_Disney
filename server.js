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

app.get ("/princesas/nome/:nome", (req, res) => {
   
    let nome = req.params.nome.toLowerCase();

    const princesasEncontradas = princesas.filter(p => p.nome.toLowerCase().includes(nome));

    if (princesasEncontradas.length > 0) {
   
    res.status(200).json(princesasEncontradas);
} else {

    res.status(404).json({
        mensagem: "prinsa(s) nao encontrada(s)!"
    });
}
});

app.listen(serverPorter, () => {
    console.log(`Servidor funcionando na porta http://localhost:${serverPorter}`)
});