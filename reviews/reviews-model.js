const db = require("../data/db-config")

async function add(review) {
    return await db("review").insert(review)
}

module.exports = {
    add
}
