import {useNavigate, useParams} from 'react-router-dom';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import EmployeeForm from "./employeeForm";
import {edit, selectEmployee} from "../app/employeesReducer";

const EditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const initialState = useSelector((employees) => selectEmployee(employees, id)); // Obtiene el estado inicial del empleado a editar usando `useSelector`.
  const [employee, setEmployee] = useState(initialState); // Inicializa el estado `employee` con `initialState` y la función `setEmployee` para actualizar este estado.

  return (
    <EmployeeForm
      title={'Editar Empleado'}
      employee={employee}
      setEmployee={setEmployee}
      readyForErrors={true}
      onSave={() => {
        // Validar datos.
        if (employee.firstName && employee.lastName && employee.email && employee.phoneNumber && employee.hireDate) {
          // Guardar: Despacha la acción `edit(employee)` para editar los datos del empleado.
          dispatch(edit(employee));

          // Volver a ViewEmployees avisando que el usuario se editó exitosamente.
          navigate('/?editSuccess');
        }
      }}
    />
  )
}

export default EditEmployee;