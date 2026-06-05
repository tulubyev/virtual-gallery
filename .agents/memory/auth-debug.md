---
name: Auth debug flag
description: How to enable/disable real JWT authentication in the React SPA.
---

## Rule
`const DEBUG_SKIP_AUTH = false;` in `src/frontend/src/App.tsx`.

When `true`: all route guards are bypassed, every dashboard is accessible without login,
and an amber warning banner is shown at the top of the page.

When `false`: the `guard()` function checks `currentUser.role` against allowed roles
and redirects to `/login` if not authorised.

**Why:** Was set to `true` during early development so all pages could be tested without
a working auth backend. Flipped to `false` once real login was confirmed working.
The flag is now dead code and should be removed entirely (see follow-up task).

**How to apply:** If auth ever needs to be bypassed again for debugging, flip to `true`
temporarily — but revert before any commit that ships to users.
