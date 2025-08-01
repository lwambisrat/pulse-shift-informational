# External Integrations

## M-Pesa Daraja API
### Purpose
Handle mobile money payments for customer orders and vendor payouts.

### Key Endpoints
- **STK Push**: `https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest`
- **Transaction Status**: `https://api.safaricom.co.ke/mpesa/transactionstatus/v1/query`
- **Callback URL**: `{BASE_URL}/api/payments/mpesa/callback/`

### Authentication
OAuth 2.0 using consumer key and secret.

### Implementation Notes
- Use sandbox endpoint for development: `https://sandbox.safaricom.co.ke`
- Production deployment requires Safaricom security audit and approval.
- All requests must be signed using base64-encoded credentials.
- Handle asynchronous payment confirmations via callback URL.
- Store M-Pesa transaction references and statuses in the database.

---

## Google Maps API
### Purpose
Provide geocoding for addresses and calculate delivery distances.

### Key Endpoints
- **Geocoding**: `https://maps.googleapis.com/maps/api/geocode/json`
- **Distance Matrix**: `https://maps.googleapis.com/maps/api/distancematrix/json`

### Authentication
API key passed as a query parameter.

### Implementation Notes
- Enable Geocoding and Distance Matrix APIs in Google Cloud Console.
- API keys must have IP/domain/application restrictions.
- Store and restrict API keys as environment variables.
- Monitor Google Cloud usage and set up alerts for quota/billing.

---

## Spoonacular API
### Purpose
Fetch nutritional information and recipe data for meal planning.

### Key Endpoints
- **Get Recipes**: `https://api.spoonacular.com/recipes/complexSearch`
- **Recipe Details**: `https://api.spoonacular.com/recipes/{id}/information`

### Authentication
API key passed as a query parameter.

### Implementation Notes
- Store API keys as environment variables.
- Implement error handling for quota limits and API failures.
- Use API responses to build personalized meal plans for customers.

---

## Security Considerations
- All API keys and secrets are stored securely as environment variables.
- Never commit credentials to version control.
- Requests are signed where required (e.g., M-Pesa Daraja).
- Apply rate limiting (default: 100 requests/min/user) to all outgoing API calls.
- Implement robust error handling for all integration points.
- Monitor all API usage and configure alerts for failures or suspicious activity.