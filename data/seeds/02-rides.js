exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("rides")
        .truncate()
        .then(function() {
            // Inserts seed entries
            return knex("rides").insert([
                { rider_id: 1, driver_id: 1, cost: 400, distance: 40 },
                { rider_id: 2, driver_id: 2, cost: 200, distance: 60 }
            ])
        })
}
