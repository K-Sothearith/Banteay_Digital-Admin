# Banteay Digital Admin Frontend

The Admin console uses the Banteay Digital backend's HTTP-only session cookie and server-enforced `ADMIN` role.

## Local development

1. Start `D:\BanteayDigital-Backend` on port `3000`.
2. In this directory, run `npm install` and `npm run dev`.
3. Open the Vite URL and sign in with an account whose database role is `ADMIN`.

Vite proxies `/api` to `http://localhost:3000`, so local cookies work without extra frontend configuration.

## Deployment

Set `VITE_API_BASE_URL` to the backend API prefix, for example `https://api.example.com/api`. The backend must include the Admin frontend origin in `CLIENT_ORIGINS` because requests use credentials.

For a frontend and backend hosted on different sites, the backend defaults its production session cookie to `SameSite=None; Secure`. `COOKIE_SAME_SITE` can explicitly be set to `lax`, `strict`, or `none` when both applications share a site or require another policy.

## Authorization behavior

- Login uses `POST /api/v1/auth/login`.
- Session restoration uses `GET /api/v1/auth/me`.
- The console renders protected pages only for a returned `ADMIN` user.
- Every `/api/v1/admin/*` endpoint independently enforces authentication and the database-backed Admin role.
- A regular user visiting this frontend is denied Admin access without terminating their user session.
