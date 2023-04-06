import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Employee, deleteEmployee } from '../services/officeRouletteClient'
import { HoverTableRow } from './HoverTableRow'

const onDeleteEmployeeClick = async (employeeId: string) => {
  try {
    const deletedEmployee = await deleteEmployee(employeeId)
    console.log(`Employee ID ${deletedEmployee.id} deleted`)
  } catch (e: unknown) {
    // TODO handle error
    console.error(e)
  }
}

export type EmployeeTableProperties = {
  showSelectionCheckbox?: boolean,
  showDeleteButton?: boolean,
  employees?: Employee[],
  onEmployeeSelectionChange?: (employeeId: string, checked: boolean) => void,
}

export default function EmployeeTable(props?: EmployeeTableProperties): JSX.Element {
  const showSelectionCheckbox = props?.showSelectionCheckbox ?? false
  const showDeleteButton = props?.showDeleteButton ?? true
  const employees = props?.employees ?? []
  const onEmployeeSelectionChange = props?.onEmployeeSelectionChange ?? (() => {})

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            { showSelectionCheckbox ? <TableCell></TableCell> : null }
            <TableCell>Name</TableCell>
            <TableCell align="right">Employement Start Time</TableCell>
            <TableCell align="right">Status</TableCell>
            { showDeleteButton ? <TableCell></TableCell> : null }
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <HoverTableRow
              key={employee.id}
            >
              { showSelectionCheckbox
                ? <TableCell>
                  <Checkbox onChange={(event: React.ChangeEvent<HTMLInputElement>) => onEmployeeSelectionChange(employee.id, event.target.checked)} />
                </TableCell>
                : null }
              <TableCell component="th" scope="row">
                {employee.firstName} {employee.lastName}
              </TableCell>
              <TableCell align="right">{employee.employmentStartTime}</TableCell>
              <TableCell align="right">{employee.status}</TableCell>
              { showDeleteButton
                ? <TableCell align="right"><Button variant="text" onClick={() => onDeleteEmployeeClick(employee.id)}><DeleteIcon /></Button></TableCell>
                : null }
            </HoverTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
