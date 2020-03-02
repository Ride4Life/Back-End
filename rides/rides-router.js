// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require("twilio")(accountSid, authToken)
const distance = require("google-distance-matrix")
const sgMail = require("@sendgrid/mail")
distance.key(process.env.GOOGLE_API_KEY)

distance.units("imperial")
distance.mode("driving")
const rides = require("./rides-model")
const router = require("express").Router()
const users = require("../users/users-model")

router.post("/request", async (req, res, next) => {
    try {
        //Recieve user location - Work with FE
        const { username, latitude, longitude } = req.body
        const rider = await users.findBy({ username }).first()
        console.log(rider, "rider log")
        const riderLatitude = latitude
        const riderLongitude = longitude
        //TODO Receive drivers locations - Use google distance matrix
        const driverLatitude = "7.9465"
        const driverLongitude = "1.0232"
        //TODO Determine closet driver - Sort?

        //Determine ETA for driver
        const fetch = require("node-fetch")
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=${process.env.GOOGLE_API_KEY}`

        const response = await fetch(url)
        console.log(response)
        const json = await response.json()
        //can do .value to get time in seconds
        console.log(json.rows[0].elements[0].duration.text)

        //send text to driver w/ location of requestor TWILIO
        const driverUsername = "test"
        const driver = await users.findById(1)

        console.log(driver, "driver log")
        const driverETA = json.rows[0].elements[0].duration.text
        client.messages
            .create({
                body: `Please pickup ${rider.first_name} ${rider.last_name} at https://www.google.com/maps/search/?api=1&query=${riderLatitude},${riderLongitude}`,
                from: "+12017013941",
                to: driver.phone_number
            })
            .then(message => console.log(message.sid))

        //send to FE ETA of driver
        res.status(200).json({
            ETA: driverETA,
            username: driver.username,
            userID: driver.id
        })
        //Send email to rider within 24 hours for review with link to Driver's profile
        //TODO Secure link so that only the rider who recieves the link can review the driver

        const emailDelay = 86400000 //24 hours
        const testDelay = 120000 // 2 minutes

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: "smv5047@gmail.com",
            from: "Ride4Life@gmail.com",
            subject: "Please Review Your Ride4Life - test4",
            text: `Please review your ride with ${driver.first_name} ${driver.last_name} at https://ride4life.herokuapp.com/profile/${driver.id}`
            // html: "<strong>and easy to do anywhere, even with Node.js</strong>"
        }
        setTimeout(() => sgMail.send(msg), testDelay)
    } catch (err) {
        next(err)
    }
})

module.exports = router
