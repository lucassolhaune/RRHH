import {Alert, Box, Button, TextField, Typography} from '@mui/material';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useState} from "react";
import {Employee} from "../types/Employee";

type CreateEditEmployeeProps = {
  dataModel?: Employee[];
  onSave: (employee: Employee) => void;
}

const CreateEditEmployee = ({dataModel, onSave}: CreateEditEmployeeProps) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const getEmployeeIfExists = () => {
    if (!!id) {
      const employeeFoundAsArray = dataModel.filter((employee) => employee.id === Number(id));
      if (employeeFoundAsArray.length) {
        // Edit scenario with valid ID
        return dataModel[0];
      } else {
        // Edit scenario with invalid ID
        return null;
      }
    } else {
      // Create scenario
      return {}
    }
  }

  const [employee, setEmployee] = useState(getEmployeeIfExists());
  const [readyForErrors, setReadyForErrors] = useState(!!id);

  const commonTextFieldProps = {
    fullWidth: true,
    required: true,
    sx: {mb: 3}
  }

  return (
    <>
      <Button
        component={Link}
        to="/"
        variant="outlined"
      >
        Pantalla Inicial
      </Button>

      <Typography sx={{ my: 4 }} variant='h5'>{!!id ? 'Editar Empleado' : 'Crear Empleado'}</Typography>

      {
        employee === null
          ? (
            <Alert severity="error">El empleado no existe</Alert>
          )
          : (
          <>
            <TextField
              {...commonTextFieldProps}
              label="Nombre"
              onChange={e => setEmployee((prevState) => ({
                ...prevState,
                firstName: e.target.value
              }))}
              value={employee.firstName}
              error={readyForErrors && !employee.firstName}
            />

            <TextField
              {...commonTextFieldProps}
              label="Apellido"
              onChange={e => setEmployee((prevState) => ({
                ...prevState,
                lastName: e.target.value
              }))}
              value={employee.lastName}
              error={readyForErrors && !employee.lastName}
            />

            <TextField
              {...commonTextFieldProps}
              label="Correo Electrónico"
              onChange={e => setEmployee((prevState) => ({
                ...prevState,
                email: e.target.value
              }))}
              value={employee.email}
              error={readyForErrors && !employee.email}
            />

            <TextField
              {...commonTextFieldProps}
              label="Teléfono"
              onChange={e => setEmployee((prevState) => ({
                ...prevState,
                phoneNumber: e.target.value
              }))}
              value={employee.phoneNumber}
              error={readyForErrors && !employee.phoneNumber}
            />

            <TextField
              {...commonTextFieldProps}
              label="Fecha de Contratación"
              onChange={e => setEmployee((prevState) => ({
                ...prevState,
                hireDate: e.target.value
              }))}
              value={employee.hireDate}
              error={readyForErrors && !employee.hireDate}
            />

            <TextField
              {...commonTextFieldProps}
              required={false}
              label="Salario"
              onChange={e => setEmployee((prevState) => ({
                ...prevState,
                salary: e.target.value
              }))}
              value={employee.salary}
            />

            <Box
              my={4}
              display="flex"
              gap={4}
            >
              <Button onClick={() => {
                setReadyForErrors(true);

                // Validar datos
                if (employee.firstName && employee.lastName && employee.email && employee.phoneNumber && employee.hireDate) {
                  // Guardar
                  onSave(employee);

                  // Volver a ViewEmployees avisando que el usuario se creó
                  navigate(!!id ? '/?createSuccess' : '/?editSuccess');
                }
              }} variant={'contained'}>
                Guardar
              </Button>

              <Button
                component={Link}
                to="/"
                variant="contained"
              >
                Cancelar
              </Button>
            </Box>
          </>
        )
      }
    </>
  )
}

export default CreateEditEmployee;