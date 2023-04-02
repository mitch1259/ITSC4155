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
import { DialogContent, DialogContentText } from '@mui/material';
import RecentActivityCard from '../components/dashboard/RecentActivityCards';
import BoardLinksCard from '../components/dashboard/BoardLinksCard';
import DashboardChart from '../components/dashboard/DashboardChart.js';
import GetCookie from '../context/cookies/getCookie';
import Cookies from 'js-cookie';
import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import AuthContext from '../context/AuthProvider';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';
// import RecentActivitySnippet from './RecentActivitySnippet';
import { CircularProgress } from '@mui/material';

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
  const [recentTransactions, setRecentTransactions] = useState(null);
  const HashMap = require('hashmap');

  var current = DecryptFromLocalStorage("userId");
  var name = "";
  // setCurrentUser(current);
  // console.log('currentUser state on dashboard: ', currentUser);
  // console.log('data type of cookie value after parseInt: ', typeof current);

useEffect(() => {
  Axios.post('http://localhost:3002/api/get/currentUser', {userID: current}
    ).then((response) => {
      name = response.data[0].firstName;
      console.log("name: ", name);
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
    console.log("Firstname", firstName);
  
  useEffect(() => {
    Axios.post('http://localhost:3002/api/get/profileTransactions/recentTransactions', {userID: current}
      ).then((response) => {
        var transactionsData = Array.from(response.data);
        // userObject = userData[0];
        setRecentTransactions(transactionsData);
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
                  {/* {user.map(entry => 
                    <RecentActivitySnippet
                        boardName={entry.boardName}
                        remainingBudget={entry.remainBudget}
                        recentChargeDate1={entry.createDate}
                        recentChargeDate2={"01/10/23"}
                        recentChargeName1={entry.label}
                        recentChargeAmount1={entry.amount}
                        recentChargeName2={"Downtown Charlotte Parking Fee"}
                        recentChargeAmount2={"25.00"}
                    />
                  )} */}
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
     <div>
       <Button variant="outlined" onClick={handleClickOpen}>
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
