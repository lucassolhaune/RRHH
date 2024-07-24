import { createSlice } from '@reduxjs/toolkit'
import {data} from "../data";

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: data,
  reducers: {
    /**
     * Create:
     * Reducer para crear un nuevo empleado,
     * "newEmployeeId" calcula el nuevo ID para el proximo empleado que se cree; calcula el ID mas alto y le suma uno para asegurar que el nuevo ID sea único.
     * Retorna un nuevo array de empleados que incluye el nuevo empleado
    */
    create: (employees, action) => {
      const newEmployeeId = employees.length ? Math.max(...employees.map(employee => Number(employee.id))) + 1 : 1

      return [
        ...employees, // Copia todos los empleados existentes.
        {
          ...action.payload, // Copia los datos del nuevo empleado desde action.payload

          id: newEmployeeId // Asigna el nuevo ID al empleado creado
        }
      ]
    },

    /**
     * Edit:
     * Itera sobre todos los empleados en el array 'employees',
     * Comprueba si el id del empleado actual es igual al id pasado en action.payload.id,
     * Si hay coincidencia, actualiza los datos del empleado con los valores de action.payload.
     * Posterior a eso, devuelve el array 'employees' actualizado (o el mismo si no hubo cambios).
    */
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
    /**
     * Remove y RemoveAll:
     * Función reducer para eliminar empleados basados en los IDs especificados en action.payload.
     * Función reducer para eliminar todos los empleados.
     */
    remove: (employees, action) => employees.filter(employee => !action.payload.includes(employee.id)),
    removeAll: () => []
  },

  /**
   * Selectors:
   * "selectEmployees", selector para seleccionar todos los empleados,
   * "selectEmployee", selector para seleccionar un empleado específico por ID,
   *  Filtra el array de empleados para encontrar empleados con el ID especificado,
   *  El primer If verifica si se encontró algún empleado con el ID especificado,
   */
  selectors: {
    selectEmployees: (employees) => employees,
    selectEmployee: (employees, args) => {
      const employeeFoundAsArray = employees.filter((employee) => employee.id === Number(args))
      if (employeeFoundAsArray.length) {
        // Escenario de edición con ID válido, Devuelve el primer empleado encontrado.
        return employeeFoundAsArray[0];
      } else {
        // Escenario de edición con ID inválido, Devuelve null.
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