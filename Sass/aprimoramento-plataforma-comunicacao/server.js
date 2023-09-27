

const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para receber os dados do formulário e salvá-los em um arquivo JSON
app.post("/saveData", (req, res) => {
    const data = req.body;

    // Carrega os dados existentes (se houver) do arquivo JSON
    let existingData = [];
    try {
        const rawData = fs.readFileSync("data.json");
        existingData = JSON.parse(rawData);
    } catch (error) {
        console.error("Erro ao carregar dados existentes:", error);
    }

    // Adiciona os novos dados ao array existente
    existingData.push(data);

    // Salva os dados atualizados de volta no arquivo JSON
    fs.writeFileSync("data.json", JSON.stringify(existingData, null, 2));

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
