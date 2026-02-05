# Authentication API Documentation

## Logic Flow
1. **User Registration**: Create an admin user with `username`, `email`, and `password`. The password is hashed before saving.
2. **Login**: User submits `email` and `password`. System verifies hash and returns a JWT `token`.
3. **Access Protected Routes**: Client sends `Authorization: Bearer <token>` header. stored in `localStorage` or `cookies`.

## Security Features
- **Bcrypt**: Passwords are never stored in plain text. 
- **JWT**: Stateless authentication with expiration (30d default).
- **Middleware**: `protect` middleware verifies token validity and user existence.

## Postman Examples

### 1. Register Admin (One-time Setup)
**POST** `{{base_url}}/api/auth/register`

**Body (JSON):**
```json
{
  "username": "SuperAdmin",
  "email": "admin@portfolio.com",
  "password": "strongpassword123"
}
```

**Response (201 Created):**
```json
{
    "success": true,
    "message": "Admin registered successfully",
    "user": {
        "id": "65b2...",
        "username": "SuperAdmin",
        "email": "admin@portfolio.com",
        "role": "admin"
    }
}
```

### 2. Login
**POST** `{{base_url}}/api/auth/login`

**Body (JSON):**
```json
{
  "email": "admin@portfolio.com",
  "password": "strongpassword123"
}
```

**Response (200 OK):**
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": "65b2...",
        "username": "SuperAdmin",
        "email": "admin@portfolio.com",
        "role": "admin"
    }
}
```

### 3. Access Protected Route (Test)
**GET** `{{base_url}}/api/auth/me`

**Headers:**
| Key | Value |
|---|---|
| Authorization | Bearer eyJhbGciOiJI... |

**Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "_id": "65b2...",
        "username": "SuperAdmin",
        "email": "admin@portfolio.com",
        "role": "admin",
        "createdAt": "...",
        "updatedAt": "..."
    }
}
```
