const router = require("express").Router()
const users = require("../users/users-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = require("../config/secrets")

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: "1d"
    }

    return jwt.sign(payload, secret.jwtSecret, options)
}

router.post("/signup", async (req, res, next) => {
    const { username, password } = req.body

    if (username && password) {
        try {
            const user = await users.add(req.body)
            const token = generateToken(user)
            res.status(201).json({ token, message: `Welcome ${user.username}` })
            // res.status(201).json({message: `Welcome ${user.username}`})
        } catch (err) {
            next(err)
        }
    } else {
        res.status(401).json({ message: "Please include username & password" })
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body

        const user = await users.findBy({ username }).first()
        const passwordValid = await bcrypt.compare(password, user.password)

        if (user && passwordValid) {
            const token = generateToken(user)

            res.status(200).json({ token, message: `Welcome ${user.username}` })
        } else {
            res.status(401).json({ message: "Invalid credentials" })
        }
    } catch (err) {
        next()
    }
})

module.exports = router
