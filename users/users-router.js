const router = require("express").Router()
const users = require("../users/users-model")

router.get("/:id", (req, res, next) => {
    const { id } = req.params

    users
        .findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({
                    message: "Could not find user with given id."
                })
            }
        })
        .catch(err => {
            next(err)
        })
})

router.put("/:id", async (req, res, next) => {
    // try {
    //     const { id } = req.params
    //     const changes = req.body
    //     if (users.findById(id) != {}) {
    //         const updatedUser = await users.update(changes, id)
    //         res.status(200).json({ updatedUser })
    //     } else {
    //         res.status(404).json({
    //             message: "Could not find user with given id."
    //         })
    //     }
    const { id } = req.params
    const changes = req.body
    users
        .findById(id)
        .then(user => {
            if (user) {
                users.update(changes, id).then(updatedUser => {
                    res.status(200).json({ updatedUser })
                })
            } else {
                res.status(404).json({
                    message: "Could not find user with given id."
                })
            }
        })
        .catch(err => {
            next(err)
        })
})

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params

        const deletedUser = await users.remove(id)
        res.status(200).json({
            message: `Successfully deleted users profile`
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router
