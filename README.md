# Duck Quest

Private birthday quest platform with 5 hourly tasks, collectible greeting cards, and a final gift unlock.

## Personalization

Edit `script.js`:

- `AUTH_LOGIN` — platform login.
- `AUTH_PASSWORD_HASH` — SHA-256 hash of the password.
- `personalConfig` — names and optional image paths.
- `gameConfig.giftLocation` — final gift location.
- `gameConfig.finalMessage` — final message.
- `gameConfig.tasks` — tasks and artifact card text.

## Photos

Put optional images in `photos/`:

- `photos/him.jpg`
- `photos/me.jpg`
- `photos/styled-him.jpg`

If an image is missing, the card uses the duck sticker placeholder.

## Local Testing

Run:

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000/
```

Local-only QA helpers:

- `?reset=1` clears local progress.
- `?fast=1` changes the 1-hour lock to 1 second.
- `?auth=1` skips the login gate for development screenshots only.
- `?logout=1` clears the current login session.

`?fast=1`, `?auth=1`, and the `guest` test account work only on localhost or a local file URL. They are disabled on the public deployed site.

Test editor mode:

- Open `http://localhost:8000/?logout=1&reset=1&fast=1`
- Login: `guest`
- Password: `0000`
- The editor appears below the quest and autosaves text changes to this browser.
- Normal mode on the same deployed origin reads the saved text automatically.

Example:

```text
http://localhost:8000/?reset=1&fast=1&auth=1
```

## Deployment

This is a static site and can be published with GitHub Pages, Vercel, Netlify, or any static host.

Note: current auth is client-side and suitable for a private gift link, not for high-security data. For stronger protection on Vercel, add a serverless auth gate later.
