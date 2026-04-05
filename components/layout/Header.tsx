import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors duration-200">
            <span className="text-white text-xs font-bold">$</span>
          </div>
          <span className="font-semibold text-slate-800 text-sm tracking-tight">Should I Refinance</span>
        </Link>
        <Link
          href="/calculator"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-indigo-50"
        >
          Try the Calculator
        </Link>
      </div>
    </header>
  )
}
