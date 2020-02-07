const supertest = require("supertest")
const server = require("./index")
const db = require("./data/db-config")
const jwt = require("jsonwebtoken")
const secret = require("./config/secrets")

let token

beforeAll(() => {
    function generateToken(user) {
        const payload = {
            subject: user.id,
            username: user.username
        }
        const options = {
            expiresIn: "1d"
        }

        return jwt.sign(payload, secret.jwtSecret, options)
    }
    token = generateToken({
        id: 5
    })
})

// beforeEach(async () => {
//     await db.seed.run()
// })

// describe("auth router", () => {
//     test("register route used properly", async () => {
//         const res = await supertest(server)
//             .post("/api/auth/signup")
//             .send({
//                 id: 10,
//                 username: "newtest",
//                 password: "JohnD3e3",
//                 first_name: "new",
//                 last_name: "test",
//                 phone_number: "5557829097",
//                 isDriver: "false",
//                 email: "test559@gmail.com"
//             })
//         expect(res.body.message).toBe("Welcome newtest")
//         expect(res.status).toBe(201)
//     })
// })

describe("register router", () => {
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
})

describe("reviews router", () => {
    test("get reviews", async () => {
        const res = await supertest(server)
            .get("/api/profile/2/reviews")
            .set({ Authorization: token })

        //does it return the expected status code
        expect(res.status).toBe(200)
        //does it return expected data format
        expect(res.type).toBe("application/json")
    })
})

describe("ride router", () => {
    test("get ride json object and return 200", async () => {
        const res = await supertest(server)
            .post("/api/ride/request")
            .send({
                latitude: "8.2414",
                longitude: "1.3231",
                username: "johnd"
            })
            .set({ Authorization: token })

        //does it return the expected status code
        expect(res.status).toBe(200)
        //does it return expected data format
        expect(res.type).toBe("application/json")
    })
})

describe("user router", () => {
    test("get user json object and return 200", async () => {
        const res = await supertest(server)
            .get("/api/profile/1")
            .set({ Authorization: token })

        //does it return the expected status code
        expect(res.status).toBe(200)
        //does it return expected data format
        expect(res.type).toBe("application/json")
    })
})
