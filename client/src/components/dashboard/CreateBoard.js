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
import PlusIcon from '../../images/plus-icon-2-white.png';

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

  const sxFontCreateBoard = {
    fontFamily: 'Barlow Condensed',
    fontSize: '24px',
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
      <button onClick={handleOpen} className='board-link-button-add'>
        <img src={PlusIcon} className='create-board-button-icon'/>
      </button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={sxFontCreateBoard}>Create a new Savings Board</DialogTitle>
        <DialogContent sx={{ fontSize:'20px', paddingBottom: '0px' }}>Hey there, {props.currentUserName}. Looking to improve the way you keep track of your finances? You're already in the right place.</DialogContent>
        <DialogContent sx={{ fontSize:'20px', paddingBottom: '0px', paddingTop: '10px' }}>
          A BudgIt Savings Board is a tool designed to help people keep an eye on their finances without any of the stress that normally
          comes along with that. Our simple-to-use interface allows you to quickly log your transactions as they happen, all while keeping you
          aware of how you're doing with your budget.
        </DialogContent>

        <DialogContent sx={{ fontWeight: 500, fontSize: '20px'}}>Ready to get started? Just fill out these boxes and we'll take care of the rest.</DialogContent>
        <DialogContent id='add-transaction-dialog-box'>
          <DialogContentText className='add-transaction-form' sx={sxFontCreateBoard}>
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