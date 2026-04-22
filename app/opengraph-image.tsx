import { ImageResponse } from 'next/og'

export const alt = 'Should I Refinance? — Free Mortgage Refinance Calculator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#0f172a',
          paddingTop: 72,
          paddingBottom: 72,
          paddingLeft: 80,
          paddingRight: 80,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Left: branding + headline */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>

          {/* Logo row */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}>
            <div
              style={{
                width: 52,
                height: 52,
                backgroundColor: '#4f46e5',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: 26,
                fontWeight: 700,
                marginRight: 14,
              }}
            >
              $
            </div>
            <div style={{ display: 'flex', color: '#94a3b8', fontSize: 18, fontWeight: 500 }}>
              calculatemyrefi.com
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              display: 'flex',
              color: '#ffffff',
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Should I Refinance?
          </div>

          {/* Subheadline */}
          <div style={{ display: 'flex', color: '#94a3b8', fontSize: 24, fontWeight: 400, lineHeight: 1.4, marginBottom: 44 }}>
            Free break-even calculator. See if refinancing makes sense in seconds.
          </div>

          {/* CTA pill */}
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 700,
              paddingTop: 14,
              paddingBottom: 14,
              paddingLeft: 28,
              paddingRight: 28,
              borderRadius: 40,
            }}
          >
            Try the free calculator →
          </div>
        </div>

        {/* Right: metric cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: 320,
            marginLeft: 72,
          }}
        >
          {[
            { label: 'Monthly Savings', value: '$312', sub: 'per month', accent: '#10b981' },
            { label: 'Break-Even', value: '19 months', sub: '1.6 years', accent: '#ffffff' },
            { label: 'Total Interest Saved', value: '$47,200', sub: 'over life of loan', accent: '#ffffff' },
          ].map((card, i) => (
            <div
              key={card.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#1e293b',
                borderRadius: 16,
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 24,
                paddingRight: 24,
                marginTop: i === 0 ? 0 : 16,
              }}
            >
              <div style={{ display: 'flex', color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                {card.label.toUpperCase()}
              </div>
              <div style={{ display: 'flex', color: card.accent, fontSize: 28, fontWeight: 800, marginBottom: 2 }}>
                {card.value}
              </div>
              <div style={{ display: 'flex', color: '#475569', fontSize: 13 }}>
                {card.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
