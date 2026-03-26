export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-xs text-slate-400 space-y-1">
        <p>Should I Refinance is for informational purposes only and does not constitute financial advice.</p>
        <p>Always consult a licensed mortgage professional before making refinancing decisions.</p>
        <p className="pt-2">© {new Date().getFullYear()} Should I Refinance</p>
      </div>
    </footer>
  )
}
