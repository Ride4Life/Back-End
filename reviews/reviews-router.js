const router = require("express").Router()
const reviews = require("./reviews-model")
const users = require("../users/users-model")

router.post("/reviews/:id", async (req, res, next) => {
    const id = req.params.id

    const { username, review, rating } = req.body

    const user = await users.findById({ id })
})

server.delete("/hobbits/:id", (req, res) => {
    const id = req.params.id
    // or we could destructure it like so: const { id } = req.params;
    res.status(200).json({
        url: `/hobbits/${id}`,
        operation: `DELETE for hobbit with id ${id}`
    })
})