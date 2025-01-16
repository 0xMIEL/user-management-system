# User Management System

Simple User Management System (UMS) for Exlabs' recruitment process.

## Local installation

Prerequisites: **Docker**

1. Clone repo

   ```bash
   git clone https://github.com/0xMIEL/user-management-system.git
   ```

2. Rename `.env.example` `.env` and adjust the settings.

3. Build app

   ```bash
   docker compose up -d
   ```

4. If you have postman you can import collection from file `User-Management-System.postman_collection.json`

5. test and enjoy :)

## Environment

- server: **Node.js 23.6.0 (Express.js)**

- database: **MySQL 9.1.0**

## API referenceg

### Authentication

&nbsp;

- **_Register_**

  Create your account.

  **Endpoint:** `POST /api/auth/register`

  **Request body:**

  - `username` - account name **(required)**
  - `password` - password to your account **(required)**

  **Sample response:**

  ```json
  {
    "status": "success",
    "message": "An account has been successfully registered."
  }
  ```

---

- **_Login_**

  Log into your account.

  **Endpoint:** `POST /api/auth/login`

  **Request body:**

  - `username` - account name **(required)**
  - `password` - password to your account **(required)**

  **Sample response:**

  ```json
  {
    "status": "success",
    "message": "A user has successfully granted an access token.",
    "token": <token>
  }
  ```

---

- **_Delete account_**

  Unregister your account.

  **Endpoint:** `DELETE /api/auth/unregister`

  **Header:** `Authorization: Bearer <token>`

  **Request body:**

  - `password` - password to your account **(required)**

  **Sample response:**

  ```json
  {
    "status": "success",
    "message": "The account has been successfully deregistered."
  }
  ```

&nbsp;

### Dealing with data

All below endpoint require mandatory header

```Authorization: Bearer <token>```

&nbsp;

- **_Get all users_**

  Returns an array of all users in the database. Users can be filtered by a role query parameter.

  **Endpoint:** `GET /api/users`

  **Query parameters:**

  - `role` - return only users with selected role

  **Sample response:**

  ```json
  [
  	{
  		"id": 1,
  		"firstName": "John",
  		"lastName": "Smith",
  		"email": "jsmith@gmail.com",
  		"role": "user"
  	},
  	{
  		"id": 2,
  		"firstName": "Jan",
  		"lastName": "Kowalski",
  		"email": "jkowalski@gmail.com",
  		"role": "admin"
  	},
  	{
  		"id": 3,
  		"firstName": "",
  		"lastName": "",
  		"email": "example@gmail.com",
  		"role": "user"
  	}
  ]
  ```

---

- **_Get user_**

  Returns an object containing user data.

  **Endpoint:** `GET /api/user/:id`

  **Path parameters:**

  - `id` - ID of the user

  **Sample response:**

  ```json
  {
  	"id": 1,
  	"firstName": "John",
  	"lastName": "Smith",
  	"email": "jsmith@gmail.com",
  	"role": "user"
  }
  ```

---

- **_Create user_**

  Creates new user record in the database. User data should be based on request body.

  **Endpoint:** `POST /api/user`

  **Request body:** object with the following properties:

  - `firstName` - first name of the user
  - `lastName` - last name of the user
  - `email` - email address of the user **(required)**
  - `role` - role of the user (user or admin) **(required)**

  **Sample response:** status code 201

---

- **_Update user_**

  Updates the user record in the database with data provided in the request body.

  **Endpoint:** `PATCH /api/user/:id`

  **Path parameters:**

  - `id` - ID of the user

  **Request body:** object with the following properties:

  - `firstName` - first name of the user (optional)
  - `lastName` - last name of the user (optional)
  - `role` - role of the user (user or admin) (optional)

  **Sample response:** status code 204

---

- **_Delete user_**

  Removes the user record from the database.

  **Endpoint:** `DELETE /api/user/:id`

  **Path parameters:**

  - `id` - ID of the user

  **Sample response:** status code 204
