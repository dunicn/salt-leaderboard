import express from 'express'
import mongoose from 'mongoose'
import player from './model.js';
import jsonParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config()

// console.log(process.env.MONGO_USERNAME)

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mflix.x7rlcqp.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);

const app = express()

app.use(express.static(path.resolve(__dirname, '../client/build')));

const addPlayer = (data) => {
  const newPlayer = new player({
    name: data.name,
    score: data.score
  })

  return newPlayer
}

app.get('/api/players', (req, res) => {
  player.find()
    .then((result) => res.send(result))
    .catch(err => console.log(err))
})

app.post('/api/players', jsonParser.json(), async (req, res) => {
  await addPlayer(req.body)
    .save()
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(8080)
