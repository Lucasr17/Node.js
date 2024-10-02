npm install express

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware pour parser les données JSON
app.use(express.json());

// Endpoint pour mettre à jour le fichier JSON
app.post('/update-json', (req, res) => {
    const updatedData = req.body;

    // Chemin vers le fichier JSON
    const filePath = path.join(__dirname, '../motsJOSY.json');

    // Lire le fichier JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la lecture du fichier JSON', error: err });
        }

        // Parse le contenu actuel du fichier
        let jsonData = JSON.parse(data);

        // Met à jour les données avec celles reçues
        jsonData = updatedData;

        // Écrire les nouvelles données dans le fichier
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la mise à jour du fichier JSON', error: err });
            }
            res.json({ message: 'Fichier JSON mis à jour avec succès !' });
        });
    });
});

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
