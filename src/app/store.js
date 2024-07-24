import {configureStore} from "@reduxjs/toolkit";
import employeesReducer from "./employeesReducer";

export default configureStore({
  reducer: {
    employees: employeesReducer
  }
});
