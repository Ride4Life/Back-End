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

        const riderLatitude = latitude
        const riderLongitude = longitude
        //TODO Receive drivers locations
        const driverLatitude = "7.9465"
        const driverLongitude = "1.0232"
        //TODO determine closet driver

        //Determine ETA for driver
        const fetch = require("node-fetch")
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyCgK-FlujojQfhllnl0aYHab-avJdM7XUA`

        const response = await fetch(url)
        console.log(response)
        const json = await response.json()
        //can do .value to get time in seconds
        console.log(json.rows[0].elements[0].duration.text)

        //send text to driver w/ location of requestor TWILIO
        const driverUsername = "test"
        const driver = await users.findById(1)
        console.log(driver)
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
            ETA: driverETA
        })
        //Send email to rider within 24 hours for review
        //TODO add link to driver's profile to review

        const emailDelay = 86400000 //24 hours
        const testDelau = 120000 // 2 minutes

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: "smv5047@gmail.com",
            from: "Ride4Life@gmail.com",
            subject: "Please Review Your Ride4Life - test4",
            text: `Please review your ride with ${driver.first_name} ${driver.last_name}`
            // html: "<strong>and easy to do anywhere, even with Node.js</strong>"
        }
        setTimeout(() => sgMail.send(msg), emailDelay)
    } catch (err) {
        next(err)
    }
})

module.exports = router
