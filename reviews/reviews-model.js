const db = require("../data/db-config")

async function add(review) {
    await db("review").insert(review)
}

module.exports = {
    add
}
