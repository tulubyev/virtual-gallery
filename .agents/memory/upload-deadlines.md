---
name: Upload timeout coordination
description: Why upload clients must wait longer than the server's full processing and storage budget.
---

Give interactive upload clients enough time for image processing, every sequential storage request (including retries), and database work; do not reuse a shorter general-purpose API timeout.

**Why:** A client timeout can hide the server's actionable storage error. If storage eventually succeeds after the client gives up, users may retry and create duplicates.

**How to apply:** When changing upload or storage deadlines, check the entire client-to-server path and test a stalled storage request that lasts longer than the normal API timeout.
