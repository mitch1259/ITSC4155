import * as React from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RecentTransaction from './RecentTransactions/RecentTransactions';
import '../../../css/global.css';

/**data card is a component that allows developer to create a card to display data like recents transactions, upcoming, filtered, etc..
 * @param {string} title - title you want your card to be
 * @param {Array} transactions - The parameter that you put your transaction array in with date,label,amount titled columns
*/
const BasicDataCard=({title})=>{
    return (
        <Card style={{borderRadius:10}}>
            <CardContent style={{backgroundColor:"#8ee4af"}}>
                <Typography style={{color:"#05386b",fontSize:"28px",fontFamily:"Varela Round",fontWeight:"500"}}>{title}</Typography>
                <br></br>
                <TableContainer component={Paper}>
                    <Table style={{backgroundColor:"#b6e9ca"}}>
                        <TableHead>
                            <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Transaction</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {RecentTransaction.map((transaction)=>(
                                <TableRow key={transaction.date} >
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell align="center">{transaction.label}</TableCell>
                                    <TableCell align="center">{transaction.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                

                
            </CardContent>

        </Card>
        )

}





BasicDataCard.defaultProps={
    title:"default title"
};

// todo: put typecheck information here


//export for usage in other part of the application.
export default BasicDataCard;
