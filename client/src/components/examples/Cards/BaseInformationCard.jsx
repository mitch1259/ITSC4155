import * as React from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography } from '@mui/material';
import '../../../css/global.css';

/**
 * This is a basic card that allows display of board name and savings information
 * @param {String} boardTitle - a parameter that allow developers to put tht title of your board and the saving information
 * @param {number} savingInformation- a parameter to show saving information
 */


function BaseInformationCard({boardTitle,savingInformation,contributions}){
    return(
        <Card id="base-info-card-wrapper" style={{backgroundColor:"#8ee4af",borderRadius:10}}>
            <CardContent style={{backgroundColor:"#b6e9ca"}}>
                <Typography style={{color:"#05386b",fontSize:"30px",fontFamily:"Varela Round"}}>{boardTitle}</Typography>
                <br></br>
                <Typography style={{color:"#05386b",fontSize:"30px",fontFamily:"Varela Round"}}>Savings: ${savingInformation}</Typography>
                <br></br>
                <Typography style={{color:"#05386b",fontSize:"30px",fontFamily:"Varela Round"}}>saved: ${contributions}</Typography>
            </CardContent>
        </Card>
    )

}
BaseInformationCard.defaultProps={
    boardTitle:"default title",
    savingInformation:0
};

export default BaseInformationCard;