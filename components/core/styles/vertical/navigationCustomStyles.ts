// MUI Imports
import type { Theme } from '@mui/material/styles'

// Util Imports
import { menuClasses, verticalNavClasses } from '@menu/utils/menuClasses'

const navigationCustomStyles = (theme: Theme) => {
  return {
    color: '#6b21a8', // Letra morada global
    zIndex: 'var(--drawer-z-index) !important',

    [`& .${verticalNavClasses.bgColorContainer}`]: {
      backgroundColor: '#f5c72c'
    },

    [`& .${verticalNavClasses.header}`]: {
      paddingBlock: theme.spacing(5),
      paddingInline: theme.spacing(5.5, 4),
      color: '#6b21a8', // Letra morada en header
      fontWeight: 600
    },

    [`& .${verticalNavClasses.container}`]: {
      transition: 'none',
      borderColor: '#f5c72c',
      boxShadow: '4px 0 15px rgba(0, 0, 0, 0.25)', // ✅ sombra hacia la derecha
      [`& .${verticalNavClasses.toggled}`]: {
        boxShadow: '4px 0 12px rgba(0, 0, 0, 0.15)' // sombra más fuerte cuando está colapsado
      }
    },

    [`& .${menuClasses.root}`]: {
      paddingBlockEnd: theme.spacing(2),
      paddingInlineEnd: theme.spacing(4),
      color: '#6b21a8',
      fontWeight: 500
    },

    [`& .${verticalNavClasses.backdrop}`]: {
      backgroundColor: 'var(--backdrop-color)'
    }
  }
}

export default navigationCustomStyles
