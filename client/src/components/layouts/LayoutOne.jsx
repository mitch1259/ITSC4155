import BaseInformationCard from "../examples/Cards/BaseInformationCard";
import { Stack } from "@mui/material";
import BasicDataCard from "../examples/Cards/DataCard";
import ChartComponent from "../examples/charts/radialCharts/ChartComponent"
import '../../css/LayoutOne.css';
import '../../css/global.css';
import Axios from 'axios';
import { useEffect,useState } from 'react';
import DecryptFromLocalStorage from '../../context/encryption/DecryptFromLocalStorage';
import AddContribution from "../savingsBoard/AddContributionButton";






function LayoutOne({title,savings,contribution,savingGoalData,goalObject}){
const [recentTransactions, setRecentTransactions] = useState(['']);
const [transactionsLoading, setTransactionsLoading] = useState(true);

var current = DecryptFromLocalStorage("userId");

//transaction calls:

  // get the two most recent transactions per board
  useEffect(() => {
    Axios.post('http://localhost:3002/api/get/currentUser/recentTransactions', {userID: current}
      ).then((response) => {
        var transactionsData = Array.from(response.data);
        // var recurrentDataArray=transactionsData.filter((key) =>key.includes(key.userID===1))
        setRecentTransactions(transactionsData);
        // setRecurrent(recurrentDataArray);
        setTransactionsLoading(false);
      });
  }, []);

    return(
        <div className="layout-one-wrapper">
            <AddContribution goal={goalObject}/>
        <Stack direction="row" spacing={3} justifyContent="center" id="layout-one-stack">
            <div>
                <BaseInformationCard id="base-information-card" boardTitle={title} savingInformation={savings} contributions={contribution} />
            </div>
            <div>
                <BasicDataCard title="Recent Activity" transactions={recentTransactions}/>
            </div>
            <div>
                <BasicDataCard title="Upcoming Expense" transactions={recentTransactions}/>
            </div>
            <div id="layout-one-chart">
                <ChartComponent data={savingGoalData} />
            </div>
        </Stack>
        </div>
    )
}
export default LayoutOne;