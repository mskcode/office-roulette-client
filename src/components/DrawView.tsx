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
import { Draw, FullDraw, createDraw, executeDraw, fetchDraw, fetchDraws } from '../services/officeRouletteClient'
import { reformatIso8601Timestamp } from '../services/utils'
import EmployeeTable from './EmployeeTable'
import { HoverTableRow } from './HoverTableRow'


function RefreshDrawTableButton(): JSX.Element {
  const onRefreshDrawTableClick = () => {
    // TODO implement me
    alert('Refresh feature not implemented')
  }
  return (
    <Button variant='contained' onClick={onRefreshDrawTableClick}><RefreshIcon /></Button>
  )
}

function DrawTable(props: { setSelectedDraw: React.Dispatch<React.SetStateAction<FullDraw | undefined>> }): JSX.Element {
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

  const onTableRowClick = async (drawId: number) => {
    try {
      const draw = await fetchDraw(drawId)
      props.setSelectedDraw(draw)
    } catch (e: unknown) {
      // TODO handle error
      console.log(e)
    }
  }

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
            <HoverTableRow
              key={draw.id}
              onClick={() => onTableRowClick(draw.id)}
            >
              <TableCell component="th" scope="row">{draw.id}</TableCell>
              <TableCell align="right">{draw.status}</TableCell>
              <TableCell align="right"><Button variant="contained">Select</Button></TableCell>
            </HoverTableRow>
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

function DrawDetailsGrid(props: { selectedDraw: FullDraw | undefined }): JSX.Element {
  const draw = props.selectedDraw ? props.selectedDraw : {
    id: 0,
    status: '',
    insertTime: '',
    drawTime: undefined,
    participants: [],
    result: {
      winnerEmployeeId: '',
      resultTime: '',
    },
  }

  // FIXME should we use the setter function?
  const [selectedEmployeeIds, _setSelectedEmployeeIds] = React.useState<string[]>([])

  const onAddParticipantsClick = () => {
    alert('onAddParticipantsClick()')
  }

  const onRemoveParticipantsClick = () => {
    const employeeIdsToRemove = selectedEmployeeIds.join(', ')
    alert(`onRemoveParticipantsClick(): ${employeeIdsToRemove}`)
  }

  const onExecuteDrawClick = async (drawId: number) => {
    alert(`Executing draw ID ${drawId}`)
    try {
      const draw = await executeDraw(drawId)
      console.log(`Executed draw ID ${draw.id}`)
    } catch (e: unknown) {
      // TODO handle error
      console.error(e)
    }
  }

  const onEmployeeSelectionChange = (employeeId: string, checked: boolean) => {
    const indexOfEmployeeId = selectedEmployeeIds.indexOf(employeeId)
    if (checked) {
      // add employee ID or do nothing
      if (indexOfEmployeeId >= 0) {
        // array already contains the employee ID; do nothing
      } else {
        // add employee ID to array
        selectedEmployeeIds.push(employeeId)
      }
    } else {
      // remove employee ID or do nothing
      if (indexOfEmployeeId < 0) {
        // array doesn't contains the employee ID; do nothing
      } else {
        // remove employee ID from the array
        selectedEmployeeIds.splice(indexOfEmployeeId, 1)
      }
    }
  }

  const drawClosed = draw.status === 'CLOSED'

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 xs={6}>
          <TextField variant="filled" fullWidth={true} helperText="Draw ID" value={draw.id === 0 ? '' : draw.id} />
        </Grid2>
        <Grid2 xs={6}>
          <TextField variant="filled" fullWidth={true} helperText="Status" value={draw.status} />
        </Grid2>
        <Grid2 xs={4}>
          <TextField variant="filled" fullWidth={true} helperText="Insert time" value={reformatIso8601Timestamp(draw.insertTime)} />
        </Grid2>
        <Grid2 xs={4}>
          <TextField variant="filled" fullWidth={true} helperText="Draw time" value={reformatIso8601Timestamp(draw.drawTime)} />
        </Grid2>
        <Grid2 xs={4}>
          <TextField variant="filled" fullWidth={true} helperText="Result time" value={reformatIso8601Timestamp(draw.result?.resultTime)} />
        </Grid2>
        <Grid2 xs={12}>
          <TextField variant="filled" fullWidth={true} helperText="Winner" value={draw.result?.winnerEmployeeId} />
        </Grid2>
      </Grid2>
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '50%' }}>
          <Button
            variant="contained"
            onClick={onAddParticipantsClick}
            disabled={drawClosed}
          ><AddIcon /> Add participants</Button>
          <Button
            variant="contained"
            onClick={onRemoveParticipantsClick}
            disabled={drawClosed}
            sx={{ marginLeft: '10px' }}
          ><RemoveIcon />Remove participants</Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', width: '50%' }}>
          <Button
            variant="contained"
            onClick={() => onExecuteDrawClick(draw.id)}
            disabled={drawClosed}
          >Execute draw</Button>
        </Box>
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <EmployeeTable
          employees={draw.participants}
          showSelectionCheckbox={true}
          showDeleteButton={false}
          onEmployeeSelectionChange={onEmployeeSelectionChange}
        />
      </Box>
    </Box>
  )
}

export default function DrawView(): JSX.Element {
  const [selectedDraw, setSelectedDraw] = React.useState<FullDraw>()

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
        <DrawTable setSelectedDraw={setSelectedDraw} />
      </Box>

      <Box sx={{ padding: '30px' }}>
        <h3>Draw details</h3>
        <DrawDetailsGrid selectedDraw={selectedDraw}/>
      </Box>
    </Box>
  )
}
