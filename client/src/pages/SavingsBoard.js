import React, { useEffect, useState } from 'react'
import SavingsBoardBucket from '../components/savingsBoard/SavingsBoardBucket';
import BoardHeader from '../components/savingsBoard/BoardHeader.js';
import BoardFunctionBar from '../components/savingsBoard/BoardFunctionBar';
import '../css/savingsBoard/savingsBoard.css';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';
import AuthContext from '../context/AuthProvider';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
/*
const buckets = [
  {
    "remainingBudget": 500,
    "currentDay": "3/11"
  },
  {
    "remainingBudget": 437,
    "currentDay": "3/12"
  },
  {
    "remainingBudget": 400,
    "currentDay": "3/13"
  },
  {
    "remainingBudget": 359,
    "currentDay": "3/14"
  },
  {
    "remainingBudget": 322,
    "currentDay": "3/15"
  },
  {
    "remainingBudget": 300,
    "currentDay": "3/16"
  },
  {
    "remainingBudget": 150,
    "currentDay": "3/17"
  },
  
  
  
  
]
*/
document.title = "Savings Board";


function SavingsBoard() {

  // get boardID from URL parameter
  const { boardId } = useParams();
  console.log("boardID: ", boardId);
  const [boardInfo, setBoardInfo] = useState('');
  const [isBoardInfoLoading, setIsBoardInfoLoading] = useState(true);

  // use boardID to get all info on the current board and store it in the boardInfo state variable
  useEffect(() => {
    Axios.post('http://localhost:3002/api/get/currentBoard', {boardId: boardId}
    ).then((response) => {
      setBoardInfo(Array.from(response.data));
      setIsBoardInfoLoading(false);
    })
  }, []);

  console.log("current board info: ", boardInfo);

  var firstDate = new Date();

  //DO NO CHANGE THE DATE SET!!!!!!! WILL BREAK IF NOT DONE LIKE THIS
  var secondDate = new Date();
  secondDate = new Date(secondDate.setDate(firstDate.getDate() + 7));

  const { auth, setAuth} = React.useContext(AuthContext);
  var current = DecryptFromLocalStorage("userId");

  const [data, setData] = React.useState('');
  const handleData = (dataFromChild) => {
    setData(dataFromChild);
    console.log(dataFromChild);

    updateBuckets(dataFromChild);
  }

  const [remBudget, setBudget] = React.useState(0);
  const [buckets, setBuckets] = React.useState([{}])
  const updateBuckets = (newData) => {
    
    var tempArr = [];
    var tempBudget = remBudget;
    var oldmm = -1;
    var olddd = -1;
    var index = -1;
    var j = 0;
    var count = 0;
    var countArr = [];
    
    for (let i = 0; i < newData.length - 1; i ++) {  
      var date = (newData[i].createDate).substring(0, 10);
      date = new Date(date);
      date.setDate(date.getDate() + 1)
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      
      tempBudget = tempBudget + newData[i].amount;
      console.log(tempBudget);

      if (mm === oldmm && dd === olddd) {
        count = count + newData[i].amount;
        countArr.push(newData[i]);
        tempArr[index] = ({
        "remainingBudget": newData[j].amount + count,
        "currentDay": mm + "/" + dd,
        "transactions": countArr
        })
      } else {
        countArr = [newData[i]]
        tempArr.push({
        "remainingBudget": newData[i].amount,
        "currentDay": mm + "/" + dd,
        "transactions" : countArr
      })
      count = 0;
      index = tempArr.length - 1;
      j = i;
    }
    oldmm = mm;
    olddd = dd;
    }

    setBuckets(tempArr);
    setBudget(tempBudget);
    console.log(tempArr);
  }

  console.log("buckets: ", buckets);
  console.log("remaining budget: ", remBudget);

  if (isBoardInfoLoading) {
    return <div className='account-dashboard-main'>Loading...</div>
  }

  return (
    <div className='savings-board-wrapper'>
      <div className='savings-board-header-wrapper'>
        <BoardHeader 
          boardTitle={boardInfo[0].boardName}
          boardDescription={boardInfo[0].boardDescription}
          remainingBudget={boardInfo[0].remainBudget}
        />
      </div>
      <div className='savings-board-function-bar'>
        <BoardFunctionBar 
          startDate={firstDate}
          endDate={secondDate}
          sendDataToParent={handleData}
          userID={current}
        />
      </div>
      <div className='savings-board-buckets'>
        { buckets.map(bucket => 
          <SavingsBoardBucket remainingBudget={bucket.remainingBudget} currentDay={bucket.currentDay} transactions={bucket.transactions} />
        ) }
      </div>
      <div className='savings-board-buckets-timeline' />
    </div>
  )
}

export default SavingsBoard
