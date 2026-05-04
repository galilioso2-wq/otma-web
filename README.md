# OTMA — Intelligent AI Agents for Global Enterprises

Built with Next.js 16 App Router · TypeScript · Tailwind CSS v4 · Bilingual EN/AR

---

## Setup

### Prerequisites
- Node.js 20+
- pnpm 10+

### 1. Clone and install
```bash
git clone https://github.com/your-org/otma-web.git
cd otma-web
pnpm install
```

### 2. Environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx        # Required for contact form
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=otma.io  # Optional analytics
```

Get a Resend API key at [resend.com](https://resend.com).

### 3. Run dev server
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) — auto-redirects to `/en`.

---

## Routes

| Route | Description |
|-------|-------------|
| `/en` | Home (English) |
| `/ar` | Home (Arabic, RTL) |
| `/en/services` | Services overview |
| `/en/services/[slug]` | Service detail |
| `/en/about` | About + Founder bio |
| `/en/case-studies` | Case studies |
| `/en/contact` | Contact + form |
| `/api/contact` | Contact form API (Resend) |

Replace `/en` with `/ar` for Arabic versions.

---

## Build

```bash
pnpm build
pnpm start
```

---

## Deploy to Netlify

1. Connect your repository at [netlify.com](https://netlify.com)
2. Build command: `pnpm build`
3. Publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. `@netlify/plugin-nextjs` is already configured in `netlify.toml`

Or deploy via CLI:
```bash
pnpm build
netlify deploy --prod
```

Point the `otma.io` apex domain to your Netlify site in DNS settings.

---

## Adding content

All copy lives in:
- [`content/en.json`](content/en.json) — English
- [`content/ar.json`](content/ar.json) — Arabic

Edit these files to update any page copy, service descriptions, or case studies. Both files must stay in sync.

---

## Brand tokens

CSS variables defined in `app/globals.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--otma-navy` | `#080D18` | Primary background |
| `--otma-cyan` | `#00D4FF` | CTAs, accents (dark bg only) |
| `--otma-cyan-deep` | `#0099BB` | Links on white bg |
| `--otma-steel` | `#4A5878` | Secondary text |

Tailwind utilities: `bg-otma-navy`, `text-otma-cyan`, etc.

---

## Arabic documentation / التوثيق بالعربية

### الإعداد
```bash
pnpm install
cp .env.example .env.local  # أضف مفتاح Resend
pnpm dev
```

### البناء والنشر
```bash
pnpm build
netlify deploy --prod
```

### إضافة المحتوى
عدّل ملف [`content/ar.json`](content/ar.json) لتحديث أي نص بالعربية.

---

© 2026 OTMA · otma.io · Riyadh, Built for the world
