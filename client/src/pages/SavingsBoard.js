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


  // takes in the number of days needed (7 for a week, 14 for two weeks, etc)
  // and loops through, mapping each day as a <key, value> pair
  function dateMap(firstDate, numDays, newData) {
    // create date map
    const dataMap = new Map();

    // loop until the numDays value is met
    for (var i = 0; i <= numDays; i++) {
      // create new temporary date to hold the starting date value
      const tempDate = new Date();
      
      // set the temporary date to current loop iteration
      // i.e. if tempDate is 4/1 before it's set, on the second loop
      // it'll be 4/1 + 1 days = 4/2, on the third loop it'll be
      // 4/1 + 2 days = 4/3, etc etc 
      tempDate.setDate(tempDate.getDate() + i);
      console.log("tempDate in current loop: ", tempDate);

      // convert tempDate into a string (easier to manipulate this way, especially
      // b/c the date is going to be the key in the <k,v> pair)
      var tempDateString = String(tempDate);
      console.log("tempDateString: ", tempDateString, "current loop: ", i);

      // create a substring of the tempDateString to cut off the time (since the 
      // time isn't needed for the day's bucket)
      var tempDateString = tempDateString.substring(0, 15);
      console.log("tempDateSubString: ", tempDateString, "current loop: ", i);
      
      // create the dateObject to be the value for a given day's bucket,
      // contains the remainingBudget, amount, currentDay (which is set to be the
      // tempDateString from line 73), and an empty array to hold transactions
      const dateObject = {
        remainingBudget: 0,
        amount: 0,
        currentDay: tempDateString,
        transactions: []
      }

      // set the <k,v> pair as key: tempDateString and value: dateObject
      dataMap.set(tempDateString, dateObject);
      console.log("------------------");
    }
    console.log("DATA MAP: ", dataMap);

    // return the dateMap to populate
    return dataMap;
  }


  // populateDateMap -- takes in the dateMap from before along with the newData array
  // and loops through each entry in newData to place it into the proper day's bucket
  function populateDateMap(dateMap, newData) {
    // slice off the last element of the newData array (since it's just the length)
    const newDataMinusOne = newData.slice(0, newData.length - 1);
    console.log("newData: ", newDataMinusOne);

    // loop through newDataMinusOne by entry
    newDataMinusOne.forEach((entry) => {
      console.log("current entry: ", entry);

      // pull out the createDate of current entry
      var currentEntryDate = entry.createDate;

      // turn the currentEntryDate into a new date object
      currentEntryDate = new Date(currentEntryDate);

      // convert the currentEntryDate back into a string and substring it
      // to create the key to look for in the dateMap
      var tempDateString = String(currentEntryDate).substring(0, 15);

      // use tempDateString to get the current value associated with
      // the tempDateString key inside of dateMap
      // i.e. currentEntryValue = {remainingBudget: X, amount: Y, currentDay: Z, transactions: []}
      var currentEntryValue = dateMap.get(tempDateString);
      console.log("CURRENT ENTRY VALUE: ",currentEntryValue);

      // calculate the currentAmountValue by pulling the remainingBudget value from
      // the currentEntryValue and adding it to the current loop's entry amount
      var currentAmountValue = currentEntryValue.remainingBudget + entry.amount;

      // get the transactions array from the currentEntryValue and push the entry
      // into the array
      var currentTransactionsValue = currentEntryValue.transactions;
      currentTransactionsValue.push(entry);

      // set the currentEntryValue's remainingBudget, transactions, and createDate to
      // what was calculated above
      currentEntryValue.remainingBudget = currentAmountValue;
      currentEntryValue.transactions = currentTransactionsValue;
      var currentEntryDate = entry.createDate;
      
      // set the tempDateString key with the currentEntryValue value
      dateMap.set(tempDateString, currentEntryValue);
      console.log("current map: ", dateMap);
    });
    console.log("FINAL MAP: ", dateMap);

    // return the dateMap to be used with the buckets
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


    // use dateMap function to createSortedDateMap
    const sortedDataMap = dateMap(firstDate, 7, newData);

    // use populateDateMap function to create the populatedDateMap
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

    // set buckets to be an array from the populatedDateMap
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
          <SavingsBoardBucket remainingBudget={bucket.remainingBudget} amount={bucket.amount} currentDay={bucket.currentDay} transactions={bucket.transactions} />
        ) }
      </div>
      <div className='savings-board-buckets-timeline' />
    </div>
  )
}

export default SavingsBoard
