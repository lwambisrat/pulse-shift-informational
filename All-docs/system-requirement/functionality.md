# System Requirements – Greens Mtaani

## Core Functionality

- **Stock Management**: Real-time inventory tracking for Mama Mboga vendors, with low-stock alerts and availability status.
- **Order Management**: Customers can browse, place, and track orders from local vendors; vendors manage and fulfill orders; support for bulk and individual orders.
- **Payments**: Secure M-Pesa integration for mobile transactions, including instant payment processing and digital receipts.
- **Nutrition & Meal Planning**: Personalized nutrition features, dietary preference management, and meal plans generated using external APIs (e.g., Spoonacular).
- **Geocoding & Mapping**: Google Maps API integration for vendor/customer geolocation, delivery radius, and distance-based services.
- **Training & Support**: Platform for Mama Mboga and community training sessions, registration, and attendance tracking.
- **User Management**: Registration, authentication, and profile management for all user types.
- **Community Features**: Community creation, membership, and support/dispute resolution.
- **Compliance & Security**: Consent collection, data minimization, audit logs, encrypted storage, and regulatory compliance (Data Protection Act, Consumer Protection Act, etc.).

---

## User Roles

| Role         | Key Capabilities                                                                                     | Restrictions                     |
|--------------|-----------------------------------------------------------------------------------------------------|----------------------------------|
| Mama Mboga   | Manage stock, products, and prices; process orders; receive payouts; access training and support     | Can only manage their own data   |
| Customer     | Browse/search products, place orders, manage addresses, track orders, set dietary preferences        | Can only see/manage own data     |
| Admin/Moderator | Approve vendors, resolve disputes, manage communities, oversee compliance and platform health     | Full access, except payments     |
| GAIN/Trainer | Create/manage training sessions, verify attendance, access participant lists                         | No access to customer/vendor payments/orders |

---

## Technology Stack

- **Frontend**: React 18+
- **Backend**: Django 4.2 (Django REST Framework)
- **Database**: PostgreSQL 15
- **Hosting**: Heroku (or compatible cloud platform)
- **External APIs**:
  - M-Pesa Daraja (mobile money payments)
  - Google Maps (geocoding, distance calculation)
  - Spoonacular (recipes and nutrition for meal planning)

---