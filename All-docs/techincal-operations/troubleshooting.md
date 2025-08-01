## Troubleshooting Common API Issues

### 1. Port Already in Use

- **Error**: `Address already in use`
- **Solution**: Stop any process using the port or run on a different port:
  - Django: `python manage.py runserver 8001`
  - React: `PORT=3001 npm start`

### 2. Database Connection Errors

- **Error**: `could not connect to server: Connection refused`
- **Check**:
  - Is PostgreSQL server running?
  - Are credentials in `.env` correct?
  - Is `DATABASE_URL` properly set?

### 3. Missing or Incorrect Environment Variables

- **Error**: `KeyError: 'SECRET_KEY'` or similar
- **Solution**: Ensure `.env` files exist and are filled with valid values for both backend and frontend.

### 4. CORS Issues (Frontend can't talk to Backend)

- **Error**: `CORS policy: No 'Access-Control-Allow-Origin'`
- **Solution**: 
  - Ensure `django-cors-headers` is installed and configured in backend `settings.py`.
  - Add your frontend URL (e.g., `http://localhost:3000`) to `CORS_ALLOWED_ORIGINS`.

### 5. Static/Media File Errors

- **Error**: Missing images, files, or uploads not working.
- **Solution**: 
  - Run `python manage.py collectstatic` (for production).
  - Make sure `MEDIA_ROOT` and `MEDIA_URL` are configured.

### 6. API 400/500 Errors

- **Error**: `{"error": "BAD_REQUEST", ...}` or server error
- **Solution**:
  - Check backend logs for stacktrace.
  - Validate your API request body structure and required fields.
  - Use Django admin to inspect data.

### 7. React App Doesn't Build or Start

- **Error**: Dependency or build errors.
- **Solution**:
  - Delete `node_modules` and `package-lock.json`, then run `npm install` again.
  - Ensure correct Node.js and npm versions (see `package.json` or project docs).

---

## Additional Notes

- Always activate your Python virtual environment before running backend commands.
- For production, configure gunicorn, nginx, and secure your `.env` files.
- Use `npm run build` to generate a production build of the frontend.
- Review documentation/comments for any app-specific configurations.

---

**If you run into issues not covered here, check:**
- Backend logs (`backend/logs/` or console output)
- Frontend console and browser network tab
- The project README or documentation for more details