"use strict";
const express = require('express');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const app = express();
const multer = require('multer');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());
app.use(cors());
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8080/', // Original URL.
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

app.get("/words", async function(req, res) {
  try {
    let db = await getDBConnection();
    let qry = "SELECT word FROM words ORDER By RANDOM() LIMIT 4";
    let rows = await db.all(qry);
    let words = [];
    for (let i in rows) {
      let row = rows[i];
      let word = row['word'];
      words.push(word);
    }
    res.type("json").send(words);
  } catch (error) {
    console.log(error);
    res.type("text");
    res.status(500).send("An error occurred on the server. Try again later.");
  }
});

/**
 * Establishes a database connection to the database and returns the database object.
 * Any errors that occur should be caught in the function that calls this one.
 * @return {Object} the database object for the connection.
 */
async function getDBConnection() {
  const db = await sqlite.open({
    filename: "words.db",
    driver: sqlite3.Database
  });

  return db;
}

app.use(express.static("public"));
const portNum = 8080;
const PORT = process.env.PORT || portNum;
app.listen(PORT);