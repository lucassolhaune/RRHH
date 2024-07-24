import {Alert, Box, Button, TextField, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import type {Employee} from "../types/Employee";

type CreateEditEmployeeProps = {
  title: string; //titulo del form.
  employee: Employee;  // Datos del empleado.
  setEmployee: (employee: Employee) => void; // Función para actualizar los datos del empleado.
  readyForErrors: boolean; // Indicador de si el formulario está listo para mostrar errores.
  onSave: () => void; // Función que se ejecuta al guardar el formulario.
}

// Componente funcional EmployeeForm que utiliza las propiedades definidas en CreateEditEmployeeProps.
const EmployeeForm = ({
  title,
  employee,
  setEmployee,
  readyForErrors,
  onSave
}: CreateEditEmployeeProps) => {

  // Propiedades comunes para los TextField
  const commonTextFieldProps = {
    fullWidth: true,
    required: true,
    sx: {mb: 3}
  }

  return (
    <>
      {/* Botón para regresar a la pantalla inicial. */}
      <Button
        component={Link}
        to="/"
        variant="outlined"
      >
        Pantalla Inicial
      </Button>

      {/* Título del formulario (Crear Empleado / Editar Empleado). */}
      <Typography sx={{ my: 4 }} variant='h5'>{title}</Typography>

      {
        // Renderizado condicional: muestra un mensaje de error si el empleado no existe.
        !employee
          ? (
            <Alert severity="error">El empleado no existe</Alert>
          )
          : (
          <>
            {/* Campos de formulario para editar los datos del empleado */}
              {/* TextField para el Nombre */}
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

            {/* TextField para el Apellido */}
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

            {/* TextField para el Correo Electrónico */}
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

            {/* TextField para el Teléfono */}
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

            {/* TextField para la Fecha de Contratación */}
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

            {/* TextField para el Salario */}
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

            {/* Botones de acción */}
            <Box
              my={4}
              display="flex"
              gap={4}
            >
              {/* Botón para guardar los cambios */}
              <Button onClick={onSave} variant={'contained'}>
                Guardar
              </Button>

              {/* Botón para cancelar la acción y regresar a la pantalla inicial */}
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