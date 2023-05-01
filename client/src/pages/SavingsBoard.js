import React, { useEffect, useState } from 'react'
import SavingsBoardBucket from '../components/savingsBoard/SavingsBoardBucket';
import BoardHeader from '../components/savingsBoard/BoardHeader.js';
import BoardFunctionBar from '../components/savingsBoard/BoardFunctionBar';
import '../css/savingsBoard/savingsBoard.css';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';
import AuthContext from '../context/AuthProvider';
import { useParams } from 'react-router-dom';
import Axios from 'axios';


function SavingsBoard() {

  // get boardID from URL parameter
  const { boardId } = useParams();
  const [boardInfo, setBoardInfo] = useState('');
  const [isBoardInfoLoading, setIsBoardInfoLoading] = useState(true);
  const [clonedBucketArray, setClonedBucketArray] = useState([]);
  const [timeframe, setTimeframe] = useState();


  // use boardID to get all info on the current board and store it in the boardInfo state variable
  useEffect(() => {
    Axios.post('http://localhost:3002/api/get/currentBoard', {boardId: boardId}
    ).then((response) => {
      setBoardInfo(Array.from(response.data));
      setIsBoardInfoLoading(false);
    })
  }, []);

  var firstDate = new Date();
  firstDate.setHours(0, 0, 0);

  //DO NO CHANGE THE DATE SET!!!!!!! WILL BREAK IF NOT DONE LIKE THIS
  var secondDate = new Date();
  secondDate = new Date(secondDate.setDate(firstDate.getDate() + 7));
  secondDate.setHours(0, 0, 0);

  const { auth, setAuth} = React.useContext(AuthContext);
  var current = DecryptFromLocalStorage("userId");

  const [data, setData] = React.useState('');
  const handleData = (dataFromChild) => {
    setData(dataFromChild);
    // console.log(dataFromChild);

    //updateBuckets(dataFromChild);
    updateBudget(dataFromChild);
  }

  //NEEDS TO BE UPDATED TO A PROP
  var boardID = boardId;

  const [title, setTitle] = React.useState("");
  const [description, setDesc] = React.useState("");
  const [remBudget, setBudget] = React.useState(0);
  const updateBudget = (dataFromChild) => {
    Axios.get('http://localhost:3002/api/get/board/budget', {
      params: {id: boardID }
    }).then((response) => {
      response = Array.from(response.data);
      //response = response[0].remainBudget;
      dataFromChild.push(response[0].remainBudget);
      setTitle(response[0].boardName);
      setDesc(response[0].boardDescription);
      //console.log(dataFromChild[dataFromChild.length - 1] + " SJFHGKJSHFKWJHG")
      updateBuckets(dataFromChild);
    });
  }


  const [buckets, setBuckets] = React.useState([{}]);
  const updateBuckets = (newData) => {
    
    var tempArr = [];
    var tempBudget = newData[newData.length - 1] * (newData[newData.length - 3] / 7);
    var oldmm = -1;
    var olddd = -1;
    var index = -1;
    var j = 0;
    var count = 0;
    var countArr = [];

    // console.log("tempBudget:" , tempBudget);
    
    for (let i = 0; i < newData.length - 3; i ++) {  
      var date = new Date(newData[i].createDate);
      // console.log(newData[i].createDate);
      // console.log(date)
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      
      tempBudget = tempBudget + newData[i].amount;
      // console.log(tempBudget);

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


    // Below inserts empty values for empty dates

    var startDate = newData[newData.length - 2];
    var date = new Date(startDate);
    //date.setDate(date.getDate() + 1);
    for (let i = 0; i < newData[newData.length - 3]; i++) {
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      var evaluator = mm + "/" + dd;

      if (tempArr[i] == null || tempArr[i].currentDay != evaluator) {
        tempArr.splice(i, 0, {"remainingBudget": 0,
        "currentDay": evaluator,
        "transactions" : []})
      }
      date.setDate(date.getDate() + 1);
    }

    
    setTimeframe((newData[newData.length - 3] / 7));
    setBuckets(tempArr);
    setBudget(tempBudget);
  }

  
  // prevent page from rendering until all board information is done loading
  if (isBoardInfoLoading) {
    return <div className='account-dashboard-main'>Loading...</div>
  }

  // calculate the cumulative budget, in order of the transactions and days to ensure data flows naturally
  const cumulativeValues = buckets.reduce((accumulator, currentBucket) => {
    const lastValue = accumulator.length > 0 ? accumulator[accumulator.length - 1] : boardInfo[0].remainBudget * timeframe;
    accumulator.push(lastValue + currentBucket.remainingBudget);
    return accumulator;
  }, []);
  const clonedBuckets = buckets.map((bucket, index) => {
    return { ...bucket, cumulativeBudget: cumulativeValues[index]}
  })

  // find the max budget 
  const maxBudget = clonedBuckets.reduce((maxValue, bucket) => {
    if (bucket.cumulativeBudget > maxValue) {
      return bucket.cumulativeBudget;
    } else {
      return maxValue;
    }
  }, boardInfo[0].remainBudget);

  // create page title
  document.title = "Savings Board";

  return (
    <div className='savings-board-wrapper'>
      <div className='savings-board-header-wrapper'>
        <BoardHeader 
          boardTitle={title}
          boardDescription={description}
          remainingBudget={Math.round(remBudget * 100) / 100}
          weeklyBudget={boardInfo[0].remainBudget}
        />
      </div>
      <div className='savings-board-function-bar'>
        <BoardFunctionBar 
          startDate={firstDate}
          endDate={secondDate}
          sendDataToParent={handleData}
          userID={current}
          boardID={boardID}
        />
      </div>
      <div className='savings-board-buckets'>
        {/* Map through cloned buckets array, creating a new bucket component for each bucket in the array */}
        { clonedBuckets.map((bucket) => {
          return <SavingsBoardBucket remainingBudget={bucket.cumulativeBudget} currentDay={bucket.currentDay} transactions={bucket.transactions} maxBudget={maxBudget}/>
        })}
      </div>
      <div className='savings-board-buckets-timeline' />
    </div>
  )
}

export default SavingsBoard;