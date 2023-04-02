import axios from 'axios'

export type Employee = {
  id: string,
  firstName: string,
  lastName: string,
  employmentStartTime: string,
  status: string,
}

export type InsertableEmployee = {
  firstName: string,
  lastName: string,
  employmentStartTime: string, // ISO8601
}

export const fetchEmployees = async (): Promise<Employee[]> => {
  // FIXME the server API requires the name qs-param to return any results
  const response = await axios.get('http://localhost:8080/api/v1/employees?name=')
  return response.data.employees
}

export const deleteEmployee = async (employeeId: string): Promise<Employee> => {
  const response = await axios.delete(`http://localhost:8080/api/v1/employees/${employeeId}`)
  return response.data as Employee
}

export const addEmployee = async (employee: InsertableEmployee): Promise<Employee> => {
  const response = await axios.post('http://localhost:8080/api/v1/employees', employee)
  return response.data as Employee
}
