import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

type DeleteEmployeeConfirmationProps = {
  onConfirm: () => void;  // Función que se llama cuando se confirma la eliminación
  onClose: () => void;   // Función que se llama cuando se cierra el diálogo (cancelar o eliminar)
  open: boolean;    // Indica si el diálogo debe estar abierto o cerrado
}

const DeleteEmployeeConfirmation = ({onConfirm, onClose, open}: DeleteEmployeeConfirmationProps) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Seguro que desea eliminar?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Está seguro?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>No, cancelar</Button>
        <Button onClick={() => {
          onConfirm();  // Llama a la función onConfirm cuando se hace click en "Si, eliminar.
          onClose();    // Llama a la función onClose para cerrar el diálogo después de eliminar.
        }}>Si, eliminar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteEmployeeConfirmation;