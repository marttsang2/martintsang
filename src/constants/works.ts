import { WorkTemplateProps } from "@/components/Template/WorkTemplate";

export const workTemplateMapping: Record<string, WorkTemplateProps> = {
  jomud: {
    backdropImage: '/work/jomud_demo.svg',
    date: 'JUNE 2023',
    name: 'Jomud',
    description: 'Website for Jomud ― a job searching tool for students and new graduate.',
    category: 'Website',
    originLink: 'https://www.jomud.io'
  },
  superacc: {
    backdropImage: '/work/superacc_demo.svg',
    date: 'JUNE 2023',
    name: 'Superacc',
    description: 'Website for Superacc ― a company that provides bank statement analysis using AI models.',
    category: 'Website',
    originLink: 'https://www.superacc.ai'
  },
  gamehub: {
    backdropImage: '/work/gamehub_demo.png',
    date: 'JUNE 2022',
    name: 'Gamehub',
    description: 'Website for Gamehub ― E-commerce platform for game developers to sell their console games.',
    category: 'Website, Personal Project',
    originLink: '',
    sources: [
      { type: 'image', link: '/work/gamehub_demo.png' }
    ]
  },
  polytasy: {
    backdropImage: '/work/polytasy_logo.jpeg',
    date: 'JUNE 2022',
    name: 'Polytasy',
    description: 'Web3 Game for Polytasy. Built in Polygon chain, empowering gamers to earn rewards',
    category: 'Web3 Game, Personal Project',
    originLink: '',
    sources: [
      { type: 'video', link: '/work/polytasy_demo.mp4' }
    ]
  }
}