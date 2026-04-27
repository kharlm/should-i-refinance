import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { posts, getPost } from '@/lib/posts'

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: 'article' },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors mb-10">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        All articles
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed">{post.description}</p>
      </div>

      <hr className="border-slate-100 mb-10" />

      {/* Article body */}
      <article className="prose-slate space-y-6">
        {post.sections.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h2 className="text-xl font-bold text-slate-800 mt-10 mb-3">{section.heading}</h2>
            )}
            <p
              className="text-slate-600 leading-relaxed text-[15px]"
              dangerouslySetInnerHTML={{ __html: section.body }}
            />
          </div>
        ))}
      </article>

      {/* CTA */}
      <div className="mt-14 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
        <h3 className="text-lg font-bold text-slate-800 mb-2">Ready to run your numbers?</h3>
        <p className="text-sm text-slate-500 mb-6">Free break-even calculator — no account required.</p>
        <Link
          href="/calculator"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-200"
        >
          Calculate My Break-Even
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </main>
  )
}
