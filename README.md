# User Management REST API

A role-based user management REST API built with **Node.js**, **Express.js**, and **MongoDB**.  
It supports user registration, CRUD operations, role assignment, and JWT-based authentication & authorization.

---

## Features

- **Register User**  
  Register a user with First Name, Last Name, Email, Password, and Phone.

- **Get User by ID**  
  Retrieve user details by their unique ID.

- **Update User**  
  Update user details such as First Name, Last Name, Email, and Phone.

- **Delete User**  
  Soft delete a user account.

- **Create Roles**  
  Create custom roles (e.g., admin, editor, viewer).

- **Assign Role to User**  
  Assign one role to a user.

- **Role-Based Authentication & Authorization**  
  Secure endpoints with JWT and restrict access based on user roles.

- **List Users with Filters**  
  Search users by First Name, Last Name, Email, Phone, and Role, with support for pagination and sorting.

---

## Tech Stack

- Backend: Node.js, Express.js  
- Database: MongoDB (with Mongoose ODM)  
- Authentication: JSON Web Tokens (JWT)  
- Environment Variables: dotenv

---

## How to Run and Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Aashlesha-Chitte/user-management.git
   cd user-management
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**
   Create a `.env` file at the root and add:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/userData
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server**

   ```bash
   npm run dev
   ```

5. **Access the API at:**
    ```
    http://localhost:5000/api/
     ```
