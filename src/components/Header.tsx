import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import * as React from 'react'
import logo from '../resources/app-logo-2.svg'
import { ColorModeContext } from './Context'
import './Header.css'

export default function Header(): JSX.Element {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      height: '100px',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
        fontSize: 'calc(10px + 2vmin)',
        width: '50%',
      }}>
        <Box sx={{
          height: '80%',
          width: '70px',
          marginLeft: '10px',
          marginRight: '20px',
        }}>
          <img width="100%" height="100%" src={logo} className="App-logo" alt="logo" />
        </Box>
        <Box>
          <p>OFFICE ROULETTE</p>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'right',
        width: '50%',
      }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          {theme.palette.mode} mode
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
