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
  return response.data.employees as Employee[]
}

export const deleteEmployee = async (employeeId: string): Promise<Employee> => {
  const response = await axios.delete(`http://localhost:8080/api/v1/employees/${employeeId}`)
  return response.data as Employee
}

export const addEmployee = async (employee: InsertableEmployee): Promise<Employee> => {
  const response = await axios.post('http://localhost:8080/api/v1/employees', employee)
  return response.data as Employee
}

export type Draw = {
  id: number,
  status: string,
}

export type DrawResult = {
  winnerEmployeeId: string,
  resultTime: string, // ISO8601
}

export type FullDraw = {
  id: number,
  status: string,
  insertTime: string, // ISO8601
  drawTime?: string, // ISO8601
  participants: Employee[],
  result?: DrawResult,
}

export const fetchDraws = async (): Promise<Draw[]> => {
  const response = await axios.get('http://localhost:8080/api/v1/draws')
  return response.data.draws as Draw[]
}

export const fetchDraw = async (drawId: number): Promise<FullDraw> => {
  const response = await axios.get(`http://localhost:8080/api/v1/draws/${drawId}`)
  return response.data as FullDraw
}

export const createDraw = async (): Promise<Draw> => {
  const response = await axios.post('http://localhost:8080/api/v1/draws')
  return response.data as Draw
}

export const addEmployeesToDraw = async (drawId: number, employeeIds: string[]): Promise<void> => {
  await axios.put(
    `http://localhost:8080/api/v1/draws/${drawId}/employees`,
    {
      drawId: drawId,
      participants: employeeIds,
    })
}

export const executeDraw = async (drawId: number): Promise<FullDraw> => {
  const response = await axios.post(`http://localhost:8080/api/v1/draws/${drawId}/execute`)
  return response.data as FullDraw
}
