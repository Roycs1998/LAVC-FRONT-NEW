import type { Locale } from '@/components/configs/i18n'
import HomePage from '../(home)/page'

interface LangPageProps {
  params: { lang: Locale }
}

export default function LangPage({ params }: LangPageProps) {
  return <HomePage params={params} />
}
