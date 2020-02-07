const bcrypt = require("bcryptjs")
const hash = async password => await bcrypt.hash(password, 12)

exports.seed = async function(knex) {
    await knex("users").truncate()
    await knex("users").insert([
        {
            id: 1,
            first_name: "John",
            last_name: "Doe",
            email: "john@gmail.com",
            username: "john",
            password: `${await hash("password")}`,
            isDriver: false,
            phone_number: "2155551111"
        },

        {
            id: 2,
            first_name: "Jane",
            last_name: "Dont",
            email: "jane@gmail.com",
            username: "jane",
            password: `${await hash("wordpass")}`,
            isDriver: true,
            phone_number: "2155552222",
            price: 255
        },
        {
            id: 3,
            first_name: "Johnny",
            last_name: "Donttt",
            email: "johnd@gmail.com",
            username: "johnd",
            password: `${await hash("password")}`,
            isDriver: false,
            phone_number: "2155531111"
        },

        {
            id: 4,
            first_name: "Janet",
            last_name: "Donty",
            email: "janet@gmail.com",
            username: "janet",
            password: `${await hash("wordpass")}`,
            isDriver: true,
            phone_number: "2155252322",
            price: 211
        }
    ])
}
