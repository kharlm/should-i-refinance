import Link from 'next/link'
import type { Metadata } from 'next'
import ScrollFade from '@/components/ScrollFade'

export const metadata: Metadata = {
  title: 'Should I Refinance My Mortgage? — Free Calculator',
  description: 'Find out if refinancing your mortgage makes sense. Free break-even calculator plus a full personalized recommendation for $4.99.',
  openGraph: {
    title: 'Should I Refinance My Mortgage?',
    description: 'Free mortgage refinance calculator. Get your monthly savings and break-even timeline instantly.',
    type: 'website',
  },
}

const FAQ = [
  {
    q: 'How do I know if refinancing is worth it?',
    a: 'The most reliable way is to calculate your break-even point — how many months it takes for your monthly savings to offset the closing costs. If you plan to stay in the home past that point, refinancing typically makes sense.',
  },
  {
    q: 'What is a good rate drop to refinance?',
    a: 'A common rule of thumb is at least 0.75–1% lower rate, but it depends on your loan balance and closing costs. A larger loan balance amplifies savings, so even a 0.5% drop can be worthwhile on a $400k+ balance.',
  },
  {
    q: 'How much are typical closing costs?',
    a: 'Closing costs usually run 2–5% of the loan amount. On a $300,000 loan, expect $6,000–$15,000. Some lenders offer no-closing-cost refinances that roll fees into the rate — these have a higher monthly payment but no upfront cost.',
  },
  {
    q: 'Should I refinance to a 15-year or 30-year loan?',
    a: 'A 15-year loan saves significantly more in total interest and typically has a lower rate, but the higher monthly payment may strain your budget. A 30-year refinance gives maximum monthly relief. Our full analysis compares both side by side.',
  },
  {
    q: 'What if rates drop further after I refinance?',
    a: "You can always refinance again. If rates drop another 0.75%+ after you refinance, a second refinance may make sense — you'd just run the numbers again. There's no rule that says you can only refinance once.",
  },
]

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0 select-none">
      {/* Main card */}
      <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-7 sm:p-10">
        <svg viewBox="0 0 220 180" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {/* House body */}
          <rect x="35" y="90" width="150" height="90" rx="4" fill="rgba(99,102,241,0.12)" stroke="rgba(165,180,252,0.3)" strokeWidth="1.5"/>
          {/* Roof */}
          <polygon points="18,92 110,14 202,92" fill="rgba(99,102,241,0.35)" stroke="rgba(165,180,252,0.45)" strokeWidth="1.5"/>
          {/* Chimney */}
          <rect x="145" y="33" width="15" height="36" fill="rgba(99,102,241,0.45)"/>
          {/* Door */}
          <rect x="85" y="126" width="50" height="54" rx="25" fill="rgba(79,70,229,0.5)" stroke="rgba(165,180,252,0.25)" strokeWidth="1"/>
          {/* Left window */}
          <rect x="47" y="103" width="38" height="30" rx="4" fill="rgba(196,181,253,0.1)" stroke="rgba(165,180,252,0.4)" strokeWidth="1"/>
          <line x1="66" y1="103" x2="66" y2="133" stroke="rgba(165,180,252,0.3)" strokeWidth="0.8"/>
          <line x1="47" y1="118" x2="85" y2="118" stroke="rgba(165,180,252,0.3)" strokeWidth="0.8"/>
          {/* Right window */}
          <rect x="135" y="103" width="38" height="30" rx="4" fill="rgba(196,181,253,0.1)" stroke="rgba(165,180,252,0.4)" strokeWidth="1"/>
          <line x1="154" y1="103" x2="154" y2="133" stroke="rgba(165,180,252,0.3)" strokeWidth="0.8"/>
          <line x1="135" y1="118" x2="173" y2="118" stroke="rgba(165,180,252,0.3)" strokeWidth="0.8"/>
          {/* Upward trend line */}
          <polyline points="35,172 65,155 100,162 135,138 168,112 200,92" stroke="rgba(16,185,129,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          {/* Endpoint glow */}
          <circle cx="200" cy="92" r="9" fill="rgba(16,185,129,0.18)"/>
          <circle cx="200" cy="92" r="4.5" fill="#10b981"/>
        </svg>
      </div>

      {/* Floating badge — monthly savings */}
      <div className="animate-float absolute -top-5 -right-4 sm:-right-8 bg-white rounded-2xl shadow-xl px-3.5 py-2.5 flex items-center gap-2.5 border border-slate-100 z-10">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] leading-none text-slate-400 mb-1">Monthly savings</p>
          <p className="text-sm font-bold text-emerald-600 leading-none">+$312/mo</p>
        </div>
      </div>

      {/* Floating badge — break-even */}
      <div className="animate-float-alt absolute -bottom-5 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl px-3.5 py-2.5 flex items-center gap-2.5 border border-slate-100 z-10">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] leading-none text-slate-400 mb-1">Break-even point</p>
          <p className="text-sm font-bold text-indigo-600 leading-none">18 months</p>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden py-24 sm:py-32 px-6"
          style={{
            background:
              'radial-gradient(ellipse at 20% 60%, rgba(99,102,241,0.2) 0%, transparent 55%), radial-gradient(ellipse at 80% 15%, rgba(99,102,241,0.12) 0%, transparent 50%), #0f172a',
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-8 items-center">

              {/* Left: copy */}
              <div className="space-y-7">
                <div
                  className="animate-fade-in-up inline-flex items-center gap-2 text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
                  No signup required · Instant results
                </div>

                <h1
                  className="animate-fade-in-up text-5xl sm:text-6xl font-extrabold text-white leading-[1.06] tracking-tight"
                  style={{ animationDelay: '80ms' }}
                >
                  Should I Refinance<br />My Mortgage?
                </h1>

                <p
                  className="animate-fade-in-up text-lg text-slate-400 max-w-lg leading-relaxed"
                  style={{ animationDelay: '160ms' }}
                >
                  Enter your numbers and find out in seconds. Free break-even calculator — full personalized recommendation for $4.99.
                </p>

                <div
                  className="animate-fade-in-up"
                  style={{ animationDelay: '240ms' }}
                >
                  <Link
                    href="/calculator"
                    className="animate-pulse-glow inline-flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-base px-8 py-4 rounded-full transition-colors duration-200 shadow-lg shadow-indigo-950/60"
                  >
                    Try the Free Calculator
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <p
                  className="animate-fade-in-up flex items-center gap-2 text-sm text-slate-500"
                  style={{ animationDelay: '320ms' }}
                >
                  <span className="text-amber-400 tracking-tight">★★★★★</span>
                  <span>Average user saves <strong className="text-slate-300 font-semibold">$312/month</strong> after refinancing</span>
                </p>
              </div>

              {/* Right: illustration */}
              <div
                className="animate-fade-in-up hidden sm:flex justify-center lg:justify-end pr-8 lg:pr-12"
                style={{ animationDelay: '160ms' }}
              >
                <HeroIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* Wave divider */}
        <div className="bg-[#0f172a]">
          <svg viewBox="0 0 1440 56" className="w-full block" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,0 C480,56 960,0 1440,42 L1440,56 L0,56 Z" fill="white"/>
          </svg>
        </div>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <ScrollFade className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 tracking-tight">What You Get</h2>
            <p className="text-slate-500 text-lg">Two tiers designed to match where you are in the decision</p>
          </ScrollFade>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            {/* Free card */}
            <ScrollFade delay={80} className="h-full">
              <div className="group relative bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-800 text-xl">Break-Even Calculator</h3>
                  <span className="text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Free</span>
                </div>
                <ul className="space-y-3.5 flex-1">
                  {['Monthly payment difference', 'Break-even timeline in months', 'Instant, no account needed'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-3 h-3 text-emerald-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollFade>

            {/* Paid card */}
            <ScrollFade delay={160} className="h-full">
              <div className="group relative bg-white rounded-2xl border-2 border-indigo-500 p-7 shadow-lg shadow-indigo-100/80 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="absolute -top-3.5 left-6">
                  <span className="text-xs font-bold text-white bg-indigo-600 px-3 py-1 rounded-full shadow-sm tracking-wide">
                    Most Popular
                  </span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-800 text-xl">Full Analysis</h3>
                  <span className="text-xl font-bold text-indigo-600">$4.99</span>
                </div>
                <ul className="space-y-3.5 flex-1">
                  {[
                    'Yes / No / Wait recommendation',
                    'Total interest saved over loan life',
                    'Net benefit after closing costs',
                    '15-yr vs 30-yr comparison',
                    'Downloadable PDF summary',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-3 h-3 text-indigo-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollFade>
          </div>

          <ScrollFade delay={240} className="text-center mt-12">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm px-8 py-4 rounded-full transition-colors duration-200 shadow-sm"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollFade>
        </section>

        {/* ── How it works ─────────────────────────────────────────────────── */}
        <section className="bg-slate-50 border-y border-slate-100 py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <ScrollFade>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12 tracking-tight">How Refinancing Works</h2>
            </ScrollFade>
            <div className="space-y-5 text-slate-600 leading-relaxed text-[15px]">
              <ScrollFade delay={80}>
                <p>
                  Refinancing replaces your current mortgage with a new one — ideally at a lower interest rate. The tradeoff is that you pay closing costs upfront (typically 2–5% of your loan balance), so the key question is whether your monthly savings will eventually add up to more than those costs.
                </p>
              </ScrollFade>
              <ScrollFade delay={140}>
                <p>
                  The <strong className="text-slate-800 font-semibold">break-even point</strong> is the number of months it takes for your accumulated monthly savings to equal your closing costs. If you plan to stay in the home longer than that, refinancing puts money back in your pocket. If you might move sooner, the math often does not work.
                </p>
              </ScrollFade>
              <ScrollFade delay={200}>
                <p>
                  Beyond the break-even point, there is more to consider: the total interest you would pay over the life of each loan, whether shortening your loan term (15yr vs 30yr) makes sense, and whether current rate trends suggest waiting might yield an even better deal.
                </p>
              </ScrollFade>
              <ScrollFade delay={260}>
                <p>
                  Our calculator handles all of this. The free tier gives you the break-even snapshot. The full $4.99 analysis gives you a clear yes/no/wait recommendation with everything you need to walk into a lender conversation with confidence.
                </p>
              </ScrollFade>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="max-w-2xl mx-auto px-6 py-20">
          <ScrollFade>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12 tracking-tight">Common Questions</h2>
          </ScrollFade>
          <div className="space-y-0">
            {FAQ.map(({ q, a }, i) => (
              <ScrollFade key={q} delay={i * 60}>
                <div className="border-b border-slate-100 py-7 first:pt-0">
                  <h3 className="font-semibold text-slate-800 mb-2.5 text-[15px]">{q}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
          <ScrollFade className="text-center mt-14">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm px-8 py-4 rounded-full transition-colors duration-200 shadow-sm"
            >
              Run the Numbers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollFade>
        </section>
      </main>
    </>
  )
}
