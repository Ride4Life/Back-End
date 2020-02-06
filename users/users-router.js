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

// router.delete("/profile/:id", (req, res) => {
//     const id = req.params.id
//     // or we could destructure it like so: const { id } = req.params;
//     res.status(200).json({
//         url: `/hobbits/${id}`,
//         operation: `DELETE for hobbit with id ${id}`
//     })
// })

module.exports = router
