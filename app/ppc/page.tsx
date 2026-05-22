export const dynamic = 'force-static'

import { PpcNav } from '@/components/ppc/PpcNav'
import { PpcHero } from '@/components/ppc/PpcHero'
import { PpcAgents } from '@/components/ppc/PpcAgents'
import { PpcOrchestrator } from '@/components/ppc/PpcOrchestrator'
import { PpcProof } from '@/components/ppc/PpcProof'
import { PpcCta } from '@/components/ppc/PpcCta'

export default function PpcPage() {
  return (
    <>
      <PpcNav />
      <main>
        <PpcHero />
        <PpcAgents />
        <PpcOrchestrator />
        <PpcProof />
        <PpcCta />
      </main>

      {/* Minimal footer */}
      <footer className="bg-[#080C14] border-t border-white/8 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} PPC Sales Intelligence · Built by{' '}
            <a href="/en" className="text-white/40 hover:text-white/70 transition-colors">
              OTMA
            </a>
          </p>
          <a
            href="mailto:founder@otma.io"
            className="text-xs text-white/35 hover:text-[#7ACBBA] transition-colors"
          >
            founder@otma.io
          </a>
        </div>
      </footer>
    </>
  )
}
