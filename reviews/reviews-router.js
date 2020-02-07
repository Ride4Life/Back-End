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

router.put("/:id/reviews/:reviewid", async (req, res, next) => {
    const id = req.params.reviewid
    const changes = req.body

    try {
        const updatedReview = reviews.update(changes, id)
        res.status(204).json({ message: `Update successful` })
    } catch (err) {
        next(err)
    }
})

router.delete("/:id/reviews/:reviewid", async (req, res, next) => {
    const reviewid = req.params.reviewid

    try {
        const removedReview = await reviews.remove(reviewid)

        res.status(200).json({ removedReview })
    } catch (err) {
        next(err)
    }
})

module.exports = router
