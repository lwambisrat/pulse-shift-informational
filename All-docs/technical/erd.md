# Greens Mtaani Database Schema Summary


![ERD](<../images/postgres - greens_mtaani_ERD.png>)


## Entity Relationship Overview

- **Customers ⟶ Orders**: One-to-Many — A customer can place many orders.
- **Mama Mbogas ⟶ Inventory**: One-to-Many — Each vendor manages their own inventory.
- **Products ⟶ Inventory**: One-to-Many — Each product can appear in many vendors' inventories.
- **Product Categories ⟶ Products**: One-to-Many — Each category has many products.
- **Orders ⟶ Order Items**: One-to-Many — Each order contains many items.
- **Customers ⟶ Dietary Preferences, Meal Plans**: One-to-Many — Nutrition planning features per customer.
- **Meal Plans ⟶ Meal Plan Entries**: One-to-Many — Meal plans contain entries.

---

## Table Definitions

### 1. Mama Mboga

| Attribute            | Data Type                | Notes                                | Django Field (Type)                               |
|----------------------|-------------------------|--------------------------------------|---------------------------------------------------|
| mama_mboga_id        | SERIAL PRIMARY KEY      | Unique ID                            | AutoField (primary_key=True)                      |
| kiosk_name           | VARCHAR(255) NOT NULL   | Kiosk name                           | CharField                                         |
| owner_first_name     | VARCHAR(255) NOT NULL   | Owner's first name                   | CharField                                         |
| owner_last_name      | VARCHAR(255) NOT NULL   | Owner's last name                    | CharField                                         |
| email                | VARCHAR(255) UNIQUE     | Email                                | EmailField(blank=True, null=True)                 |
| phone_number         | VARCHAR(20) NOT NULL, UNIQUE | Contact number                   | CharField                                         |
| password             | VARCHAR(255) NOT NULL   | Password hash                        | CharField                                         |
| location_latitude    | DECIMAL(10,7) NOT NULL  | Latitude                             | FloatField(max_digits=10, decimal_places=7, null=True, blank=True) |
| location_longitude   | DECIMAL(10,7) NOT NULL  | Longitude                            | FloatField(max_digits=10, decimal_places=7, null=True, blank=True) |
| address_description  | TEXT                    | Address description                  | TextField(null=True, blank=True)                  |
| registration_date    | TIMESTAMP WITH TZ DEFAULT now() | Registration date           | DateTimeField(auto_now_add=True)                  |
| is_active            | BOOLEAN DEFAULT TRUE    | Status                               | BooleanField(default=True)                        |

---

### 2. Customer

| Attribute            | Data Type                | Notes                                | Django Field (Type)                               |
|----------------------|-------------------------|--------------------------------------|---------------------------------------------------|
| customer_id          | SERIAL PRIMARY KEY      | Unique customer ID                   | AutoField(primary_key=True)                       |
| first_name           | VARCHAR(255) NOT NULL   | First name                           | CharField                                         |
| last_name            | VARCHAR(255) NOT NULL   | Last name                            | CharField                                         |
| email                | VARCHAR(255) NOT NULL, UNIQUE | Email                           | CharField                                         |
| phone_number         | VARCHAR(20) NOT NULL, UNIQUE | Phone number                      | CharField                                         |
| password_hash        | VARCHAR(255) NOT NULL   | Hashed password                      | CharField                                         |
| registration_date    | TIMESTAMP WITH TZ DEFAULT now() | Registration timestamp          | DateTimeField                                     |
| is_active            | BOOLEAN DEFAULT TRUE    | Status                               | BooleanField                                      |

---

### 5. Product Category

| Attribute            | Data Type                | Notes                                | Django Field (Type)                               |
|----------------------|-------------------------|--------------------------------------|---------------------------------------------------|
| category_id          | SERIAL PRIMARY KEY      | Unique category ID                   | AutoField(primary_key=True)                       |
| category_name        | VARCHAR(255) NOT NULL, UNIQUE | Category name                     | CharField(unique=True)                            |
| description          | TEXT NULLABLE           | Category description                 | TextField(null=True, blank=True)                  |

---

### 6. Inventory

| Attribute                | Data Type                | Notes                                | Django Field (Type)                               |
|--------------------------|-------------------------|--------------------------------------|---------------------------------------------------|
| inventory_id             | SERIAL PRIMARY KEY      | Unique inventory ID                  | AutoField(primary_key=True)                       |
| mama_mboga_id            | INTEGER NOT NULL        | FK: mama_mbogas                      | ForeignKey('MamaMboga', on_delete=models.CASCADE) |
| product_id               | INTEGER NOT NULL        | FK: products                         | ForeignKey('Product', on_delete=models.CASCADE)   |
| price_per_unit           | DECIMAL(10,2) NOT NULL  | Price per unit                       | DecimalField(max_digits=10, decimal_places=2)     |
| current_stock_quantity   | DECIMAL(10,2) NOT NULL  | Current stock                        | DecimalField(max_digits=10, decimal_places=2)     |
| last_stock_update        | TIMESTAMP WITH TZ DEFAULT now() | Last stock update             | DateTimeField(auto_now=True)                      |
| is_available             | BOOLEAN DEFAULT TRUE    | Is available                         | BooleanField(default=True)                        |

