import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PPC Sales Intelligence — 6 AI Agents + Orchestrator',
  description:
    '6 specialized AI agents covering Sales, HR, Finance, Supply Chain, QC, and IT — coordinated by an Enterprise Orchestrator. Bilingual Arabic and English. Built on Saudi compliance. Powered by Claude.',
  openGraph: {
    title: 'PPC Sales Intelligence Platform',
    description:
      'One question. Six domain experts. Instant bilingual answers from your live ERP data.',
    siteName: 'PPC by OTMA',
  },
}

export default function PpcLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#0B0F1A] min-h-screen">{children}</div>
}