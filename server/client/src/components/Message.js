import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';

const Message = ({ message, isOpen, severity }) => {
  const [open, setOpen] = useState(isOpen);

  const alertClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={alertClose}
    >
      <Alert onClose={alertClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Message;
