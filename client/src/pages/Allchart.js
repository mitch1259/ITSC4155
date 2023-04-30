import { useEffect, useState } from 'react';
import LayoutOne from '../components/layouts/LayoutOne';
import '../css/allchart.css';
import '../css/gobal.css';
import GoalService from '../services/GoalService';
import CreateGoal from './CreateSavingGoal';
import UpdateDeleteGoalList from '../components/savingsBoard/UpdateDeleteGoalList';
import { Stack } from "@mui/material";


function Allchart() {

    const [goalList, setGoal] = useState([]);

    useEffect(
        () => {
            getAllGoals()
        }, [])

    const getAllGoals = () => {
        GoalService.getAllGoals().then((response) => {
            setGoal(response.data)
        });
    };

    const savedDataArray = (savedAmount, sGoalAmount) => {
        const remainingSavingsGoal = Number(sGoalAmount) - Number(savedAmount)
        const sArray = [{ value: Number(savedAmount), title: "Saved" }, { value: Number(remainingSavingsGoal), title: "Goal" }]
        return sArray
    }


    const goalArray =(goalId,title,savings,startingAmount,startDate,endDate,description) =>{
        const fullArray=[{goalId:goalId,title:title,savings:savings,startingAmount:startingAmount,startDate:startDate,endDate:endDate,description:description}]
        return fullArray

    }
    document.title = "Savings Boards";
    
    return (
        <div className='all-charts-main'>
            <p className='all-dashboard-welcome-header'>Saving Goals</p>
            <Stack direction="row" spacing={2} justifyContent="right" id="button-stack">
                <div>
                    <CreateGoal />
                </div>
                <div>
                    <UpdateDeleteGoalList />
                </div>
            </Stack>
            {/* <div className='create-board-modal'>
                <CreateBoard/>
            </div> */}
            <div className='all-charts-display'>
                {goalList.map(
                    goal =>
                        <LayoutOne title={goal.title} savings={goal.savings} contribution={goal.startingAmount} savingGoalData={savedDataArray(goal.startingAmount, goal.savings)} goalObject={goalArray(goal.goalId,goal.title,goal.savings,goal.startingAmount,goal.startDate,goal.endDate,goal.description)} />
                )}



                {/* line chart works props and everything, now begins the cusomizations */}
                {/* <LineChart data={transactionData} width={400} height={400} backgroundColor={"#05386b"} fontSize={15} chartTitle={"Weekly Spending"}/>
                <Barchart data={defaultData1} width={400} height={400} xAxisTitle="categories" yAxisTitle="dollars"/> */}
            </div>

        </div>
    )
}

export default Allchart;