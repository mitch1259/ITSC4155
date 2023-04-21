import BaseInformationCard from "../examples/Cards/BaseInformationCard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Stack } from "@mui/material";
import BasicDataCard from "../examples/Cards/DataCard";
import ChartComponent from "../examples/charts/radialCharts/ChartComponent"
import '../../css/LayoutOne.css';
import '../../css/global.css';
import { TransactiontypeData } from "../../SampleData/Piechartdata/TransactionTypeSpendingData";

function LayoutOne({title,savings,rTransactions,uTransactions}){

    return(
        <div className="layout-one-wrapper">
        <Stack direction="row" spacing={3} justifyContent="center" id="layout-one-stack">
            <div>
                <BaseInformationCard id="base-information-card" boardTitle={title} savingInformation={savings} />
            </div>
            <div>
                <BasicDataCard 
                    title="Recent Activity"
                />
            </div>
            <div>
                <BasicDataCard
                    title="Upcoming Expense"
                />
            </div>
            <div id="layout-one-chart">
                <ChartComponent data={TransactiontypeData} />
            </div>
        </Stack>
        </div>
    )
}
export default LayoutOne;