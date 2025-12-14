"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { Direction } from "../core/types"

interface AppThemeProviderProps
  extends React.ComponentProps<typeof NextThemesProvider> {
  direction?: Direction
}

export function ThemeProvider({
  children,
  direction = "ltr",
  ...props
}: AppThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <div dir={direction}>{children}</div>
    </NextThemesProvider>
  )
}

export default ThemeProvider
