---
name: Auth debug flag
description: How to enable/disable real JWT authentication in the React SPA.
---

## Rule
`const DEBUG_SKIP_AUTH = true;` on line ~59 of `src/frontend/src/App.tsx`.

When `true`: all route guards are bypassed, every dashboard is accessible without login,
and an amber warning banner is shown at the top of the page.

When `false`: the `guard()` function checks `currentUser.role` against allowed roles
and redirects to `/login` if not authorised.

**Why:** Set to `true` during development so all pages can be tested without a working
auth backend. Must be flipped to `false` before any production release.

**How to apply:** Before going live, set `DEBUG_SKIP_AUTH = false` and verify that
`fetchUserData(token)` in the useEffect is uncommented and correctly populates `currentUser`.
