import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Axios from 'axios';
import {Link} from 'react-router-dom';


const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const deleteAccount = () => {
   onClose(selectedValue);
   Axios.post('http://localhost:3002/api/deleteUser', /*{
          email: email,
          password: password
        }*/).then((response) => {
          console.log(response);
        });
        console.log("Deleted Account");
 };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle> Are you sure you want to delete your account? </DialogTitle>
             <h3>
                   You can not recover your account informations once you have deleted your account {" "}
             </h3>
             <br></br>
             <div>
              <Link to="/registration">
              <button onClick = {deleteAccount}>
                   Confirm
                </button>
              </Link>
                <button onClick = {handleClose}>
                   Cancel
                </button>
             </div>
      
    </Dialog>
  );
}
SimpleDialog.propTypes = {
   onClose: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired,
   selectedValue: PropTypes.string.isRequired,
 };
 
 export default function SimpleDialogDemo() {
   const [open, setOpen] = React.useState(false);
   const [selectedValue, setSelectedValue] = React.useState(emails[1]);
 
   const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = (value) => {
     setOpen(false);
     setSelectedValue(value);
   };
 
   return (
     <div>
       <Button variant="outlined" onClick={handleClickOpen}>
         Delete Account
       </Button>
       <SimpleDialog
         selectedValue={selectedValue}
         open={open}
         onClose={handleClose}
       />
     </div>
   );
 }
