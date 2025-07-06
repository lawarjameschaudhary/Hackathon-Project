# Mero Kaam Backend API (Express.js)

This is the backend for the Hackathon project: (Mero Kaam) built using **Express.js**. It provides RESTful APIs for user registration, authentication, seller onboarding, and service management.

All endpoints are tested using **Postman**.

---

## 🔗 Project Repository

[GitHub - Hackathon Project (Backend)](https://github.com/lawarjameschaudhary/Hackathon-Project/tree/main/backend)

---

## 📌 API Routes

| Method | Endpoint                                 | Description                   |
|--------|------------------------------------------|-------------------------------|
| POST   | `/api/users/register`                    | Register a new user           |
| POST   | `/api/users/login`                       | Log in and receive token      |
| POST   | `/api/sellers/become-seller`             | Register as a seller          |
| GET    | `/api/services/`                         | List all services             |
| POST   | `/api/services/`                         | Add a new service             |
| PUT    | `/api/services/`                         | Update a service              |

---

## 🧪 How to Test with Postman

1. Open Postman and create a new **collection**.
2. Add requests for each API route.
3. Select the appropriate **HTTP method** (POST, GET, PUT).
4. Under **Body** tab:
   - Select `raw`
   - Set type to `JSON`

---

## ✅ Sample Requests

### 🔐 User Registration

**POST** `http://localhost:8000/api/users/register`

```json
{
  "username": "testuser5",
  "email": "testuser@example5.com",
  "password": "password123",
  "isSeller": false
}
