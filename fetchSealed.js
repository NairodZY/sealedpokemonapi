
const fs = require("fs");
const https = require("https");
const csv = require("csv-parser");

const URL = "https://tcgcsv.com/pokemon/sealed.csv";
const OUTPUT = "./data/sealed-products.json";

function fetchCSVAndConvertToJSON() {
  const results = [];

  https.get(URL, (res) => {
    res
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        fs.writeFileSync(OUTPUT, JSON.stringify(results, null, 2));
        console.log("✔️ Produits scellés mis à jour !");
      });
  }).on("error", (err) => {
    console.error("Erreur de téléchargement du CSV:", err.message);
  });
}

fetchCSVAndConvertToJSON();
