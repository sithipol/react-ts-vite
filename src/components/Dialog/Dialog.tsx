import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: User);
}

interface User {
  name: string;
  email: string;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter the user details:</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;
