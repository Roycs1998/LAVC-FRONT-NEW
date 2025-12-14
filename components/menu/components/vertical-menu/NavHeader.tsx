import type { ReactNode } from 'react'

import styled from '@emotion/styled'

// Util Imports
import { verticalNavClasses } from '../../utils/menuClasses'

const StyledNavHeader = styled.div`
  padding: 15px;
  padding-inline-start: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

type NavHeaderProps = {
  children: ReactNode
  className?: string
}

const NavHeader = ({ children, className = '' }: NavHeaderProps) => {
  return (
    <StyledNavHeader className={`${verticalNavClasses.header} ${className}`}>
      {children}
    </StyledNavHeader>
  )
}

export default NavHeader
