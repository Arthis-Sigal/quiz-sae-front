const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // votre nom d'utilisateur MySQL
  password: '', // votre mot de passe MySQL
  database: 'sae_quiz_ddb', // nom de votre base de données
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database.');
});

// Route to handle the form submission
app.post('/submit', (req, res) => {
  const { name, firstname, contact, score, time, rgpd, newletters } = req.body;

  const sql = `INSERT INTO user (name, firstname, contact, score, time, rgpd, newsletter) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name, firstname, contact, score, time, rgpd, newletters ? 1 : 0], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting data');
    } else {
      res.status(200).send('Data inserted successfully');
    }
  });
});

// Route to get the top 10 scores
app.get('/scores', (req, res) => {
    const sql = `
      SELECT firstname, score, time
      FROM user
      ORDER BY score DESC, time ASC
      LIMIT 10
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching scores');
      } else {
        res.status(200).json(results);
      }
    });
  });
  

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
