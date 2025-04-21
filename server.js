
const express = require("express");
const fs = require("fs");
const cron = require("node-cron");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const filePath = path.join(__dirname, "data", "sealed-products.json");

// Tâche cron toutes les 24h à minuit
cron.schedule("0 0 * * *", () => {
  console.log("⏰ Mise à jour quotidienne du CSV scellé");
  require("./fetchSealed");
});

// Endpoint principal
app.get("/sealed-products", (req, res) => {
  if (!fs.existsSync(filePath)) {
    return res.status(503).json({ error: "Les données ne sont pas encore disponibles. Réessaie dans quelques minutes." });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur de lecture du fichier JSON." });
    }
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

app.get("/", (req, res) => {
  res.send("API de produits scellés Pokémon - en ligne ✅");
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
