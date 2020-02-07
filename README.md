# Back-End

Backend Express Server & SQLite DB for Ride4Life App

# Lambda School Sleep Tracker API

## Base URL

-   https://ride-4-life.herokuapp.com/

## Register a New User

HTTP Method: POST

URL: /api/auth/signup

### Body

| Name         | Type    | Required | Description            |
| ------------ | ------- | -------- | ---------------------- |
| first_name   | String  | Yes      | User's first name      |
| last_name    | String  | Yes      | User's last name       |
| email        | String  | Yes      | User's email           |
| username     | String  | Yes      | User's chosen username |
| password     | String  | Yes      | User's chosen password |
| isDriver     | Boolean | Yes      | If user is a driver    |
| phone_number | String  | Yes      | User's phone number    |
| price        | Integer | No       | User's price           |

### Example

```json
{
    "first_name": "Stevenva",
    "last_name": "Vandenburgva",
    "email": "smvav5047@gmail.com",
    "username": "test3",
    "password": "test3",
    "isDriver": "false",
    "phone_number": "2156662381",
    "price": 2000
}
```

### Response

**201 (Created)**

> If successfully signed up, endpoint will return HTTP response with status code and a body with a token and message welcoming the user by their first_name

**401 (Bad Request)**

> If required information is missing, the endpoint will return an HTTP response with a status code of 401

**500 (Internal Server Error)**

> If there was a server error registering the user, a response with status code 500 will be returned.

## Log In a User

HTTP Method: POST
URL: /api/auth/login

### Body

| Name     | Type   | Required | Description     |
| -------- | ------ | -------- | --------------- |
| username | String | Yes      | User's username |
| password | String | Yes      | User's password |

### Example

```json
{
    "username": "test3",
    "password": "test3"
}
```

### Response

**200 (OK)**

> If successfully logged in, endpoint will return HTTP response with status code and a body with a token and message welcoming the user by their first_name, as well as a userID

**401 (Unauthorized)**

> If username is not found or password is incorrect, status 401 will be returned

**500 (Internal Server Error)**

> If there was a server error logging the user in, a response with status code 500 will be returned.

## Request a Ride

HTTP Method: POST
URL: /api/ride/request

### Body

| Name      | Type   | Required | Description              |
| --------- | ------ | -------- | ------------------------ |
| username  | String | Yes      | User's username          |
| latitude  | String | Yes      | User's current latitude  |
| longitude | String | Yes      | User's current longitude |

### Example

```json
{
    "username": "JohnD",
    "latitude": "8.2414",
    "longitude": "1.3231"
}
```

### Response

**200 (OK)**

> If successfully logged in, endpoint will return HTTP response with status code and a body with the ETA until the driver return

```json
{
"ETA": "3 hours 53 mins",
"username": "test
}
```

**401 (Unauthorized)**

> If user is not authorized to request a ride, status 401 will be returned

**500 (Internal Server Error)**

> If there was a server error, a response with status code 500 will be returned.

## Request a Users Details

HTTP Method: Get
URL: /api/profile/:userid

### Body

N/A

### URL

/api/profile/:userid (userid should be the users id that should be retrieved)

### Example

/api/profile/1

Would return

```json
{
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "John.Doe@gmail.com",
    "username": "JohnD",
    "password": "$2a$13$9c5WA9NqPpQeyzgLbvvXO.XvC3mWJ8P24fFedJbnPMFJdhesQahU2",
    "isDriver": "false",
    "phone_number": "4042262159",
    "price": null
}
```

### Response

**200 (OK)**

> Endpoint will return HTTP response with status code and a body with the users information

**404 (Does Not Exist)**

> If userid is not found , status 404 will be returned

**500 (Internal Server Error)**

> If there was a server error, a response with status code 500 will be returned.

## Update a User

HTTP Method: Put
URL: /api/profile/:userid

### Body

| Name         | Type    | Required | Description            |
| ------------ | ------- | -------- | ---------------------- |
| first_name   | String  | No       | User's first name      |
| last_name    | String  | No       | User's last name       |
| email        | String  | No       | User's email           |
| username     | String  | No       | User's chosen username |
| password     | String  | No       | User's chosen password |
| isDriver     | Boolean | No       | If user is a driver    |
| phone_number | String  | No       | User's phone number    |
| price        | Integer | No       | User's price           |

### URL

/api/profile/:userid (userid should be the users id that should be retrieved)

### Example

```json
{
    "first_name": "Stevenva",
    "last_name": "Vandenburgva",
    "email": "smvav5047@gmail.com",
    "username": "test3",
    "password": "test3",
    "isDriver": "false",
    "phone_number": "2156662381",
    "price": 2000
}
```

### Response

**200 (OK)**

> Endpoint will return HTTP response with status code and a body with the updated users information

**404 (Does Not Exist)**

> If userid is not found , status 404 will be returned

**500 (Internal Server Error)**

> If there was a server error, a response with status code 500 will be returned.

## Delete a User

HTTP Method: Delete
URL: /api/profile/:userid

### Body

N/A

### URL

/api/profile/:userid (userid should be the users id that should be retrieved)

### Example

N/A

### Response

**200 (OK)**

> Endpoint will return HTTP response with status code and a message saying user was deleted

**404 (Does Not Exist)**

> If userid is not found , status 404 will be returned

**500 (Internal Server Error)**

> If there was a server error, a response with status code 500 will be returned.

## View a Drivers Reviews

HTTP Method: Get
URL: /api/profile/:userid/review

### Body

N/A

### URL

/api/profile/:userid (userid should be the users id that should be retrieved)

### Example Response

If we look at the reviews

```json
[
    {
        "id": 1,
        "rider_id": 2,
        "driver_id": 7,
        "review": "The Worst",
        "rating": 1
    },
    {
        "id": 2,
        "rider_id": 3,
        "driver_id": 7,
        "review": "Meh",
        "rating": 3
    },
    {
        "id": 3,
        "rider_id": 4,
        "driver_id": 7,
        "review": "So Enlightening",
        "rating": 4
    },
    {
        "id": 4,
        "rider_id": 6,
        "driver_id": 7,
        "review": " Best Ride ever",
        "rating": 5
    }
]
```

### Response

**200 (OK)**

> Endpoint will return HTTP response with status code and an array of review objects

**404 (Does Not Exist)**

> If driverid is not found , status 404 will be returned

**500 (Internal Server Error)**

> If there was a server error, a response with status code 500 will be returned.

## Create a Review

HTTP Method: POST

URL: /api/profile/:driverid/reviews

### Body

| Name     | Type    | Required | Description     |
| -------- | ------- | -------- | --------------- |
| rider_id | Integer | Yes      | Rider's id      |
| review   | String  | No       | Review for Ride |
| rating   | Integer | Yes      | Rating for Ride |

### URL

Must send Driver ID through URL /api/profile/:driverid/reviews

### Example

```json
{
    "rider_id": 6,
    "review": " Best Ride ever",
    "rating": 4
}
```

### Response

**201 (Created)**

> If successfully create, endpoint will return HTTP response with status code and a message thanking user for review

**401 (Bad Request)**

> If required information is missing, the endpoint will return an HTTP response with a status code of 401

**500 (Internal Server Error)**

> If there was a server error registering the user, a response with status code 500 will be returned.
