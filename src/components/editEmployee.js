import {useNavigate, useParams} from 'react-router-dom';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import EmployeeForm from "./employeeForm";
import {edit, selectEmployee} from "../app/employeesReducer";

const EditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const initialState = useSelector((employees) => selectEmployee(employees, id));
  const [employee, setEmployee] = useState(initialState);

  return (
    <EmployeeForm
      title={'Editar Empleado'}
      employee={employee}
      setEmployee={setEmployee}
      readyForErrors={true}
      onSave={() => {
        // Validar datos
        if (employee.firstName && employee.lastName && employee.email && employee.phoneNumber && employee.hireDate) {
          // Guardar
          dispatch(edit(employee));

          // Volver a ViewEmployees avisando que el usuario se creó
          navigate('/?editSuccess');
        }
      }}
    />
  )
}

export default EditEmployee;