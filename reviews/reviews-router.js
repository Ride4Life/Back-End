const router = require("express").Router()
const reviews = require("./reviews-model")
const users = require("../users/users-model")

router.get("/:id/reviews", async (req, res, next) => {
    const { id } = req.params

    const driverReviews = await reviews.findByDriverId(id)
    try {
        res.status(200).json(driverReviews)
    } catch (err) {
        next(err)
    }
})

router.post("/:id/reviews", async (req, res, next) => {
    const { id } = req.params
    const { rider_id, review, rating } = req.body

    const driver_id = {
        driver_id: id
    }
    const reviewObject = { ...req.body, ...driver_id }
    console.log(reviewObject)

    if (rider_id && review && rating) {
        try {
            const review = await reviews.add(reviewObject)

            res.status(201).json({ message: `Thanks for the review!` })
        } catch (err) {
            next(err)
        }
    } else {
        res.status(401).json({
            message: "Please include rating, review, & driver_id"
        })
    }
})

// router.put("/:userid/reviews/:reviewid", async (req, res, next) => {
//     const { id } = req.params
//     const changes = req.body
//     users
//         .findById(id)
//         .then(user => {
//             if (user) {
//                 users.update(changes, id).then(updatedUser => {
//                     res.status(200).json({ updatedUser })
//                 })
//             } else {
//                 res.status(404).json({
//                     message: "Could not find user with given id."
//                 })
//             }
//         })
//         .catch(err => {
//             next(err)
//         })
// })

// router.delete("/:userid/reviews/:reviewid", (req, res) => {
//     const id = req.params.id
//     // or we could destructure it like so: const { id } = req.params;
//     res.status(200).json({
//         url: `/hobbits/${id}`,
//         operation: `DELETE for hobbit with id ${id}`
//     })
// })

module.exports = router
