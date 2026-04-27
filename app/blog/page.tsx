import Link from 'next/link'
import type { Metadata } from 'next'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Mortgage Refinance Articles & Guides',
  description: 'Practical guides to help you decide whether refinancing your mortgage makes financial sense.',
}

export default function BlogPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">Refinance Guides</h1>
        <p className="text-slate-500 text-lg">Practical articles to help you make a smarter refinancing decision.</p>
      </div>

      <div className="space-y-px">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border-b border-slate-100 py-8 first:pt-0 hover:no-underline"
          >
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors duration-150 mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">{post.description}</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 mt-3 group-hover:gap-2 transition-all duration-150">
              Read article
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
