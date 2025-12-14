
import { getMode, getSettingsFromCookie } from './core/utils/serverHelpers'
import { SettingsProvider } from './core/contexts/settingsContext'
import { VerticalNavProvider } from './menu/contexts/verticalNavContext'
import { ChildrenType, Direction } from './core/types'

//PRUEBA
import ThemeProvider from './providers/theme-provider'

type Props = ChildrenType & {
  direction: Direction
}

const Providers = async (props: Props) => {
  // Props
  const { children, direction } = props

  // Vars
  const mode = await getMode()
  const settingsCookie = await getSettingsFromCookie()

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider direction={direction}>
          {children}
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
