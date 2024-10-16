# Todo

- [x] CRUD user
- [x] CRUD court
- [x] CRUD reserve

POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "<john@example.com>",
  "password": "password123",
  "number": "12345678901"
}

PATCH /users/1
Content-Type: application/json

{
  "name": "John Updated"
}

DELETE /users/1

GET /users/1
GET /users?email=<john@example.com>

POST /court
Content-Type: application/json

POST /court
Content-Type: application/json

{
  "name": "Quadra Central",
  "address": "123 Rua Principal",
  "type": "TENNIS",
  "available": true
}
GET /court
GET /court/1
PATCH /court/1
Content-Type: application/json

{
  "address": "456 Novo Endereço",
  "available": false
}
DELETE /court/1
