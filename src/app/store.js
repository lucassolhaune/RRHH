import {configureStore} from "@reduxjs/toolkit";
import employeesReducer from "./employeesReducer";

// Configuración del store de Redux utilizando configureStore de Redux Toolkit.
export default configureStore({
  reducer: {
    // Asigna el reducer de empleados al estado llamado 'employees'.
    employees: employeesReducer
  }
});
