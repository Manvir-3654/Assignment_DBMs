## Summary
- Cleaned Prisma schema for patients, doctors, and appointments (`@@map` / `@map`, PascalCase models, camelCase fields).
- Implemented TypeScript CRUD for Patient, Doctor, and Appointment, including `connect` and nested `include`.
- Added seed (`npx prisma db seed`) and an end-to-end test script (`npx tsx src/test.ts`).

## Test plan
- [x] `npx prisma generate` succeeds
- [x] `npx prisma db seed` inserts 2 doctors, 2 patients, 2 appointments
- [x] `npx tsx src/test.ts` prints all expected lines without errors
- [x] `.env` is gitignored and not committed

## Test script output

See `TEST_OUTPUT.md` (terminal output from `npx tsx src/test.ts`):

```
── Patients ──────────────────────────
Created: Test Patient 3
Found: Test Patient
Updated phone: 8888888888
Search results: 1

── Doctors ───────────────────────────
Created: Dr. Test 3
Found doctor: Dr. Test
General Medicine doctors: 1

── Appointments ──────────────────────
Booked: 3 for Test Patient
Full fetch: Test Patient with Dr. Test
Doctor schedule: 1 appointment(s)
Status updated to: cancelled
Cancelled remaining scheduled appointments: 0

── Cleanup ───────────────────────────
Test data cleaned up.
```
