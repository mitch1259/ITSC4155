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

const emails = ['username@gmail.com', 'user02@gmail.com'];

function Transactions(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle> Most Recent Transactions </DialogTitle>
             <h3>
              <DialogContent>
                <DialogContentText> temp text</DialogContentText>
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
