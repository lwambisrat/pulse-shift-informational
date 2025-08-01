# Greens Mtaani System Architecture Diagram

The Greens Mtaani System Architecture Diagram presents a high-level overview of the components, interactions, and data flow within the Greens Mtaani application. This diagram serves as a visual guide to understanding how different modules of the system collaborate to deliver a seamless user experience, support operational efficiency, and ensure secure management of information. By examining this architecture, stakeholders and developers gain clarity on the system’s structure, scalability, and integration points, laying a solid foundation for development and future enhancements.

![System Architecture Diagram](../images/system-architecture.png)

The Greens Mtaani platform adopts a microservices-inspired architecture with a clear separation of concerns. Below is a markdown diagram of the system architecture:

```mermaid
flowchart LR
    subgraph Users
        A[Customer]
        B[Mama Mboga]
    end

    subgraph Apps
        AA[Mobile App]
        BB[Progressive Web App]
    end

    subgraph Modules
        F1[Order Management Module]
        F2[Payment Module]
        F3[Nutrition Planning Module]
        F4[Location Module]
        F5[Reviews & Feedback Module]
        F6[Inventory Management Module]
        F7[Sales Module]
    end

    subgraph External_APIs
        X1[Geocoding API]
        X2[Spoonacular API]
        X3[Daraja M-Pesa API]
    end

    Y[Database]

    %% Customer Flow
    A-->|Order groceries<br>Get groceries|AA
    AA-->|Customer views authentication status|F1
    AA-->|Display meal plan with recipes|F3
    AA-->|View customer sent feedback|F5
    AA-->|View Mama Mboga location|F4
    AA-->|Customer inputs payment details|F2
    AA-->|Customer receives order ID & tracks order|F1
    AA-->|Submit feedback|F5

    %% Mama Mboga Flow
    B-->|Sell groceries<br>Get customers|BB
    BB-->|Mama Mboga views products|F6
    BB-->|Mama Mboga adds products|F6
    BB-->|Mama Mboga views ordered items|F1
    BB-->|Mama Mboga check sales|F7

    %% Module interactions
    F1-->|Send customer order details|Y
    F1-->|Retrieve ordered list<br>Retrieve order ID<br>Update order status|Y
    F1-->|Store customer order|Y
    F1-->|Order details for Mama Mboga|BB
    F2-->|Send Payment Request|X3
    F2-->|Receive Payment Confirmation|X3
    F2-->|Store order payment details|Y
    F3-->|Request recipes|X2
    F3-->|Retrieve list of recipes|X2
    F3-->|Store meal plan & nutrition goals|Y
    F4-->|Send location request|X1
    F4-->|Retrieve location|X1
    F4-->|Store location details|Y
    F5-->|Store feedback|Y
    F5-->|Retrieve feedback details|Y
    F6-->|Store products|Y
    F6-->|Retrieve products|Y
    F7-->|Retrieve sales list|Y
    F7-->|Request for sales|Y

    %% API to DB
    X1-->|Store location details|Y
    X2-->|Store meal plan & nutrition goals|Y
    X3-->|Store order payment details|Y

    %% Security
    classDef security fill:#f9f,stroke:#333,stroke-width:2px;
    class AA,BB security;
    %% Note: JWT authentication, RBAC, and encryption at rest/in transit are enforced across all modules.
```

---

**Key Architectural Elements:**
- **Frontend**: React (with Redux) for web/mobile, Progressive Web App for Mama Mboga.
- **Backend**: Django REST Framework, microservices-inspired modular approach.
- **Database**: PostgreSQL.
- **External APIs**: M-Pesa (payments), Google Maps (location), Spoonacular (nutrition/recipes).
- **Modules**: Order, Payment, Nutrition, Location, Inventory, Sales, Reviews/Feedback.
- **Security**: JWT-based authentication, role-based authorization, encryption at rest and in transit.

```
- Customers interact via mobile app for ordering, payments, meal planning, viewing locations, and feedback.
- Sellers (Mama Mboga) use the web app for product management, order tracking, and sales analytics.
- Each domain (orders, payments, inventory, etc.) is handled by its own module, interacting with external APIs and the central database.
- Security is enforced through JWT tokens, role-based access, and encryption.
```