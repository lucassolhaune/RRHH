import {Alert, Box, Button, TextField, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import type {Employee} from "../types/Employee";

type CreateEditEmployeeProps = {
  title: string;
  employee: Employee;
  setEmployee: (employee: Employee) => void;
  readyForErrors: boolean;
  onSave: () => void;
}

const EmployeeForm = ({
  title,
  employee,
  setEmployee,
  readyForErrors,
  onSave
}: CreateEditEmployeeProps) => {

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

      <Typography sx={{ my: 4 }} variant='h5'>{title}</Typography>

      {
        !employee
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
              <Button onClick={onSave} variant={'contained'}>
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

export default EmployeeForm;