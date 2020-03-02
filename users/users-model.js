const db = require("../data/db-config")
const bcrypt = require("bcryptjs")

function find() {
    return db("users").select("id", "username", "department", "phone_number")
}

function findById(id) {
    return db("users")
        .where({ id })
        .first()
}

async function add(user) {
    user.password = await bcrypt.hash(user.password, 13)
    return db("users")
        .insert(user)
        .returning("*")
}

function findBy(filter) {
    return db("users")
        .where(filter)
        .select()
        .first()
}

function remove(id) {
    return db("users")
        .where({ id })
        .delete()
}

function update(change, id) {
    return db("users")
        .where({ id })
        .update(change)
        .returning("*")
}

module.exports = {
    find,
    add,
    findById,
    findBy,
    remove,
    update
}
