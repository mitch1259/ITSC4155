import React from 'react'
import SavingsBoardBucket from '../components/savingsBoard/SavingsBoardBucket';
import BoardHeader from '../components/savingsBoard/BoardHeader.js';
import BoardFunctionBar from '../components/savingsBoard/BoardFunctionBar';
import '../css/savingsBoard/savingsBoard.css';
import DecryptFromLocalStorage from '../context/encryption/DecryptFromLocalStorage';
import AuthContext from '../context/AuthProvider';
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
    console.log(dataFromChild);

    //updateBuckets(dataFromChild);
    updateBudget(dataFromChild);
  }

  const [title, setTitle] = React.useState("");
  const [description, setDesc] = React.useState("");
  const [remBudget, setBudget] = React.useState(0);
  const updateBudget = (dataFromChild) => {
    Axios.get('http://localhost:3002/api/get/board/budget', {
      params: {id: 1 }
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
    var tempBudget = newData[newData.length - 1];
    var oldmm = -1;
    var olddd = -1;
    var index = -1;
    var j = 0;
    var count = 0;
    var countArr = [];
    
    for (let i = 0; i < newData.length - 3; i ++) {  
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


    // Below inserts empty values for empty dates

    var startDate = newData[newData.length - 2];
    var date = new Date(startDate);
    //date.setDate(date.getDate() + 1);
    console.log(date);
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

    

    setBuckets(tempArr);
    setBudget(tempBudget);
    console.log(tempArr);
  }

  console.log("buckets: ", buckets);
  console.log("remaining budget: ", remBudget);

  return (
    <div className='savings-board-wrapper'>
      <div className='savings-board-header-wrapper'>
        <BoardHeader 
          boardTitle={title}
          boardDescription={description}
          remainingBudget={remBudget}
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
