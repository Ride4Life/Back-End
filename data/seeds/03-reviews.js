exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("reviews")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("reviews").insert([
                {
                    id: 1,
                    rider_id: 1,
                    driver_id: 2,
                    review: "the best",
                    rating: 5
                },
                {
                    id: 2,
                    rider_id: 3,
                    driver_id: 4,
                    review: "the worst",
                    rating: 1
                }
            ])
        })
}
