export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white mt-20">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center shrink-0">
            <span className="text-white text-[10px] font-bold">$</span>
          </div>
          <span className="font-medium text-slate-500">Should I Refinance</span>
        </div>
        <div className="text-center sm:text-right space-y-1">
          <p>Should I Refinance is for informational purposes only and does not constitute financial advice.</p>
          <p>Always consult a licensed mortgage professional before making refinancing decisions.</p>
          <p className="pt-1">© {new Date().getFullYear()} Should I Refinance</p>
        </div>
      </div>
    </footer>
  )
}
