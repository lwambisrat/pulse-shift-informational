# Greens Mtaani API Reference

## Base URL
- **Production**: `https://greensmtaani-d6ee50db917a.herokuapp.com/`
- **Development**: `http://localhost:8000/`

---

## Authentication

All endpoints require authentication using token-based access.  
Include your token in the `Authorization` header:

- **Header**: `Authorization: Token <token>`
- **Example**:  
  `Authorization: Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...`

---

## Error Codes

| HTTP Status | Error Code         | Description                |
|-------------|--------------------|----------------------------|
| 400         | BAD_REQUEST        | Invalid input data         |
| 401         | UNAUTHORIZED       | Authentication failed      |
| 403         | FORBIDDEN          | Insufficient permissions   |
| 404         | NOT_FOUND          | Resource not found         |
| 405         | METHOD_NOT_ALLOWED | HTTP method not allowed    |
| 500         | SERVER_ERROR       | Internal server error      |

**Example Error Response**
```json
{
  "error_code": "BAD_REQUEST",
  "message": "Invalid input data"
}
```

---

## Endpoints

### Authentication

#### Register
- **POST** `/register/`
- **Description**: Register a new user (customer, mama mboga, admin, moderator).
- **Headers**: `Content-Type: application/json`
- **Request Body Sample**:
```json
{
  "user_type": "mama_mboga",
  "user_data": {
    "username": "sammwangi",
    "password": "changeme789",
    "email": "samumwangi@example.com",
    "first_name": "Samantha",
    "last_name": "Mwangi"
  },
  "phone_number": "0709111222"
}
```
- **Response (201)**:
```json
{
  "user": {
    "id": 1,
    "username": "sammwangi",
    "first_name": "Samantha",
    "last_name": "Mwangi",
    "email": "samumwangi@example.com",
    "user_type": "mama_mboga",
    "phone_number": "0709111222",
    "is_active": true,
    ...
  },
  "token": "<token>"
}
```
- **Error (400)**: Invalid data or user_type.

---

