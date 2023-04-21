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
import AuthContext from '../context/AuthProvider';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';
import { useEffect, useState, useContext } from 'react';



const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };
  const [isLoading, setLoading] = useState(true);
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { auth, setAuth} = useContext(AuthContext);

    var current = DecryptFromLocalStorage("userId");

useEffect(() => {
  Axios.post('http://localhost:3002/api/get/currentUser', {userID: current}
    ).then((response) => {
      console.log(response.data);
      // name = response.data[0].firstName + response.data[0].lastName + response.data[0].email;
      // setUserName(name);
      setLoading(false);
      // setCurrentUser(response.data);
    });
}, []);

  const deleteAccount = () => {
   onClose(selectedValue);
   Axios.post('http://localhost:3002/api/deleteUser',{
      userID: current

      }).then((response) => {
          console.log(response);
          localStorage.removeItem('userId');
          setAuth(false);
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
       <Button id="delete-account-button" variant="outlined" onClick={handleClickOpen}>
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
