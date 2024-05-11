const express = require('express')
const db = require('./config/connection') //connect to mongoose
const routes = require('./routes/routes');

const PORT = 3333
const app = express()

app.use(express.urlencoded({ extended: true })) //send url encoded data through routes
app.use(express.json()) //send json data through routes

app.use('/api', routes)

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
    })
  })