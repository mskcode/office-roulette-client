import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import RemoveIcon from '@mui/icons-material/Remove'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
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
              <TableCell align="right"><Button variant="contained">Select</Button></TableCell>
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

function DrawDetailsGrid(): JSX.Element {
  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 xs={6}>
          <TextField variant="filled" fullWidth={true} helperText="Draw ID" value={1} />
        </Grid2>
        <Grid2 xs={6}>
          <TextField variant="filled" fullWidth={true} helperText="Status" value={'OPEN'} />
        </Grid2>
        <Grid2 xs={4}>
          <TextField variant="filled" fullWidth={true} helperText="Insert time" value={'1970-01-01T00:00.00.000Z'} />
        </Grid2>
        <Grid2 xs={4}>
          <TextField variant="filled" fullWidth={true} helperText="Draw time" value={'1970-01-01T00:00.00.000Z'} />
        </Grid2>
        <Grid2 xs={4}>
          <TextField variant="filled" fullWidth={true} helperText="Result time" value={'1970-01-01T00:00.00.000Z'} />
        </Grid2>
        <Grid2 xs={12}>
          <TextField variant="filled" fullWidth={true} helperText="Winner" value={'John Smith'} />
        </Grid2>
      </Grid2>
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '50%' }}>
          <Button variant="contained"><AddIcon /> Add participants</Button>
          <Button variant="contained" sx={{ marginLeft: '10px' }}><RemoveIcon />Remove participants</Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', width: '50%' }}>
          <Button variant="contained">Execute draw</Button>
        </Box>
      </Box>
    </Box>
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

      <Box>
        <h3>Draw details</h3>
        <DrawDetailsGrid />
      </Box>
    </Box>
  )
}
