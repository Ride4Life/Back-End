
exports.up = async function(knex) {
  await knex.schema.createTable('users', (table)=>{
      table.increments("id").notNullable().unique()
      table.string("first_name").notNullable()
      table.string("last_name").notNullable()
      table.string("email").notNullable().unique()
      table.string("username").notNullable().unique()
      table.string("password").notNullable()
      table.boolean("isDriver").notNullable()
      table.string("phone_number").notNullable().unique()
      table.integer("price").notNullable()
  })

  await knex.schema.createTable('rides', (table) => {
    table.integer("rider_id")
        .references("id")
        .inTable("users")
        .onDelete("NO ACTION")
        .onUpdate("NO ACTION")
    table.integer("driver_id")
        .references("id")
        .inTable("users")
        .onDelete("NO ACTION")
        .onUpdate("NO ACTION")
    table.integer("cost").notNullable()
    table.integer("distance").notNullable()
    table.primary(["rider_id", "driver_id"])
  })

  await knex.schema.createTable('reviews', (table) => {
      table.increments("id").notNullable().unique()
      table.integer("rider_id")
        .references("id")
        .inTable("users")
        .onDelete("NO ACTION")
        .onUpdate("NO ACTION")
      table.string("review")
      table.integer("rating")
  })

};


exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('reviews')
    await knex.schema.dropTableIfExists('rides')
    await knex.schema.dropTableIfExists('users')
};
