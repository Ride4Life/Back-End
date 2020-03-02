// Update with your config settings.

module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./data/ride4life.db3"
        },
        migrations: {
            directory: "./data/migrations",
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./data/seeds"
        },
        useNullAsDefault: true,
        pool: {
            afterCreate: (conn, done) => {
                // runs after a connection is made to the sqlite engine
                conn.run("PRAGMA foreign_keys = ON", done) // turn on FK enforcement
            }
        }
    },
    test: {
        client: "sqlite3",
        connection: {
            filename: "./data/ride4life.db3"
        },
        migrations: {
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./data/seeds"
        },
        useNullAsDefault: true,
        pool: {
            afterCreate: (conn, done) => {
                // runs after a connection is made to the sqlite engine
                conn.run("PRAGMA foreign_keys = ON", done) // turn on FK enforcement
            }
        }
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: "./data/migrations"
        },
        seeds: {
            directory: "./data/seeds"
        },
        pool: {
            min: 2,
            max: 10
        }
    }
}
