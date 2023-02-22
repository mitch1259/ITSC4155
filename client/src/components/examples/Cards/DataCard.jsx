import * as React from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography } from '@mui/material';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// function for displaying the number of rows in the card


/**data card is a component that allows developer to create a card to display data like recents transactions, upcoming, filtered, etc..
 * @param {string} title - title you want your card to be
 * @param {Array} dataArray - The parameter that you put your transaction array in with date,label,amount titled columns
*/
function BasicDataCard({title,dataArray }){
    return (
        <Card>
            <CardContent>
                <Typography>{title}</Typography>
                <br></br>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Transaction</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        {/* <TableBody>
                            {dataArray.map((row)=>(
                                <tableRow key={row.date} >
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell align="right">{row.label}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                </tableRow>
                            ))}
                        </TableBody> */}
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
