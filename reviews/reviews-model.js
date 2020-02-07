const db = require("../data/db-config")

function find() {
    return db("reviews").select("id", "rider_id", "review", "rating")
}

function findById(id) {
    return db("reviews")
        .where({ id })
        .first()
}

async function add(review) {
    const [id] = await db("reviews").insert(review)

    return findById(id)
}

function findBy(filter) {
    return db("reviews")
        .where(filter)
        .select()
        .first()
}

function findByDriverId(id) {
    return db("reviews")
        .where({ driver_id: id })
        .select()
}

function remove(id) {
    return db("reviews")
        .where({ id: id })
        .delete()
}

async function update(change, id) {
    await db("reviews")
        .where({ id: id })
        .update(change)
    return findById(id)
}

module.exports = {
    find,
    add,
    findById,
    findBy,
    remove,
    update,
    findByDriverId
}
