import type { ReactNode } from 'react'
import Link from 'next/link'

const particles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  top: `${(index * 29) % 100}%`,
  duration: `${12 + (index % 7) * 3}s`,
  delay: `${(index % 5) * 0.9}s`,
  size: 2 + (index % 4),
  color: index % 3 === 0 ? 'var(--neon-red)' : index % 3 === 1 ? 'var(--electric-blue)' : 'var(--ice-blue)',
}))

type Props = {
  children: ReactNode
  title?: string
  eyebrow?: string
  backHref?: string
  backLabel?: string
}

export default function FuturisticShell({ children, title, eyebrow, backHref, backLabel }: Props) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 12% 12%, rgba(255, 46, 99, 0.22), transparent 18%), radial-gradient(circle at 88% 10%, rgba(0, 179, 255, 0.2), transparent 20%), radial-gradient(circle at 50% 70%, rgba(255, 90, 31, 0.12), transparent 22%), linear-gradient(180deg, #05070d 0%, #090d16 55%, #04060b 100%)',
        color: 'var(--text-main)',
        fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
      }}
    >
      <style jsx global>{`
        :root {
          --bg-core: #05070d;
          --bg-panel: rgba(8, 13, 24, 0.74);
          --bg-panel-strong: rgba(10, 16, 30, 0.92);
          --bg-soft: rgba(255, 255, 255, 0.04);
          --text-main: #ecf7ff;
          --text-soft: rgba(219, 240, 255, 0.72);
          --text-dim: rgba(162, 194, 214, 0.6);
          --electric-blue: #35c2ff;
          --ice-blue: #9ae8ff;
          --neon-red: #ff315f;
          --hot-red: #ff5f3a;
          --chrome: rgba(255, 255, 255, 0.14);
          --chrome-strong: rgba(255, 255, 255, 0.24);
          --shadow-neon: 0 24px 80px rgba(0, 0, 0, 0.42);
          --shadow-red: 0 0 34px rgba(255, 49, 95, 0.18);
          --shadow-blue: 0 0 44px rgba(53, 194, 255, 0.16);
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: var(--bg-core);
          color: var(--text-main);
        }

        a {
          color: inherit;
        }

        .f-shell {
          position: relative;
          overflow: hidden;
        }

        .f-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: linear-gradient(180deg, rgba(255, 255, 255, 0.7), transparent 88%);
        }

        .f-scanline {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.035), transparent);
          background-size: 100% 9px;
          opacity: 0.45;
          mix-blend-mode: screen;
        }

        .f-particle {
          position: absolute;
          border-radius: 999px;
          opacity: 0.7;
          filter: blur(0.3px);
          box-shadow: 0 0 14px currentColor;
          animation: floatParticle linear infinite;
        }

        .f-container {
          position: relative;
          max-width: 1240px;
          margin: 0 auto;
          padding: 28px 18px 80px;
        }

        .f-hero {
          position: relative;
          overflow: hidden;
          border-radius: 34px;
          padding: 30px;
          background:
            linear-gradient(135deg, rgba(255, 49, 95, 0.14), transparent 26%),
            linear-gradient(220deg, rgba(53, 194, 255, 0.14), transparent 36%),
            linear-gradient(180deg, rgba(11, 17, 30, 0.88), rgba(7, 11, 22, 0.82));
          border: 1px solid var(--chrome);
          box-shadow: var(--shadow-neon), inset 0 1px 0 rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(18px);
        }

        .f-panel {
          background:
            linear-gradient(180deg, rgba(12, 18, 33, 0.88), rgba(7, 12, 24, 0.82));
          border: 1px solid var(--chrome);
          box-shadow: var(--shadow-neon), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
        }

        .f-card {
          position: relative;
          overflow: hidden;
          border-radius: 26px;
        }

        .f-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(53, 194, 255, 0.44), rgba(255, 49, 95, 0.34), rgba(255, 255, 255, 0.08));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .f-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-soft);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .f-chip-red {
          background: rgba(255, 49, 95, 0.13);
          border-color: rgba(255, 49, 95, 0.34);
          color: #ffd3dc;
          box-shadow: var(--shadow-red);
        }

        .f-chip-blue {
          background: rgba(53, 194, 255, 0.12);
          border-color: rgba(53, 194, 255, 0.3);
          color: #b9eeff;
          box-shadow: var(--shadow-blue);
        }

        .f-title {
          margin: 0;
          letter-spacing: -0.05em;
          line-height: 0.94;
          color: var(--text-main);
          text-wrap: balance;
        }

        .f-gradient {
          background: linear-gradient(90deg, #fff5f7 0%, var(--ice-blue) 34%, var(--electric-blue) 60%, #ff7995 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .f-muted {
          color: var(--text-soft);
        }

        .f-dim {
          color: var(--text-dim);
        }

        .f-link {
          color: var(--ice-blue);
          text-decoration: none;
          font-weight: 800;
        }

        .f-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255, 49, 95, 0.18), rgba(53, 194, 255, 0.18));
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--text-main);
          text-decoration: none;
          font-weight: 800;
          box-shadow: var(--shadow-red), var(--shadow-blue);
        }

        .f-button-ghost {
          background: rgba(255, 255, 255, 0.04);
          box-shadow: none;
          color: var(--text-soft);
        }

        .f-input,
        .f-select {
          width: 100%;
          padding: 16px 18px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(5, 9, 18, 0.76);
          color: var(--text-main);
          outline: none;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .f-input::placeholder {
          color: rgba(188, 215, 232, 0.42);
        }

        .f-kicker {
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #ff8ea8;
          font-weight: 800;
        }

        .f-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(255, 49, 95, 0.3), rgba(53, 194, 255, 0.3), transparent);
        }

        @keyframes floatParticle {
          0% {
            transform: translate3d(0, 0, 0) scale(0.9);
            opacity: 0.18;
          }
          30% {
            opacity: 0.85;
          }
          100% {
            transform: translate3d(0, -140px, 0) scale(1.15);
            opacity: 0;
          }
        }

        @keyframes riseIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .rise-in {
          animation: riseIn 0.7s ease-out both;
        }

        @media (max-width: 700px) {
          .f-hero {
            padding: 22px;
            border-radius: 28px;
          }

          .f-container {
            padding-inline: 14px;
          }
        }
      `}</style>

      <div className="f-shell">
        <div className="f-grid" />
        <div className="f-scanline" />
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="f-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              color: particle.color,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          />
        ))}

        <div className="f-container">
          {(title || eyebrow || backHref) && (
            <div className="rise-in" style={{ marginBottom: '18px' }}>
              {backHref && backLabel && (
                <Link href={backHref} className="f-link" style={{ display: 'inline-block', marginBottom: '16px' }}>
                  {backLabel}
                </Link>
              )}
              {(title || eyebrow) && (
                <section className="f-hero f-card">
                  {eyebrow && <div className="f-kicker">{eyebrow}</div>}
                  {title && (
                    <h1 className="f-title" style={{ marginTop: eyebrow ? '8px' : 0, fontSize: 'clamp(2.4rem, 6vw, 4.8rem)' }}>
                      <span className="f-gradient">{title}</span>
                    </h1>
                  )}
                </section>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
