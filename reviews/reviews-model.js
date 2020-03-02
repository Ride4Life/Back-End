const db = require("../data/db-config")

function find() {
    return db("reviews").select("id", "rider_id", "review", "rating")
}

function findById(id) {
    return db("reviews")
        .where({ id })
        .first()
}

function add(review) {
    return db("reviews")
        .insert(review)
        .returning("*")
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

function update(change, id) {
    return db("reviews")
        .where({ id: id })
        .update(change)
        .returning("*")
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
