import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const DeleteEmployeeConfirmation = ({onConfirm, onClose, open}) => {
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
          onConfirm();
          onClose();
        }}>Si, eliminar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteEmployeeConfirmation;