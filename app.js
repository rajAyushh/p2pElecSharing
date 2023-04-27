const port = 8080

const express = require('express')
const cors = require('cors')

const connectDB = require('./db')
const { connect } = require('./start/router')
const gridPeakPrice = 4;
const peerPeekPrice = 3;
const gridOffPeakPrice = 2;
const peerOffPeakPrice = 1;

console.log("Connecting to DB...")
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', require('./start/router'))

const server = app.listen(port, () => {
    console.log(`App is now running on port ${port}...`)
})

module.exports = server