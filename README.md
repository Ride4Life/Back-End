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
| price        | Integer | Yes      | User's price           |

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

> If successfully logged in, endpoint will return HTTP response with status code and a body with a token and message welcoming the user by their first_name

**401 (Unauthorized)**

> If username is not found or password is incorrect, status 401 will be returned

**500 (Internal Server Error)**

> If there was a server error logging the user in, a response with status code 500 will be returned.
