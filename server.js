
const express = require("express");
const fs = require("fs");
const cron = require("node-cron");
const fetchCSV = require("./fetchSealed");

const app = express();
const PORT = process.env.PORT || 3000;

// Tâche cron toutes les 24h à minuit
cron.schedule("0 0 * * *", () => {
  console.log("⏰ Mise à jour quotidienne du CSV scellé");
  require("./fetchSealed");
});

// Endpoint pour obtenir les données
app.get("/sealed-products", (req, res) => {
  fs.readFile("./data/sealed-products.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur de lecture des données" });
    }
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

app.get("/", (req, res) => {
  res.send("API de produits scellés Pokémon - OK");
});

app.listen(PORT, () => {
  console.log(`✅ Serveur en ligne sur http://localhost:${PORT}`);
});
