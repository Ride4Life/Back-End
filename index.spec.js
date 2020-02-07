const supertest = require("supertest")
const server = require("./index")

const db = require("./data/db-config")

// beforeEach(async () => {
//     await db.seed.run()
// })

test("register route without proper un or pw", async () => {
    const res = await supertest(server).post("/api/auth/signup")

    //does it return the expected status code
    expect(res.status).toBe(401)
    //does it return expected data format
    expect(res.type).toBe("application/json")
    //does it return the expected data
    expect(res.body.message).toBe("Please include username & password")
    console.log(res)
})

test("register route used properly", async () => {
    const res = await supertest(server)
        .post("/api/auth/signup")
        .send({
            id: 5,
            username: "JohnDavidVande",
            password: "JohnD",
            first_name: "JohnVande",
            last_name: "DavidVande",
            phone_number: "5557829023",
            isDriver: "false",
            email: "test5@gmail.com"
        })
    expect(res.body.message).toBe("Welcome JohnDavidVande")
    expect(res.status).toBe(201)
})

test("login properly", async () => {
    const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "John", password: "John" })
    expect(res.status).toBe(200)
})

test("login improperly", async () => {
    const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "JohnD", password: "wrong" })
    expect(res.status).toBe(401)
})

// test("request ride", async () => {
//     const res = await supertest(server)
//         .post("/auth/signin")
//         .send({ username: "JohnD", password: "wrong" })
//     expect(res.status).toBe(401)
// })
