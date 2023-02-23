import BaseInformationCard from "../examples/Cards/BaseInformationCard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BasicDataCard from "../examples/Cards/DataCard";
import ChartComponent from "../examples/charts/radialCharts/ChartComponent"
const data = [
    { value: 60 },
    { value: 25 },
    { value: 15 },
  ];



function LayoutOne(userArray){


    return(
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid container item spacing={3}>
                    <BaseInformationCard data={userArray}/>
                </Grid>
                <Grid container item spacing={3}>
                    <BasicDataCard 
                    title="Recent Activity"
                    />
                </Grid>
                <Grid container item spacing={3}>
                    <BasicDataCard
                    title="Upcoming Expense"
                    />
                </Grid>
                <Grid container item spacing={3}>
                <ChartComponent data={data} />
                </Grid>
            </Grid>
        </Box>
    )
}
export default LayoutOne;