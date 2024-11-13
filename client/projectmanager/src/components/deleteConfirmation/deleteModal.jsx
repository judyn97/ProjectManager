import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './deleteModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DeleteModal({ open, setOpen, onConfirm, onCancel, message = "Are you sure you want to delete this?" }) {
  const handleClose = () => {
    setOpen(false);
    if (onCancel) onCancel();
  };

  const handleDeleteYes = () => {
    onConfirm(); // Executes the deletion logic passed from the parent
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div><h2>Delete Confirmation</h2></div>
        <div className='delete-message-container'>{message}</div>
        <div className='delete-button-container'>
          <button className='delete-cancel-button' onClick={handleClose}>Cancel</button>
          <button className='delete-yes-button' onClick={handleDeleteYes}>Delete</button>
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
