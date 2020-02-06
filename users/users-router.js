const router = require("express").Router()
const users = require("../users/users-model")

router.delete("/profile/:id", (req, res) => {
    const id = req.params.id
    // or we could destructure it like so: const { id } = req.params;
    res.status(200).json({
        url: `/hobbits/${id}`,
        operation: `DELETE for hobbit with id ${id}`
    })
})
