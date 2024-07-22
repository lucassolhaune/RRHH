import React, {useEffect, useState} from "react";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {Box, Button, Snackbar} from "@mui/material";
import {Link, useSearchParams} from "react-router-dom";
import DeleteEmployeeConfirmation from "./deleteEmployeeConfirmation";
import {Employee} from "../types/Employee";
import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'Nombre', width: 130 },
    { field: 'lastName', headerName: 'Apellido', width: 130 },
    { field: 'email', headerName: 'Correo Electrónico', width: 250 },
    { field: 'phoneNumber', headerName: 'Teléfono', width: 160 },
    { field: 'hireDate', headerName: 'Fecha de Contratación', width: 180 },
    { field: 'salary', headerName: 'Salario', type: 'number', width: 130, valueGetter: (value, row) => value ? `$ ${value}` : 'No informado'},
];

type ViewEmployeesProps = {
  dataModel: Employee[];
  setDataModel: (employee: Employee) => void;
}

const ViewEmployees = ({dataModel, setDataModel}: ViewEmployeesProps) => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const [snackbarMessage, setSnackbarMessage] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteAllEmployeeConfirmationOpen, setDeleteAllEmployeeConfirmationOpen] = useState(false);
  const [deleteEmployeeConfirmationOpen, setDeleteEmployeeConfirmationOpen] = useState(false);

  /**
   * useEffect
   *
   * El primer if verifica si el objeto "urlSearchParams" contiene el parámetro "createSuccess";
   * Si es verdadero llama al "setSnackbarMessage", actualiza el estado para mostrar un mensaje que el empleado se
   * actualizó correctamente.
   * Luego llama a "setUrlSearchParams('')", que va a limpiar o
   * actualizar el objeto "urlSearchParams" después de finalizar con éxito la operación.
   *
   * El segundo if  verifica si el objeto "urlSearchParams" contiene el parámetro "editSuccess";
   * Si es verdadero, llama a "setSnackbarMessage('Empleado creado correctamente')",
   * esto actualizará el estado para mostrar un mensaje de confirmación o notificación en la interfaz de usuario.
   * Luego se llama a "setUrlSearchParams('')" que va a limpiar o
   * actualizar el objeto "urlSearchParams" despues de finalizar con éxito la operación,
   */
  useEffect(() => {
    if (urlSearchParams.has('createSuccess')) {
      setSnackbarMessage('Empleado editado correctamente');
      setUrlSearchParams('');
    }
    if (urlSearchParams.has('editSuccess')) {
      setSnackbarMessage('Empleado creado correctamente');
      setUrlSearchParams('');
    }
  }, [urlSearchParams, setUrlSearchParams]);

  return (
    <>
      <DeleteEmployeeConfirmation
        onClose={() => {
          // Cerramos el dialogo
          setDeleteEmployeeConfirmationOpen(false);
          setDeleteAllEmployeeConfirmationOpen(false);
        }}
        onConfirm={() => {
          // Eliminar registro(s)
          if (deleteAllEmployeeConfirmationOpen) {
            setDataModel([]);
          }
          /**
          * Este fragrmento de código elimina empleados de "dataModel" basandose en los "ids" almacenados en "selectedRows"
          * solo si "deleteEmployeeConfirmationOpen" es verdadero.
          */
          if (deleteEmployeeConfirmationOpen) {
            const filteredEmployees = dataModel.filter(employee => !selectedRows.includes(employee.id));
            setDataModel(filteredEmployees);
          }
        }}
        //Si el modal es "true" cualquier de los dos estados se van a mostrar.
        open={deleteAllEmployeeConfirmationOpen || deleteEmployeeConfirmationOpen}
      />

      <Box
        my={4}
        display="flex"
        gap={4}
      >
        <Button
          component={Link}
          to="/create"
          variant="contained"
        >
          Crear Empleado
        </Button>
        <Button
          component={Link}
          disabled={!selectedRows.length || selectedRows.length > 1}
          to={`/edit/${selectedRows[0]}`}
          variant="contained"
        >
          Editar Empleado
        </Button>
        <Button
          disabled={!selectedRows.length}
          onClick={() => setDeleteEmployeeConfirmationOpen(true)}
          variant="contained"
        >
          {selectedRows.length > 1 ? 'Eliminar Empleados': 'Eliminar Empleado'}
        </Button>
        <Button
          onClick={() => setDeleteAllEmployeeConfirmationOpen(true)}
          variant="contained"
        >
          Eliminar Todos los Empleados
        </Button>
      </Box>

      <DataGrid
        autoHeight
        rows={dataModel}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedRows(newRowSelectionModel);
        }}
        rowSelectionModel={selectedRows}
        slots={{
          toolbar: GridToolbar,
        }}
        localeText={{ noRowsLabel: "No hay RRHH disponibles" }}
      />

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={() => setSnackbarMessage(false)}
      />
    </>
  )
}

export default ViewEmployees;