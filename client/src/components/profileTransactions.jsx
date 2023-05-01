import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { DialogContent, DialogContentText } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import AuthContext from '../context/AuthProvider';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';
import '../css/savingsBoard/addTransactionButton.css';

// import { useCookies } from 'react-cookie';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function Transactions(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const [isLoading, setLoading] = useState(true);
  const [username, setUserName] = useState('');  
  const { auth, setAuth } = useContext(AuthContext);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [boardsLoading, setBoardsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userBoards, setUserBoards] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const HashMap = require('hashmap');

  var current = DecryptFromLocalStorage("userId");
  var name = "";


useEffect(() => {
  Axios.post('http://localhost:3002/api/get/currentUser', {userID: current}
    ).then((response) => {
      name = response.data[0].firstName;
      // console.log("name: ", name);
      setUserName(name);
      setLoading(false);
      // setCurrentUser(response.data);
    });
}, []);
useEffect(() => {
  Axios.post('http://localhost:3002/api/get/currentUserInfo', {userID: current}
    ).then((response) => {
      const userData = Array.from(response.data);
      // userObject = userData[0];
      setUser(userData);
      setIsUserLoading(false);
    });
}, []);

    const firstName = name;
    // console.log("Firstname", firstName);
  var transactionsData = [];
  useEffect(() => {
    Axios.post('http://localhost:3002/api/get/profileTransactions/recentTransactions', {userID: current}
      ).then((response) => {
        transactionsData = Array.from(response.data);
        // userObject = userData[0];
        // console.log(transactionsData);
        setRecentTransactions(Array.from(transactionsData));
        setTransactionsLoading(false);
      });
  }, []);

  if(isLoading) {
    return <div className="account-dashboard-main">Loading...</div>
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle> Most Recent Transactions </DialogTitle>
             <h3>
              <DialogContent>
                <DialogContentText>
                  {recentTransactions.map(transaction => 
                    <p id='transaction-data-profile'>Transaction Name: {transaction.label} Transaction Amount: {transaction.amount} Transaction Date: {transaction.createDate.substring(0,10)} </p>
                    )}
                </DialogContentText>
              </DialogContent>
             </h3>
             <br></br>
             <div>
                <button onClick = {handleClose}>
                   Close
                </button>
             </div>
      
    </Dialog>
  );
}
Transactions.propTypes = {
   onClose: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired,
   selectedValue: PropTypes.string.isRequired,
 };
 
 export default function ProfileTransactionsDemo() {
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
     <div id="transaction-button-wrapper-profile" style={{paddingRight: 0 + 'px', textAlign: 'center'}}>
       <Button variant="outlined" onClick={handleClickOpen} id='add-transaction-button-profile' sx={{border: 'none'}}>
         View Previous Transactions
       </Button>
       <Transactions
         selectedValue={selectedValue}
         open={open}
         onClose={handleClose}
       />
     </div>
   );
 }
