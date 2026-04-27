export interface Post {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  sections: { heading?: string; body: string }[]
}

export const posts: Post[] = [
  {
    slug: 'should-i-refinance-my-mortgage-2026',
    title: 'Should I Refinance My Mortgage in 2026?',
    description: 'Mortgage rates have shifted significantly over the past few years. Here is how to decide if refinancing makes financial sense for your situation right now.',
    date: '2026-04-26',
    readTime: '5 min read',
    sections: [
      {
        body: 'Mortgage rates have moved dramatically since the low-rate era of 2020–2021. Millions of homeowners who bought or refinanced at 6%, 7%, or higher are now asking the same question: is now a good time to refinance? The honest answer is that it depends entirely on your individual numbers — but this article will walk you through exactly how to figure it out.',
      },
      {
        heading: 'The One Number That Decides Everything',
        body: 'The most important concept in any refinance decision is the <strong>break-even point</strong> — the number of months it takes for your monthly savings to offset what you paid in closing costs. If you plan to stay in the home longer than your break-even, refinancing saves you money. If you might move before then, it probably does not.',
      },
      {
        body: 'Here is how it works. Say your current payment is $2,100/month and a new loan drops it to $1,788/month — a saving of $312/month. If your closing costs are $6,000, your break-even is 6,000 ÷ 312 = <strong>19 months</strong>. Stay longer than 19 months and you come out ahead. Move before then and you lose money on the deal.',
      },
      {
        heading: 'Signs Refinancing Probably Makes Sense',
        body: '<strong>Your rate would drop by at least 0.75%.</strong> This is a common rule of thumb, but it is not universal — a larger loan balance means even a 0.5% drop generates meaningful savings. Run the actual numbers rather than relying on the rule.<br/><br/><strong>Your break-even is under 3 years.</strong> If you can recover closing costs in 36 months or less and you plan to stay in the home, refinancing is almost always a good move.<br/><br/><strong>You have more than 15 years left on your loan.</strong> The earlier you are in your mortgage, the more of each payment goes toward interest rather than principal. Refinancing early maximizes the benefit.',
      },
      {
        heading: 'Signs You Should Wait',
        body: '<strong>Your break-even is 7+ years away.</strong> Unless you are absolutely certain you will stay that long, the math is too risky. Waiting for rates to fall further may be the better play.<br/><br/><strong>You are close to paying off your mortgage.</strong> If you only have 5–8 years left, you have already paid through the interest-heavy early years. Resetting to a new 30-year loan restarts that cycle and likely costs you more total interest even at a lower rate.<br/><br/><strong>Your credit score has dropped since you got your original mortgage.</strong> A lower score means a higher rate offer, which shrinks your savings or eliminates them entirely.',
      },
      {
        heading: '15-Year vs 30-Year: Which Is Better?',
        body: 'A 15-year refinance typically comes with a lower interest rate than a 30-year and cuts your total interest paid nearly in half. The catch is the higher monthly payment — sometimes $400–600 more per month. A 30-year refinance maximizes monthly cash flow relief but costs more in total interest over time. Neither is universally better. It depends on your cash flow, how long you plan to stay, and whether the lower payment of a 30-year loan would let you invest the difference effectively.',
      },
      {
        heading: 'What About Closing Costs?',
        body: 'Closing costs typically run <strong>2–5% of your loan balance</strong>. On a $300,000 loan, that is $6,000–$15,000. Some lenders offer "no-closing-cost" refinances that roll fees into a slightly higher rate — these can make sense if you plan to refinance again in a few years or are not sure how long you will stay. If you are confident you will be in the home for a decade or more, paying closing costs upfront and getting the lower rate is almost always better.',
      },
      {
        heading: 'How to Calculate Your Break-Even Right Now',
        body: 'The fastest way to get your actual numbers is to use a break-even calculator. Enter your current rate, your quoted new rate, your remaining loan balance, and your estimated closing costs. The calculator will show you your monthly savings and exactly how many months until you break even — no spreadsheet required.',
      },
      {
        body: 'The bottom line: refinancing in 2026 can absolutely make financial sense, but only if your specific numbers work. Do not rely on what your neighbor did or a general rule of thumb. Run your actual break-even calculation and let the math tell you.',
      },
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug)
}
