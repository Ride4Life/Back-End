exports.seed = async knex => {
    await knex("users").truncate()
    await knex("rides").truncate()
    await knex("reviews").truncate()
}
