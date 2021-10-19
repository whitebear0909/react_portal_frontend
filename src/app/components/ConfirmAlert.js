import React from 'react';
import { 
  Button,
  Dialog,
  DialogActions, 
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const ConfirmAlert = ({ open, content, onHide, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onHide();
  };

  return (
    <Dialog
      open={open}
      onClose={onHide}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHide}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmAlert;
