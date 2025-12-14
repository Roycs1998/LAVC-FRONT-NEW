import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from './components/configs/i18n'
import { auth } from './lib/auth/config'

const STATIC_ASSET_REGEX = /\.(css|js|jpg|jpeg|png|gif|svg|ico|woff|woff2|json|map|mp4|webm|ogg)$/

export default auth(function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const pathSegments = url.pathname.split('/').filter(Boolean)

  const isApiRoute = url.pathname.startsWith('/api/')
  const isStaticResource = STATIC_ASSET_REGEX.test(url.pathname)

  if (isApiRoute || isStaticResource) {
    return NextResponse.next()
  }

  const supportedLanguages = i18n.locales
  const fallbackLanguage = i18n.defaultLocale
  const cookieLanguage = supportedLanguages.includes(req.cookies.get('language')?.value as typeof supportedLanguages[number])
    ? (req.cookies.get('language')?.value as typeof supportedLanguages[number])
    : fallbackLanguage

  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'

  if (maintenanceMode && !url.pathname.includes('/under-maintenance')) {
    url.pathname = `/${cookieLanguage}/under-maintenance`
    return NextResponse.rewrite(url)
  }

  if (pathSegments[0] !== cookieLanguage) {
    if (supportedLanguages.includes(pathSegments[0] as typeof supportedLanguages[number])) {
      pathSegments[0] = cookieLanguage
    } else {
      pathSegments.unshift(cookieLanguage)
    }

    url.pathname = '/' + pathSegments.join('/')

    const response = NextResponse.redirect(url)
    response.cookies.set('language', cookieLanguage)
    return response
  }

  const response = NextResponse.next()
  response.cookies.set('language', cookieLanguage)
  return response
})

export const config = {
  matcher: '/:path*'
}
