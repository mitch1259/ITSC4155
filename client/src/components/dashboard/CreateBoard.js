import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Axios from 'axios';
import DecryptFromLocalStorage from '../../context/encryption/DecryptFromLocalStorage';
import AuthContext from '../../context/AuthProvider';

function CreateBoard(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setName("");
    setDesc("");
    setBudget("");

    setOpen(false);
  }

  const { auth, setAuth} = React.useContext(AuthContext);
  var current = DecryptFromLocalStorage("userId");

  const createBoard = () => {
    Axios.post('http://localhost:3002/api/board/create', {
      userID: current,
      name: name,
      description: desc,
      budget: budget
    }).then(() => {
      console.log("successful board insert");
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

  const [name, setName] = React.useState("");
  const handleName = (event) => {
    setName(event.target.value);
  }

  const [desc, setDesc] = React.useState("");
  const handleDesc = (event) => {
    setDesc(event.target.value);
  }

  const [budget, setBudget] = React.useState(0);
  const handleBudget = (event) => {
    setBudget(event.target.value);
  }

  return (
    <div>
      <button onClick={handleOpen} className='board-link-button'>Create Board</button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={sxFont}>Create Board</DialogTitle>
        <DialogContent id='add-transaction-dialog-box'>
          <DialogContentText className='add-transaction-form' sx={sxFont}>
            <TextField
              className='add-transaction-form'
              autoFocus
              margin="dense"
              label="Board Name"
              type="text"
              fullWidth
              variant="filled"
              onChange={handleName}
              required
            />
            <TextField
              className='add-transaction-form'
              margin="dense"
              label="Board Description"
              type="text"
              fullWidth
              variant="filled"
              onChange={handleDesc}
              required
            />
            <TextField
              inputProps={{ type: 'number'}}
              className='add-transaction-form'
              margin="dense"
              label="Weekly Budget"
              type="text"
              fullWidth
              variant="filled"
              onChange={handleBudget}
              required
            />
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} sx={sxButton}>Cancel</Button>
            <Button onClick={createBoard} sx={sxButton2}>Create Board</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateBoard