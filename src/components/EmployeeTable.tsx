import { CheckBox } from '@mui/icons-material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

type Employee = {
  id: string,
  firstName: string,
  lastName: string,
  employmentStartTime: string,
  status: string,
}

function createEmployee(
  id: string,
  firstName: string,
  lastName: string,
  employmentStartTime: string,
  status: string,
): Employee {
  return {
    id: id,
    firstName: firstName,
    lastName: lastName,
    employmentStartTime: employmentStartTime,
    status: status,
  }
}

const employees = [
  createEmployee('a2217ce3-c6ec-43cb-9e6f-561ddd043ca7', 'John', 'Smith', '2023-04-01T08:14:57Z', 'ACTIVE'),
  createEmployee('7014d9af-f5e2-45b3-bb7e-a197a597eec8', 'Jane', 'Doe', '2023-04-01T08:14:57Z', 'ACTIVE'),
  createEmployee('129a56f2-02d1-400c-8a96-208762619726', 'Peter', 'Gabriel', '2023-04-01T08:14:57Z', 'ACTIVE'),
]


export default function EmployeeTable(): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Employement Start Time</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell><CheckBox /></TableCell>
              <TableCell component="th" scope="row">
                {employee.firstName} {employee.lastName}
              </TableCell>
              <TableCell align="right">{employee.employmentStartTime}</TableCell>
              <TableCell align="right">{employee.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
