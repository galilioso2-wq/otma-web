import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'OTMA — Intelligent AI Agents for Global Enterprises'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080D18',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 800,
            height: 800,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Synthesis mark */}
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="rgba(0,212,255,0.3)" strokeWidth="0.6" />
          <circle cx="39" cy="50" r="22" stroke="#00D4FF" strokeWidth="1.5" />
          <circle cx="61" cy="50" r="22" stroke="#00D4FF" strokeWidth="1.5" />
          <circle cx="50" cy="6" r="2" fill="#00D4FF" fillOpacity="0.6" />
          <circle cx="50" cy="94" r="2" fill="#00D4FF" fillOpacity="0.6" />
          <circle cx="6" cy="50" r="2" fill="#00D4FF" fillOpacity="0.6" />
          <circle cx="94" cy="50" r="2" fill="#00D4FF" fillOpacity="0.6" />
          <circle cx="50" cy="50" r="5" fill="rgba(0,212,255,0.2)" />
          <circle cx="50" cy="50" r="3" fill="#00D4FF" />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 28,
            gap: 8,
          }}
        >
          <span
            style={{
              color: '#FFFFFF',
              fontSize: 80,
              fontWeight: 500,
              letterSpacing: '0.12em',
              lineHeight: 1,
            }}
          >
            OTMA
          </span>
          <span
            style={{
              color: '#4A5878',
              fontSize: 14,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            INTELLIGENT · AI · AGENTS
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: 40,
            maxWidth: 800,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: 24,
              lineHeight: 1.4,
            }}
          >
            Intelligent AI agents, engineered for global enterprises.
          </span>
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ color: '#00D4FF', fontSize: 14, letterSpacing: '0.05em' }}>
            otma.io
          </span>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
            Riyadh · Built for the world
          </span>
        </div>

        {/* Cyan accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'linear-gradient(90deg, transparent, #00D4FF, transparent)',
          }}
        />
      </div>
    ),
    size
  )
}
