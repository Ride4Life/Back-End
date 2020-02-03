//Create Express Server
const express = require("express")
const server = express()
//Import Middleware
const helmet = require("helmet")
const cors = require("cors")
const morgan = require("morgan")

//TODO Server Routes
const authRouter = require("./auth/auth-router")


// global middleware
server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(morgan())


//TODO Setup Routers

server.use('/api/auth', authRouter)

const PORT = process.env.PORT|| 3333

server.get('/', (req, res) => {
    res.send("Need a Ride?")
})

server.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})