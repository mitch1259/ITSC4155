import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';

function DeleteTransaction(props) {
    const [ready, setReady] = React.useState(false);
    const handleOpen = () => {
      setReady(true);
    }
  
    const handleClose = () => {
      setReady(false);
    }
  
    const deleteTransaction = () => {
      Axios.post('http://localhost:3002/api/transaction/delete', {
        id: props.id
      }).then(() => {
        console.log("successful delete");
      });
      window.location.reload(true);
      handleClose();
    }
  
    const sxFont = {
      fontFamily: 'Barlow Condensed',
      fontSize: '20px',
      fontWeight: '500'
    };
  
    const sxButton = {
      color: "red", fontFamily: "Barlow Condensed", backgroundColor: "antiquewhite", fontSize: "18px", textTransform: "none"
    };
  
    const sxButton2 = {
      fontFamily: "Barlow Condensed", textTransform: "none", fontSize: "18px", backgroundColor: "lightgreen"
    };
  
    return (
      <div>
        <Button onClick={handleOpen} sx={sxButton}>Delete</Button>
        <Dialog open={ready} onClose={handleClose}>
        <DialogTitle sx={sxFont}>Confirmation</DialogTitle>
          <DialogContent id='add-transaction-dialog-box'>
            <DialogContentText className='add-transaction-form' sx={sxFont}>
            Are you sure you want to delete this transaction?
              <br></br>
            <b>Note: This action cannot be undone!</b>
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose} sx={sxButton2}>Cancel</Button>
              <Button onClick={deleteTransaction} sx={sxButton}>Delete Transaction</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
}

export default DeleteTransaction;