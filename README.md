# Quotes Application.

## Data Modeling.
![image](https://github.com/lakshay1121/QuotesApp/assets/91718893/61d4f2a7-7186-4ce5-a791-dd9fe2f9d14a)


Quotes posting application - 

Backend - 

API CONVENTION -

Common prefix for all the apis - http://localhost:5000/api/v1

Working -

- User login and registration.
- User should able to logout.
- GET /quotes to get all quotes in the application.
- Get /quotes/:user_id to get all quotes of a user.
- POST /quotes/user/:id with a JSON object containing the quote and author to add a new quote.
- DELETE /quote/:id to delete an existing quote by its id.
- PATCH /quote/:id/ to update a existing field in the database.




API ENDPOINTS-

 - Register url(POST) - http://localhost:5000/api/v1/auth/register

fields to be send in body - 

{
    "name":"lakshay",
    "email":"lakshay@gmail.com",
    "password":"1234"
}

,


- Login url(POST) - http://localhost:5000/api/v1/auth/login

fields to be send in body - 

{
    "email":"lakshay@gmail.com",
    "password":"1234"
}
,

- Add quotes url(POST) - http://localhost:5000/api/v1/users/quotes/add

fields to be send in body -

{
  "author": "Lakshay",
  "title": "Test",
  "content": "Test quote",
  "userId":"65fd881ce8fe511cab844d15"
}

,

- Get all quotes of a user(GET) - http://localhost:5000/api/v1/users/quotes/{userId}

- Get all quotes throughout the app(GET) - http://localhost:5000/api/v1/users/quotes

- Delete a quote by its quote id (DELETE) - http://localhost:5000/api/v1/users/quotes/delete/{quoteID}

- Update values in a quote (PATCH) - http://localhost:5000/api/v1/users/quotes/update/{quoteID}
  
  req.body = {
    title:"New Title",
    content:"new Content"
  }

  fields you want to update mention them in the req.body.
