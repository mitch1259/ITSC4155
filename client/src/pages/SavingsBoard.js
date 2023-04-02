import React from 'react'
import SavingsBoardBucket from '../components/savingsBoard/SavingsBoardBucket';
import BoardHeader from '../components/savingsBoard/BoardHeader.js';
import BoardFunctionBar from '../components/savingsBoard/BoardFunctionBar';
import '../css/savingsBoard/savingsBoard.css';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';
import AuthContext from '../context/AuthProvider';
import Axios from 'axios';
import { useEffect } from 'react';



document.title = "Savings Board";


function SavingsBoard() {
  var current = DecryptFromLocalStorage("userId");
  const [currentBoard, setCurrentBoard] = React.useState('');

  useEffect(() => {
    Axios.post('http://localhost:3002/api/get/currentBoard', {userID: current}
    ).then((response) => {
      console.log(response.data);
      setCurrentBoard(response.data[0].boardID);
    })
  })


  const firstDate = new Date();

  //DO NO CHANGE THE DATE SET!!!!!!! WILL BREAK IF NOT DONE LIKE THIS
  var secondDate = new Date();
  secondDate = new Date(secondDate.setDate(firstDate.getDate() + 7));

  const { auth, setAuth} = React.useContext(AuthContext);
  

  const [data, setData] = React.useState('');
  const handleData = (dataFromChild) => {
    setData(dataFromChild);
    console.log(dataFromChild);

    updateBuckets(dataFromChild);
  }

  const dummyEndDate = new Date("2023-04-09");


  const [remBudget, setBudget] = React.useState(0);
  const [buckets, setBuckets] = React.useState([{}]);

  function dateMap(firstDate, numDays, newData) {
    const dataMap = new Map();
    for (var i = 0; i <= numDays; i++) {
      const tempDate = new Date();
      
      tempDate.setDate(tempDate.getDate() + i);
      console.log("tempDate in current loop: ", tempDate);


      var tempDateString = String(tempDate);
      console.log("tempDateString: ", tempDateString, "current loop: ", i);
      var tempDateString = tempDateString.substring(0, 15);
      console.log("tempDateSubString: ", tempDateString, "current loop: ", i);
      // var tempDateActualDate = new Date(tempDateString);
      // console.log("tempDateActualDate: ", tempDateActualDate, "current loop: ", i);
      const dateObject = {
        remainingBudget: 0,
        amount: 0,
        currentDay: tempDateString,
        transactions: []
      }
      dataMap.set(tempDateString, dateObject);
      console.log("------------------");
    }
    console.log("DATA MAP: ", dataMap);
    return dataMap;
  }

  function populateDateMap(dateMap, newData) {
    const newDataMinusOne = newData.slice(0, newData.length - 1);
    console.log("newData: ", newDataMinusOne);
    newDataMinusOne.forEach((entry) => {
      console.log("current entry: ", entry);
      var currentEntryDate = entry.createDate;
      currentEntryDate = new Date(currentEntryDate);
      var tempDateString = String(currentEntryDate).substring(0, 15);
      // var finalDate = new Date(tempDateString);
      // console.log("final date: ", finalDate);
      var currentEntryValue = dateMap.get(tempDateString);
      console.log("CURRENT ENTRY VALUE: ",currentEntryValue);
      var currentAmountValue = currentEntryValue.remainingBudget + entry.amount;
      var currentTransactionsValue = currentEntryValue.transactions;
      currentTransactionsValue.push(entry);
      currentEntryValue.remainingBudget = currentAmountValue;
      currentEntryValue.transactions = currentTransactionsValue;
      var currentEntryDate = entry.createDate;
      // var currentEntryTransaction = entry.
      dateMap.set(tempDateString, currentEntryValue);
      console.log("current map: ", dateMap);
    });
    console.log("FINAL MAP: ", dateMap);
    return dateMap;
  }


  const updateBuckets = (newData) => {
    
    var tempArr = [];
    var tempBudget = remBudget;
    var oldmm = -1;
    var olddd = -1;
    var index = -1;
    var j = 0;
    var count = 0;
    var countArr = [];



    const sortedDataMap = dateMap(firstDate, 7, newData);
    const populatedDateMap = populateDateMap(sortedDataMap, newData);


    // console.log("newData: ", newData);
    // console.log("newData.length: ", newData.length);

    // var tempDate = newData[0].createDate;
    // var startingBudget = 800;
    // setBudget(startingBudget);
    // newData.forEach((entry) => {
    //   console.log("remaining budget: ", remBudget);
    //   // console.log("current entry date: ", entry.createDate)
    //   // if (entry.createDate > tempDate) {
    //   //   tempDate = entry.createDate;
    //   // }
    //   console.log("current entry: ", entry);
    //   console.log(startingBudget - entry.amount)
    //   setBudget(remBudget - entry.amount);
    // });


    
    // for (let i = 0; i < newData.length - 1; i ++) {  
    //   var date = (newData[i].createDate).substring(0, 10);
    //   date = new Date(date);
    //   date.setDate(date.getDate() + 1)
    //   var mm = date.getMonth() + 1;
    //   var dd = date.getDate();
      
    //   tempBudget = tempBudget + newData[i].amount;
    //   // console.log(tempBudget);

    //   if (mm === oldmm && dd === olddd) {
    //     count = count + newData[i].amount;
    //     countArr.push(newData[i]);
    //     tempArr[index] = ({
    //     "remainingBudget": newData[j].amount + count,
    //     "currentDay": mm + "/" + dd,
    //     "transactions": countArr
    //     })
    //   } else {
    //     countArr = [newData[i]]
    //     tempArr.push({
    //     "remainingBudget": newData[i].amount,
    //     "currentDay": mm + "/" + dd,
    //     "transactions" : countArr
    //   })
    //   count = 0;
    //   index = tempArr.length - 1;
    //   j = i;
    //   // console.log("index: ", index);
    //   // console.log("temparr: ", tempArr);
    // }
    // oldmm = mm;
    // olddd = dd;
    // }
    // console.log(populatedDateMap.values());
    // setBuckets(Array.from(populatedDateMap.values()));
    setBuckets(Array.from(populatedDateMap.values()));
    // setBudget(tempBudget);
  }

  console.log("buckets: ", buckets);
  // console.log("remaining budget: ", remBudget);

  return (
    <div className='savings-board-wrapper'>
      <div className='savings-board-header-wrapper'>
        <BoardHeader 
          boardTitle="Example Board 1"
          boardDescription="This is a sample description for a savings board."
          // remainingBudget={remBudget}
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
