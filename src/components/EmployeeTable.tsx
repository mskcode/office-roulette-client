import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import { Employee, deleteEmployee, fetchEmployees } from '../services/officeRouletteClient'
import { HoverTableRow } from './HoverTableRow'

/* const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
})) */

type EmployeeTableProperties = {
  modalSelectionMode?: boolean,
}

const onDeleteEmployeeClick = async (employeeId: string) => {
  try {
    const deletedEmployee = await deleteEmployee(employeeId)
    console.log(`Employee ID ${deletedEmployee.id} deleted`)
  } catch (e: unknown) {
    // TODO handle error
    console.error(e)
  }
}

export default function EmployeeTable(props?: EmployeeTableProperties): JSX.Element {
  const modalSelectionMode = props?.modalSelectionMode ?? false
  const [employees, setEmployees] = React.useState<Employee[]>([])

  React.useEffect(() => {
    const asyncFetchEmployees = async () => {
      try {
        const employees = await fetchEmployees()
        setEmployees(employees)
      } catch (e: unknown) {
        // TODO handle error
        console.error(e)
      }
    }
    asyncFetchEmployees()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            { modalSelectionMode ?
              <TableCell></TableCell>
              : null }
            <TableCell>Name</TableCell>
            <TableCell align="right">Employement Start Time</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <HoverTableRow
              key={employee.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              { modalSelectionMode ?
                <TableCell><Checkbox /></TableCell>
                : null }
              <TableCell component="th" scope="row">
                {employee.firstName} {employee.lastName}
              </TableCell>
              <TableCell align="right">{employee.employmentStartTime}</TableCell>
              <TableCell align="right">{employee.status}</TableCell>
              <TableCell align="right"><Button variant="text" onClick={() => onDeleteEmployeeClick(employee.id)}><DeleteIcon /></Button></TableCell>
            </HoverTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
