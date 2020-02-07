//Create Express Server
const express = require("express")
const server = express()
//Import Middleware
const helmet = require("helmet")
const cors = require("cors")
const morgan = require("morgan")

//Env Variables
const dotenv = require("dotenv")
dotenv.config()

//Import Server Routes
const authRouter = require("./auth/auth-router")
const rideRouter = require("./rides/rides-router")
const userRouter = require("./users/users-router")
const reviewRouter = require("./reviews/reviews-router")

// global middleware
server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(morgan())

//Setup Routers

server.use("/api/auth", authRouter)
server.use("/api/ride", rideRouter)
server.use("/api/profile", userRouter)
server.use("/api/profile", reviewRouter)

const PORT = process.env.PORT

server.get("/", (req, res) => {
    res.send("Need a Ride?")
})

server.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500

    if (err) {
        return res.status(statusCode).json({
            message:
                err.message || "oh no some awful happened and theres no message"
        })
    }
    next()
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

module.exports = server
