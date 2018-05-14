const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const JSONMecha = require('mecha-js').JSONMecha
const notes = new JSONMecha(path.join(__dirname, 'notes.json'))
const uuid = require('uuid/v4')

app.disable('x-powered-by')

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

// Install the `cors` package and use it as middleware

app.get('/notes', (req, res) => {
  const data = notes.get()
  console.log(data)
  res.json(data)
})

app.get('/notes/:id', (req, res) => {
  const id = req.params.id
  const data = notes.find({ prop: [ 'id', id ] })
  res.json(data)
})

app.post('/notes', (req, res) => {
  const id = uuid()
  const note = { id, ...req.body }
  const data = notes.create(note)
  res.status(201).json(data)
})

app.put('/notes/:id', (req, res) => {
  const id = req.params.id
  const note = { ...req.body }
  const data = notes.update({ prop: [ 'id', id ] }, note)
  res.json(data)
})

app.delete('/notes/:id', (req, res) => {
  const id = req.params.id
  const data = notes.destroy({ prop: [ 'id', id ] })
  res.json(data)
})

app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  const message = err.message || 'Something went wrong!'
  res.status(status).json({ error: { status, message }})
})

app.use((req, res, next) => {
  res.status(404).json({ error: { status: 404, message: `Not Found` }})
})

const listener = () => `Listening on port ${port}!`
app.listen(port, listener)

module.exports = app
