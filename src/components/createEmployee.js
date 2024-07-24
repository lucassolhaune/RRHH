import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import {useDispatch} from "react-redux";
import EmployeeForm from "./employeeForm";
import {create} from "../app/employeesReducer";

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});
  const [readyForErrors, setReadyForErrors] = useState(false);

  return (
    <EmployeeForm
      title={'Crear Empleado'}
      employee={employee}
      setEmployee={setEmployee}
      readyForErrors={readyForErrors}
      onSave={() => {
        setReadyForErrors(true);

        // Validar datos
        if (employee.firstName && employee.lastName && employee.email && employee.phoneNumber && employee.hireDate) {
          // Guardar
          dispatch(create(employee));

          // Volver a ViewEmployees avisando que el usuario se creó
          navigate('/?createSuccess');
        }
      }}
    />
  )
}

export default CreateEmployee;