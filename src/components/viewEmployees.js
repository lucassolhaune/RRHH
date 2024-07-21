import React, {useEffect, useState} from "react";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {Box, Button, Snackbar} from "@mui/material";
import {Link, useSearchParams} from "react-router-dom";
import DeleteEmployeeConfirmation from "./deleteEmployeeConfirmation";

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'Nombre', width: 130 },
    { field: 'lastName', headerName: 'Apellido', width: 130 },
    { field: 'email', headerName: 'Correo Electrónico', width: 250 },
    { field: 'phoneNumber', headerName: 'Teléfono', width: 160 },
    { field: 'hireDate', headerName: 'Fecha de Contratación', width: 180 },
    { field: 'salary', headerName: 'Salario', type: 'number', width: 130, valueGetter: (value, row) => value ? `$ ${value}` : 'No informado'},
];

const ViewEmployees = ({dataModel, setDataModel}) => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteAllEmployeeConfirmationOpen, setDeleteAllEmployeeConfirmationOpen] = useState(false);
  const [deleteEmployeeConfirmationOpen, setDeleteEmployeeConfirmationOpen] = useState(false);

  useEffect(() => {
    if (urlSearchParams.has('success')) {
      setSnackbarOpen(true);
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

          if (deleteEmployeeConfirmationOpen) {
            const filteredEmployees = dataModel.filter(employee => !selectedRows.includes(employee.id));
            setDataModel(filteredEmployees);
          }
        }}
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
          Edit Empleado
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
        open={snackbarOpen}
        autoHideDuration={3000}
        message="Empleado creado"
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  )
}

export default ViewEmployees;