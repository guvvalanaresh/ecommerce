# Food Delivery Server (Prisma + Express)

## Quickstart

1. Copy .env.example to .env and fill DATABASE_URL and JWT_SECRET.
2. Install dependencies: `npm install`.
3. Initialize Prisma & DB: `npx prisma generate`, then `npx prisma migrate dev --name init`.
4. Start server: `npm run dev`.

API root: http://localhost:8000/

Notes:
- OTP is mocked (printed in server logs). Replace with SMS provider integration.
- This scaffold is intentionally simple; add validation, rate limiting, logging, and tests for production.
