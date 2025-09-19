# 🏠 FlatFinder API

FlatFinder API is a RESTful backend service that provides **User authentication**, **Flat management**, and **Messaging** between users.  
It’s designed for rental platforms where users can browse flats, post their own, and communicate with others.

---

## 🚀 Features

- **User Management**
  - Register new users
  - Login & authentication (JWT-based)
  - Admin & account-owner permissions

- **Flat Management**
  - Add new flats
  - Update flat details (only flat owner)
  - Delete flats (only flat owner)
  - View all flats

- **Messaging**
  - Send and receive messages between users
  - CRUD operations for messages

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT  
- **Testing:** Postman  

---

## 📌 API Endpoints

### 👤 User Routes
| Method | Endpoint         | Description                      | Permissions             |
|--------|------------------|----------------------------------|-------------------------|
| POST   | `/users/register` | Register a new user              | Public                  |
| POST   | `/users/login`    | Login and get JWT token          | Public                  |
| GET    | `/users`          | Get all users                   | Admin only              |
| GET    | `/users/:id`      | Get user by ID                   | Admin / Account owner   |
| PATCH  | `/users`          | Update user info                 | Admin / Account owner   |
| DELETE | `/users`          | Delete a user                    | Admin / Account owner   |

---

### 🏠 Flat Routes
| Method | Endpoint   | Description         | Permissions  |
|--------|-----------|---------------------|--------------|
| GET    | `/flats`  | Get all flats       | Public       |
| POST   | `/flats`  | Create a new flat   | Authenticated users |
| PATCH  | `/flats`  | Update flat details | Flat owner   |
| DELETE | `/flats`  | Delete a flat       | Flat owner   |

---

### 💬 Message Routes
| Method | Endpoint      | Description           | Permissions         |
|--------|--------------|-----------------------|---------------------|
| GET    | `/messages`  | Get all messages      | Authenticated users |
| POST   | `/messages`  | Send a new message    | Authenticated users |
| PATCH  | `/messages`  | Update a message      | Message owner       |
| DELETE | `/messages`  | Delete a message      | Message owner       |

---

## 🔑 Authentication

- Uses **JWT (JSON Web Token)** for authentication.
- Include token in headers when accessing protected routes:

```http
Authorization: Bearer <your_token_here>
