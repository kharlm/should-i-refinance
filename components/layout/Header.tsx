import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">$</span>
          </div>
          <span className="font-semibold text-slate-800 text-sm">Should I Refinance</span>
        </Link>
        <Link
          href="/calculator"
          className="text-sm text-blue-600 font-medium hover:text-blue-700"
        >
          Try the Calculator
        </Link>
      </div>
    </header>
  )
}