---

### 7. Order

| Attribute                | Data Type                | Notes                                | Django Field (Type)                               |
|--------------------------|-------------------------|--------------------------------------|---------------------------------------------------|
| order_id                 | SERIAL PRIMARY KEY      | Unique order ID                      | AutoField(primary_key=True)                       |
| customer_id              | INTEGER NOT NULL        | FK: customers                        | ForeignKey('Customer', on_delete=models.RESTRICT) |
| order_date               | TIMESTAMP WITH TZ DEFAULT now() | Order date                    | DateTimeField(auto_now_add=True)                  |
| customer_address_id      | INTEGER NULLABLE        | FK: addresses                        | ForeignKey('Address', on_delete=models.RESTRICT, null=True, blank=True) |
| total_amount             | DECIMAL(10,2) NOT NULL  | Total amount                         | DecimalField(max_digits=10, decimal_places=2)     |
| order_preference_fee     | DECIMAL(10,2) DEFAULT 0.0 | Preference fee                   | DecimalField(max_digits=10, decimal_places=2, default=0.0) |
| current_status           | VARCHAR(50) NOT NULL    | Status (enum: accepted, rejected, completed) | CharField(max_length=50, choices=[('accepted', 'Accepted'), ('rejected', 'Rejected'), ('completed', 'Completed')]) |
| payment_status           | VARCHAR(50) NOT NULL    | Payment status (enum: pending, paid, failed) | CharField(max_length=50, choices=[('pending', 'Pending'), ('paid', 'Paid'), ('failed', 'Failed')]) |
| expected_pickup_time     | TIMESTAMP WITH TZ NULLABLE | Pickup time                      | DateTimeField(null=True, blank=True)              |
| customer_feedback        | TEXT NULLABLE           | Feedback                             | TextField(null=True, blank=True)                  |

---

### 10. Dietary Preference

| Attribute                | Data Type                | Notes                                | Django Field (Type)                               |
|--------------------------|-------------------------|--------------------------------------|---------------------------------------------------|
| preference_id            | SERIAL PRIMARY KEY      | Unique preference ID                 | AutoField(primary_key=True)                       |
| customer_id              | INTEGER NULLABLE        | FK: customers                        | ForeignKey('Customer', on_delete=models.CASCADE)  |
| dietary_type             | VARCHAR(50)             | Dietary type (vegetarian etc.)       | CharField(max_length=50)                          |
| excluded_ingredients     | TEXT[] NULLABLE         | Excluded ingredients                 | ArrayField(models.TextField(), blank=True, default=list) |
| favorite_cuisines        | TEXT[] NULLABLE         | Favorite cuisines                    | ArrayField(models.TextField(), blank=True, default=list) |
| preferred_meal_types     | TEXT[] NULLABLE         | Preferred meal types                 | ArrayField(models.TextField(), blank=True, default=list) |
| nutritional_goal         | VARCHAR(50)             | Nutritional goal                     | CharField(max_length=50)                          |
| created_at               | TIMESTAMP WITH TZ DEFAULT now() | Created date                    | DateTimeField(auto_now_add=True)                  |

---

### 11. Meal Plan

| Attribute                | Data Type                | Notes                                | Django Field (Type)                               |
|--------------------------|-------------------------|--------------------------------------|---------------------------------------------------|
| meal_plan_id             | SERIAL PRIMARY KEY      | Unique meal plan ID                  | AutoField(primary_key=True)                       |
| customer_id              | INTEGER NULLABLE        | FK: customers                        | ForeignKey('Customer', on_delete=models.CASCADE)  |
| name                     | VARCHAR(255) NOT NULL   | Meal plan name                       | CharField(max_length=255)                         |
| start_date               | DATE NOT NULL           | Start date                           | DateField()                                       |
| end_date                 | DATE NOT NULL           | End date                             | DateField()                                       |
| is_active                | BOOLEAN DEFAULT TRUE    | Active                               | BooleanField(default=True)                        |
| base_preference_id       | INTEGER NULLABLE        | FK: dietary_preferences              | ForeignKey('DietaryPreference', on_delete=models.SET_NULL, null=True, blank=True) |
| version                  | INTEGER DEFAULT 1       | Version                              | IntegerField(default=1)                           |
| created_at               | TIMESTAMP WITH TZ DEFAULT now() | Created date                    | DateTimeField(auto_now_add=True)                  |

---

> **Note:**  
> All Django ForeignKey fields should reference their appropriate model classes, and enums should be implemented using Django's `choices` option.
