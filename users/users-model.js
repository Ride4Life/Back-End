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
    const [id] = await db("users").insert(user)

    return findById(id).returning("*")
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

async function update(change, id) {
    await db("users")
        .where({ id })
        .update(change)

    return findById(id).returning("*")
}

module.exports = {
    find,
    add,
    findById,
    findBy,
    remove,
    update
}
