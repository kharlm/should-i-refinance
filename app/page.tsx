import Link from 'next/link'
import type { Metadata } from 'next'

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
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 py-16 px-4">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <div className="inline-block text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              No signup required · Instant results
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Should I Refinance<br className="hidden sm:block" /> My Mortgage?
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Enter your numbers and find out in seconds. Free break-even calculator — full personalized recommendation for $4.99.
            </p>
            <Link
              href="/calculator"
              className="inline-block bg-blue-600 text-white font-semibold text-sm px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              Try the Free Calculator →
            </Link>
            <p className="text-xs text-slate-400">Used by homeowners across the US to make smarter refinancing decisions</p>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">What You Get</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { tier: 'Free', title: 'Break-Even Calculator', items: ['Monthly payment difference', 'Break-even timeline in months', 'Instant, no account needed'] },
              { tier: '$4.99', title: 'Full Analysis', items: ['Yes / No / Wait recommendation', 'Total interest saved over loan life', 'Net benefit after closing costs', '15-yr vs 30-yr comparison', 'Downloadable PDF summary'] },
            ].map(({ tier, title, items }) => (
              <div key={tier} className={`rounded-2xl border p-6 space-y-4 ${tier === '$4.99' ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">{title}</h3>
                  <span className={`text-sm font-bold ${tier === '$4.99' ? 'text-blue-600' : 'text-slate-400'}`}>{tier}</span>
                </div>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/calculator" className="inline-block bg-blue-600 text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors">
              Get Started Free →
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-slate-50 border-y border-slate-100 py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">How Refinancing Works</h2>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                Refinancing replaces your current mortgage with a new one — ideally at a lower interest rate. The tradeoff is that you pay closing costs upfront (typically 2–5% of your loan balance), so the key question is whether your monthly savings will eventually add up to more than those costs.
              </p>
              <p>
                The <strong className="text-slate-700">break-even point</strong> is the number of months it takes for your accumulated monthly savings to equal your closing costs. If you plan to stay in the home longer than that, refinancing puts money back in your pocket. If you might move sooner, the math often does not work.
              </p>
              <p>
                Beyond the break-even point, there is more to consider: the total interest you would pay over the life of each loan, whether shortening your loan term (15yr vs 30yr) makes sense, and whether current rate trends suggest waiting might yield an even better deal.
              </p>
              <p>
                Our calculator handles all of this. The free tier gives you the break-even snapshot. The full $4.99 analysis gives you a clear yes/no/wait recommendation with everything you need to walk into a lender conversation with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-2xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">Common Questions</h2>
          <div className="space-y-6">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="border-b border-slate-100 pb-6">
                <h3 className="text-sm font-semibold text-slate-800 mb-2">{q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/calculator" className="inline-block bg-blue-600 text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors">
              Run the Numbers →
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
