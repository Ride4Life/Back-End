const db = require("../data/db-config")
const bcrypt = require("bcryptjs")

function find() {
    return db("users").select("id", "username", "department");
}

function findById(id) {
    return db("users")
        .where({id})
        .first()
}

async function add(user){
    user.password = await bcrypt.hash(user.password, 13);
    const [id] = await db("users").insert(user)

    return findById(id);
}



function findBy(filter) {
    return db("users")
        .where(filter)
        .select()
        .first()
}

module.exports = {
    find,
    add,
    findById,
    findBy
}