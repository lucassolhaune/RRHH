import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import {useDispatch} from "react-redux";
import EmployeeForm from "./employeeForm";
import {create} from "../app/employeesReducer";

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estado local para almacenar los datos del nuevo empleado.
  const [employee, setEmployee] = useState({});
  // Estado local para manejar la validación de errores.
  const [readyForErrors, setReadyForErrors] = useState(false);

  return (
    <EmployeeForm
      title={'Crear Empleado'}
      employee={employee}
      setEmployee={setEmployee}
      readyForErrors={readyForErrors}
      onSave={() => {
        setReadyForErrors(true);// Marca el componente como listo para mostrar errores.

        // Validar datos
        if (employee.firstName && employee.lastName && employee.email && employee.phoneNumber && employee.hireDate) {
          dispatch(create(employee)); // Guardar despacha la acción create(employee)`para crear un nuevo empleado.
          navigate('/?createSuccess'); // Volver a ViewEmployees avisando que el usuario se creó.
        }
      }}
    />
  )
}

export default CreateEmployee;