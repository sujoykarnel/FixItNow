# 🔧 FixItNow API Documentation

Server Base URL

```
http://localhost:5000/api
```

Live Server Base URL

```
https://fix-it-now-virid.vercel.app/api
```

---

# 🔐 Authentication

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| POST   | `/auth/register`      | Register a new user        |
| POST   | `/auth/login`         | Login user                 |
| GET    | `/auth/profile`       | Get logged-in user profile |
| GET    | `/auth/refresh-token` | Refresh access token       |

---

# 📂 Categories

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| GET    | `/categories` | Get all categories      |
| POST   | `/categories` | Create category (Admin) |

---

# 🛠️ Services

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| POST   | `/services`     | Create a new service |
| GET    | `/services`     | Get all services     |
| GET    | `/services/:id` | Get single service   |
| PATCH  | `/services/:id` | Update service       |
| DELETE | `/services/:id` | Delete service       |

---

# 👨‍🔧 Technicians

| Method | Endpoint                           | Description               |
| ------ | ---------------------------------- | ------------------------- |
| GET    | `/technicians`                     | Get all technicians       |
| GET    | `/technicians/:id`                 | Get technician details    |
| PATCH  | `/technicians/profile`             | Update technician profile |
| GET    | `/technicians/bookings`            | Get technician bookings   |
| PATCH  | `/technicians/bookings/:bookingId` | Update booking status     |

---

# 📅 Bookings

| Method | Endpoint                | Description                   |
| ------ | ----------------------- | ----------------------------- |
| POST   | `/bookings`             | Create booking                |
| GET    | `/bookings/my-bookings` | Get logged-in user's bookings |
| GET    | `/bookings/:id`         | Get booking details           |

---

# 💳 Payments

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| POST   | `/payments/checkout`    | Create Stripe checkout session |
| GET    | `/payments/history`     | Get payment history            |
| GET    | `/payments/history/:id` | Get payment details            |
| POST   | `/payments/webhook`     | Stripe webhook                 |

---

# ⭐ Reviews

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| POST   | `/reviews` | Create review |

---

# 👑 Admin

## Users

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| GET    | `/admin/users`            | Get all users      |
| GET    | `/admin/users/:id`        | Get single user    |
| PATCH  | `/admin/users/:id/status` | Update user status |

## Bookings

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | `/admin/bookings` | Get all bookings |

## Categories

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | `/admin/categories` | Create category    |
| GET    | `/admin/categories` | Get all categories |

---

# 🔒 Authentication

Most protected endpoints require:

```
Authorization: Bearer <access_token>
```

---

# 📦 Response Format

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request Successful",
  "data": {}
}
```

---

# ❌ Error Response

```json
{
  "success": false,
  "statusCode": 500,
  "message": "Something went wrong",
  "error": {}
}
```

---

# 🧪 Run Locally

```bash
npm install
```

```bash
npm run dev
```

Server:

```
http://localhost:5000
```

Live Server:

```
https://fix-it-now-virid.vercel.app
```
