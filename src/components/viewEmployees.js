import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {Box, Button, Snackbar} from "@mui/material";
import {Link, useSearchParams} from "react-router-dom";
import DeleteEmployeeConfirmation from "./deleteEmployeeConfirmation";
import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {remove, removeAll, selectEmployees} from "../app/employeesReducer";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'Nombre', width: 130 },
    { field: 'lastName', headerName: 'Apellido', width: 130 },
    { field: 'email', headerName: 'Correo Electrónico', width: 250 },
    { field: 'phoneNumber', headerName: 'Teléfono', width: 160 },
    { field: 'hireDate', headerName: 'Fecha de Contratación', width: 180 },
    { field: 'salary', headerName: 'Salario', type: 'number', width: 130, valueGetter: (value, row) => value ? `$ ${value}` : 'No informado'},
];

const ViewEmployees = () => {
  const dispatch = useDispatch(); // Función para enviar acciones al store de Redux
  const dataModel = useSelector(selectEmployees); // Selecciona y extrae la lista de empleados del estado global de Redux mediante el selector selectEmployees.

  const [urlSearchParams, setUrlSearchParams] = useSearchParams(); // Maneja los parámetros de búsqueda de la URL.
  const [snackbarMessage, setSnackbarMessage] = useState(); // Estado local para mostrar mensajes de Snackbar.
  const [selectedRows, setSelectedRows] = useState([]); // Estado local para almacenar las filas seleccionadas en el DataGrid.
  const [deleteAllEmployeeConfirmationOpen, setDeleteAllEmployeeConfirmationOpen] = useState(false); // Estado local para controlar la apertura del diálogo de confirmación para eliminar todos los empleados.
  const [deleteEmployeeConfirmationOpen, setDeleteEmployeeConfirmationOpen] = useState(false); // Estado local para controlar la apertura del diálogo de confirmación para eliminar empleados seleccionados.


    //Effect para manejar mensajes de Snackbar basado en los parámetros de búsqueda de la URL.
  useEffect(() => {
    if (urlSearchParams.has('createSuccess')) {
      setSnackbarMessage('Empleado creado correctamente');
      setUrlSearchParams('');
    }
    if (urlSearchParams.has('editSuccess')) {
      setSnackbarMessage('Empleado editado correctamente');
      setUrlSearchParams('');
    }
  }, [urlSearchParams, setUrlSearchParams]);

  return (
    <>
        {/* Componente de confirmación para eliminar empleados */}
      <DeleteEmployeeConfirmation
        onClose={() => {
          // Cerramos el dialogo de confirmación
          setDeleteEmployeeConfirmationOpen(false);
          setDeleteAllEmployeeConfirmationOpen(false);
        }}
        onConfirm={() => {
          // Eliminar registro(s).
          if (deleteAllEmployeeConfirmationOpen) {
            dispatch(removeAll())
          }
          if (deleteEmployeeConfirmationOpen) {
            dispatch(remove(selectedRows))
          }
        }}
        open={deleteAllEmployeeConfirmationOpen || deleteEmployeeConfirmationOpen}
      />

        {/* Barra de herramientas con botones para acciones */}
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

        {/* DataGrid para mostrar los empleados */}
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

        {/* Snackbar para mostrar mensajes temporales */}
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