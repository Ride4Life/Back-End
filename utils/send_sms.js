// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = "AC434dcea673e854750ab451ecef67b068"
const authToken = "4256d02c5d68be427aea5e21da951cb0"
const client = require("twilio")(accountSid, authToken)

let driverNumber = ""

client.messages
    .create({
        body: "This is a test of the Ride4Life Broadcast System",
        from: "+12017013941",
        to: driverNumber || "+12156662981"
    })
    .then(message => console.log(message.sid))

module.exports = {
    driverNumber,
    client
}
