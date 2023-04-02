import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, Button, Modal, TextField } from '@mui/material'
import * as React from 'react'
import { addEmployee } from '../services/officeRouletteClient'
import EmployeeTable from './EmployeeTable'

function OpenAddEmployeeModalButton(): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const employeeFirstNameRef = React.useRef<HTMLInputElement>()
  const employeeLastNameRef = React.useRef<HTMLInputElement>()

  const onSaveEmployeeClick = async () => {
    const firstName = employeeFirstNameRef.current?.value
    const lastName = employeeLastNameRef.current?.value
    const employmentStartTime = (new Date()).toISOString()

    if (! (firstName && lastName)) {
      alert('Please, provide both first and last name')
      return
    }

    try {
      const addedEmployee = await addEmployee({
        firstName: firstName,
        lastName: lastName,
        employmentStartTime: employmentStartTime,
      })
      console.log(`Added new employee ID ${addedEmployee.id}`)
      setOpen(false)
    } catch (e: unknown) {
      // TODO handle error
      console.error(e)
    }
  }

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}><AddIcon />Add Employee</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          minHeight: '400px',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          padding: '50px',
        }}>
          <h1>Enter employee details</h1>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}>
            <TextField inputRef={employeeFirstNameRef} variant="filled" helperText="First name" />
            <TextField inputRef={employeeLastNameRef} variant="filled" helperText="Last name" />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
          }}>
            <Button variant='contained' onClick={onSaveEmployeeClick}>Save</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

function RefreshEmployeeTableButton(): JSX.Element {
  const onRefreshEmployeeTableClick = () => {
    // TODO implement me
    alert('Refresh feature not implemented')
  }
  return (
    <Button variant='contained' onClick={onRefreshEmployeeTableClick}><RefreshIcon /></Button>
  )
}

export default function EmployeeView(): JSX.Element {
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
          <OpenAddEmployeeModalButton />
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'right',
          width: '50%',
        }}>
          <RefreshEmployeeTableButton />
        </Box>
      </Box>

      <Box>
        <EmployeeTable />
      </Box>
    </Box>
  )
}
