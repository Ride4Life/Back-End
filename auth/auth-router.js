const router = require("express").Router()
const users = require("../users/users-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = require("../config/secret")


router.post('/sign-up', async (req, res, next) => {
    const {username, password } = req.body

    if(username && password) {
        try {
            const user = await users.add(req.body)

            res.status(201).json(user)
        } catch (err) {
            next()
        }
    } else {
        res.status(401).json({message:"Please include username & password}"})
    }

})