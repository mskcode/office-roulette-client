import { CssBaseline, PaletteMode } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import { ColorModeContext } from './Context'
import Header from './Header'
import MainView from './MainView'

export default function App(): JSX.Element {
  const colorMode = React.useContext(ColorModeContext)

  const [mode, setMode] = React.useState<PaletteMode>('dark')

  colorMode.toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <MainView />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
