import * as React from 'react';
import Card from '@mui/material/Card';
import { CardContent, Typography } from '@mui/material';

/**
 * This is a basic card that allows display of board name and savings information
 * @param {Array} data - a parameter that allow developers to put tht title of your board and the saving information
 */


function BaseInformationCard(data){

    return(
        <Card>
            <CardContent>
                <Typography> Title {data.boardTitle}</Typography>
                <p></p>
                <br></br>
                <Typography>Savings:{data.saving}</Typography>
            </CardContent>
        </Card>
    )

}


export default BaseInformationCard;