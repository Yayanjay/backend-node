require('dotenv').config()
const express = require('express');
const db = require('./src/configs/db')
const routes = require('./src/main')

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(routes)
db.connection()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})