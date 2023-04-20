import { useEffect, useState } from 'react';
import LayoutOne from '../components/layouts/LayoutOne';
import '../css/allchart.css';
import '../css/gobal.css';
import GoalService from '../services/GoalService';


function Allchart(){

    const [goalList,setGoal]=useState([]);

    useEffect(
        () =>{
        getAllGoals()
    },[])

    const getAllGoals =() =>{
        GoalService.getAllGoals().then((response) =>{
            setGoal(response.data)
            console.log(response.data)
        });
    };

    document.title = "Savings Boards";

    return(
        <div className='all-charts-main'>
            <p className='all-dashboard-welcome-header'>All Boards</p>
            {/* <div className='create-board-modal'>
                <CreateBoard/>
            </div> */}
            <div className='all-charts-display'>
                {/* <LayoutOne title="First Board" savings={10000}/>
                <LayoutOne title="Second Board" savings={1000}/>
                <LayoutOne title="Third Board" savings={30000}/> */}
                
                {goalList.map(
                    goal =>
                    <LayoutOne title={goal.title} savings={goal.savings} contributions ={goal.startingAmount} />
                )}
                


                {/* line chart works props and everything, now begins the cusomizations */}
                {/* <LineChart data={transactionData} width={400} height={400} backgroundColor={"#05386b"} fontSize={15} chartTitle={"Weekly Spending"}/>
                <Barchart data={defaultData1} width={400} height={400} xAxisTitle="categories" yAxisTitle="dollars"/> */}
            </div>
            
        </div>
    )
}

export default Allchart;