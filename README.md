# Should I Refinance?

A full-stack web app that helps homeowners decide whether to refinance their mortgage. Free break-even calculator with an optional $4.99 full analysis including a yes/no/wait recommendation, 15-yr vs 30-yr comparison, and a downloadable PDF report.

## Features

- **Free break-even calculator** — instant monthly savings and break-even timeline, no account required
- **Full paid analysis ($4.99)** — clear yes/no/wait recommendation, total interest saved, net benefit after closing costs, 15-yr vs 30-yr loan comparison
- **Downloadable PDF report** — shareable summary of the full analysis
- **Stripe payments** — one-time payment with server-side verification via Stripe Checkout
- **JWT session management** — httpOnly cookie-based sessions, no database required
- **Blog** — SEO-optimized articles on refinancing topics

## Tech Stack

- **Next.js 16** (App Router) — React framework
- **TypeScript** — end-to-end type safety
- **Stripe** — payments and webhook handling
- **Jose** — JWT signing and verification
- **Tailwind CSS** — styling
- **Vercel** — deployment

## Getting Started

### Prerequisites

- Node.js 18+
- A Stripe account (test keys work for local dev)

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/kharlm/should-i-refinance.git
   cd should-i-refinance
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory
   ```bash
   cp .env.example .env.local
   ```
   Then fill in your values — see `.env.example` for instructions on where to get each one.

4. Start the development server
   ```bash
   npm run dev
   ```

5. For local Stripe webhook testing, install the Stripe CLI and run:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   Copy the webhook signing secret it prints and set it as `STRIPE_WEBHOOK_SECRET` in `.env.local`.

## How It Works

1. User enters their mortgage details into the free calculator
2. Free results (monthly savings + break-even point) are shown instantly
3. To unlock the full analysis, the user pays $4.99 via Stripe Checkout
4. On successful payment, Stripe calls the webhook which signs the analysis into a JWT
5. The JWT is stored in an httpOnly cookie and used to render the full results page
6. User can download a PDF of their full report
