import { Context, createContext } from 'react'

export type ColorModeType = {
  toggleColorMode: () => void
}

export type ColorModeContextType = Context<ColorModeType>

const colorMode: ColorModeType = {
  toggleColorMode: () => {}
}

export const ColorModeContext: ColorModeContextType = createContext(colorMode)