#### Login
- **POST** `/login/`
- **Description**: Authenticate a user and get a token.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "username": "sammwangi",
  "password": "changeme789"
}
```
- **Response (200)**:
```json
{
  "user": {
    "id": 1,
    "username": "sammwangi",
    "user_type": "mama_mboga",
    ...
  },
  "token": "<token>"
}
```
- **Error (400/401)**: Incorrect credentials.

---

#### Logout
- **POST** `/logout/`
- **Description**: Logs out the authenticated user, invalidating the token.
- **Headers**: `Authorization: Token <token>`
- **Response (200)**:
```json
{"detail": "Successfully logged out."}
```

---

### Users & Profiles

#### Get Profile
- **GET** `/profile/`
- **Description**: Get the authenticated user's profile.
- **Headers**: `Authorization: Token <token>`
- **Response (200)**:
```json
{
  "id": 1,
  "username": "janedoe",
  "user_type": "customer",
  ...
}
```

#### List All Profiles
- **GET** `/users/`
- **Permissions**: Admin only.
- **Description**: List all customer and Mama Mboga profiles.
- **Headers**: `Authorization: Token <token>`
- **Response (200)**: Array of user profiles.

#### Update Profile
- **PATCH** `/users/<pk>/`
- **Permissions**: Owner or admin.
- **Request Body**: Partial update fields (e.g. phone_number, kiosk_name, etc.)

#### Delete Profile
- **DELETE** `/users/<pk>/`
- **Permissions**: Admin only.

---

### Mama Mboga & Customer

- **GET** `/mamamboga/` - List all Mama Mboga (admin only)
- **GET** `/customers/` - List all customers (admin only)

---

### Product Categories

#### List/Create/Update/Delete Product Categories
- **GET** `/productcategories/`
- **POST** `/product-categories/`
- **PATCH/PUT/DELETE** `/productcategories/<pk>/`
- **Permissions**: Authenticated or read-only

#### Example Product Category
```json
{
  "category_id": 1,
  "category_name": "Vegetables",
  "description": "All fresh vegetables"
}
```

---

### Products

#### List/Create/Update/Delete Products
- **GET** `/products/`
- **POST** `/products/` (Mama Mboga only)
- **PATCH/PUT/DELETE** `/products/<pk>/` (Mama Mboga only)
- **Permissions**: Authenticated or read-only

#### Example Product
```json
{
  "product_id": 1,
  "name": "Tomatoes",
  "description": "Fresh tomatoes",
  "category": 1,
  "base_unit": "kg",
  "image_url": "https://...",
  "created_at": "...",
  "updated_at": "...",
  "mama_mboga": 2
}
```

---

### Stock Records

#### List/Create/Update/Delete Stock
- **GET** `/stockrecords/`
- **POST** `/stock_records/` (Mama Mboga only)
- **PATCH/PUT/DELETE** `/stockrecords/<pk>/` (Mama Mboga only)
- **Permissions**: IsMamaMboga

#### Example Stock Record
```json
{
  "inventory_id": 1,
  "mama_mboga": 2,
  "product": 1,
  "price_per_unit": "75.00",
  "currency": "KSH",
  "current_stock_quantity": "10.5",
  "last_stock_update": "...",
  "is_available": true
}
```

---

### Orders

#### List/Create/Update/Delete Orders
- **GET** `/orders/`
- **POST** `/orders/`
- **PATCH/PUT/DELETE** `/orders/<pk>/`
- **Permissions**: IsAuthenticated, customer or vendor

#### Example Order
```json
{
  "order_id": 1,
  "customer": 1,
  "order_date": "2025-08-01T10:00:00Z",
  "customer_address": 1,
  "total_amount": "250.00",
  "order_preference_fee": "0.00",
  "current_status": "pending",
  "payment_status": "pending",
  "expected_pickup_time": null,
  "customer_feedback": null,
  "mama_mboga": 2
}
```

---

### Order Items

#### List/Create/Update/Delete Order Items
- **GET** `/order_items/`
- **POST** `/order_items/`
- **PATCH/PUT/DELETE** `/order_items/<pk>/`
- **Permissions**: IsAuthenticated

#### Example Order Item
```json
{
  "order_item_id": 1,
  "order": 1,
  "product": 2,
  "mama_mboga": 2,
  "quantity": "3.00",
  "price_per_unit_at_order": "75.00",
  "item_total": "225.000",
  "status_at_mama_mboga": "pending"
}
```

---

### Payments

#### List/Create/Update/Delete Payments
- **GET** `/payments/`
- **POST** `/payments/`
- **PATCH/PUT/DELETE** `/payments/<pk>/`
- **Permissions**: IsAuthenticated, owner or admin

#### Example Payment
```json
{
  "payment_id": 1,
  "order": 1,
  "customer": 1,
  "total_amount": "250.00",
  "status": "PENDING",
  "phone_number": "0709111222",
  "mpesa_receipt_number": null,
  "transaction_date": null,
  "checkout_request_id": null,
  "merchant_request_id": null,
  "raw_callback": {},
  "created_at": "...",
  "updated_at": "..."
}
```

---

### Payouts

#### List/Create/Update/Delete Payouts
- **GET** `/payouts/`
- **POST** `/payouts/`
- **PATCH/PUT/DELETE** `/payouts/<pk>/`
- **Permissions**: Admin only

---

### Nutrition

#### Dietary Preferences
- **GET** `/dietarypreferences/`
- **POST** `/dietarypreferences/`
- **PATCH/PUT/DELETE** `/dietarypreferences/<pk>/`
- **Permissions**: IsAuthenticatedOrReadOnly

#### Meal Plans
- **GET** `/mealplans/`
- **POST** `/mealplans/`
- **PATCH/PUT/DELETE** `/mealplans/<pk>/`
- **Permissions**: IsAuthenticatedOrReadOnly

---

### Recipes & Ingredients

#### Recipes
- **GET** `/recipes/`
- **POST** `/recipes/`
- **PATCH/PUT/DELETE** `/recipes/<pk>/`
- **Permissions**: IsAuthenticatedOrReadOnly

#### Ingredients
- **GET** `/ingredients/`
- **POST** `/ingredients/`
- **PATCH/PUT/DELETE** `/ingredients/<pk>/`
- **Permissions**: IsAuthenticatedOrReadOnly

---

### M-Pesa Payment

#### Initiate STK Push
- **POST** `/stkpush/`
- **Description**: Initiate M-Pesa STK push payment.
- **Headers**: `Authorization: Token <token>`
- **Request Body**:
```json
{
  "phone_number": "0709111222",
  "amount": 250.00,
  "account_reference": "ORDER123",
  "transaction_desc": "Payment for order"
}
```
- **Response (200)**: Returns Daraja API response.

#### Payment Callback (Webhook)
- **POST** `/daraja/callback/`
- **Description**: Receives payment confirmation from M-Pesa Daraja.
- **Headers**: None required.
- **Request Body**: Raw Daraja callback JSON.
- **Response (200)**:
```json
{"ResultCode": 0, "ResultDesc": "Accepted"}
```

---

## Notes
- All POST/PUT/PATCH endpoints expect `Content-Type: application/json`.
- All endpoints (except registration, login, and payment callback) require authentication.
- Permissions are enforced per endpoint as shown.
- All API keys and sensitive information must be sent securely.
- For field details, see model/serializer documentation.
