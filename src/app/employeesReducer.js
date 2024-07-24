import { createSlice } from '@reduxjs/toolkit'
import {data} from "../data";

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: data,
  reducers: {
    create: (employees, action) => {
      const newEmployeeId = employees.length ? Math.max(...employees.map(employee => Number(employee.id))) + 1 : 1

      return [
        ...employees,
        {
          ...action.payload,
          id: newEmployeeId
        }
      ]
    },
    edit: (employees, action) => {
      employees.forEach((employee) => {
        if (employee.id === action.payload.id) {
          employee.firstName = action.payload.firstName;
          employee.lastName = action.payload.lastName;
          employee.email = action.payload.email;
          employee.phoneNumber = action.payload.phoneNumber;
          employee.hireDate = action.payload.hireDate;
          employee.salary = action.payload.salary;
        }
      });
      return employees;
    },
    remove: (employees, action) => employees.filter(employee => !action.payload.includes(employee.id)),
    removeAll: () => []
  },
  selectors: {
    selectEmployees: (employees) => employees,
    selectEmployee: (employees, args) => {
      const employeeFoundAsArray = employees.filter((employee) => employee.id === Number(args))
      if (employeeFoundAsArray.length) {
        // Edit scenario with valid ID
        return employeeFoundAsArray[0];
      } else {
        // Edit scenario with invalid ID
        return null;
      }
    }
  }
})

export const {
  create,
  edit,
  remove,
  removeAll
} = employeesSlice.actions

export const {
  selectEmployees,
  selectEmployee
} = employeesSlice.selectors

export default employeesSlice.reducer