import AddIcon from '@mui/icons-material/Add'
import InfoIcon from '@mui/icons-material/Info'
import RefreshIcon from '@mui/icons-material/Refresh'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import * as React from 'react'
import { Draw, createDraw, fetchDraws } from '../services/officeRouletteClient'

function RefreshDrawTableButton(): JSX.Element {
  const onRefreshDrawTableClick = () => {
    // TODO implement me
    alert('Refresh feature not implemented')
  }
  return (
    <Button variant='contained' onClick={onRefreshDrawTableClick}><RefreshIcon /></Button>
  )
}

function DrawTable(): JSX.Element {
  const [draws, setDraws] = React.useState<Draw[]>([])

  React.useEffect(() => {
    const asyncFetchDraws = async () => {
      try {
        const draws = await fetchDraws()
        setDraws(draws)
      } catch (e: unknown) {
        // TODO handle error
        console.error(e)
      }
    }
    asyncFetchDraws()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {draws.map((draw) => (
            <TableRow
              key={draw.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{draw.id}</TableCell>
              <TableCell align="right">{draw.status}</TableCell>
              <TableCell align="right"><Button variant="text"><InfoIcon /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function AddDrawButton(): JSX.Element {
  const onAddDrawClick = async () => {
    try {
      const draw = await createDraw()
      console.log(`Created new draw ID ${draw.id}`)
    } catch (e: unknown) {
      // TODO handle error
      console.error(e)
    }
  }
  return (
    <Button variant="contained" onClick={onAddDrawClick}><AddIcon />Add Draw</Button>
  )
}

export default function DrawView(): JSX.Element {
  return (
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '20px',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'left',
          width: '50%',
        }}>
          <AddDrawButton />
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'right',
          width: '50%',
        }}>
          <RefreshDrawTableButton />
        </Box>
      </Box>

      <Box>
        <DrawTable />
      </Box>
    </Box>
  )
}
