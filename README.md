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

- Local testing: open `http://localhost:8000/?logout=1&reset=1&fast=1`, login `guest`, password `0000`.
- Public editor: login `lianna4353`, password `lianna_editor_dr`.
- The editor appears below the quest and autosaves text changes.

Example:

```text
http://localhost:8000/?reset=1&fast=1&auth=1
```

## Supabase Content Storage

The site can autosave editor text to Supabase so public visitors receive updated content without redeploying.

1. Create a Supabase project.
2. Open SQL Editor and run:

```sql
create table if not exists duck_quest_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz default now()
);

alter table duck_quest_content enable row level security;

create policy "Public read duck quest content"
on duck_quest_content for select
to anon
using (true);

create policy "Public write duck quest content"
on duck_quest_content for insert
to anon
with check (true);

create policy "Public update duck quest content"
on duck_quest_content for update
to anon
using (true)
with check (true);
```

3. Copy `Project URL` and `Publishable key` from Supabase Project Settings -> API Keys.
4. Paste them into `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `script.js`.

Note: this is convenient for a private birthday link, not high-security admin protection.

## Deployment

This is a static site and can be published with GitHub Pages, Vercel, Netlify, or any static host.

Note: current auth is client-side and suitable for a private gift link, not for high-security data. For stronger protection on Vercel, add a serverless auth gate later.
