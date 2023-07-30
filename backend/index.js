const { writeFile } = require('fs').promises;
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000

app.use(express.json());
app.use(cors());
app.use(express.static('public'))

//On va chercher le fichier scores.json
let scores = require('./scores.json');


app.post('/scores/add/:score', (req, res) => { //On ajoute un score au fichier scores.json
        let value = req.params.score;
        scores.unshift({score: value});
        writeFile('./scores.json', JSON.stringify(scores), 'utf-8');
        res.send('Score added').end();
    });
    

app.get('/scores', (req, res) => { //On retourne la liste des scores présent dans le fichier scores.json
        res.send(scores).end();
    });


//A la fin
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

/*
 Cette API permet de:
- 1) ajouter un nouveau score dans un fichier (nommé scores.txt ou scores.json) côté serveur lors d'un appel d'API du type /scores/add/9 -> ajoute 9 à la suite du fichier
- 2) retourner la liste des scores présent dans le fichier de scores lors d'un appel d'API du type /scores
- (en option) on pourra relier l'api à notre application frontend dans de sauvegarder le score des joueurs et d'afficher le meilleur score et le nombre de parties jouées dans le dashboard
*/