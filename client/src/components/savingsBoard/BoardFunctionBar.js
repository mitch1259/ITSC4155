import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PlusIcon from '../../images/plus-icon-2-white.png';
import AddTransactionButton from './AddTransactionButton';
import '../../css/savingsBoard/boardFunctionBar.css';
import Axios from 'axios';
import Button from '@mui/material/Button';

function BoardFunctionBar(props) {

    const [age, setAge] = React.useState(1);
    const handleChange = (event) => {
      setAge(event.target.value);
      // console.log(event.target.value);

      //DO NO CHANGE THE DATE SET!!!!!!! WILL BREAK CATASTROPHICALLY IF NOT DONE LIKE THIS
      var increment = event.target.value*7;
      var x = new Date(startDate);
      x = new Date(x.setDate(startDate.getDate() + increment))
      setEnd(x);
      buttonUpdate(startDate, x);

      if (event.target.value === 1) {
        setHeader("Week of:");
      } else if (event.target.value === 2) {
        setHeader("Weeks of:");
      } else if (event.target.value === 4) {
        setHeader("Month of:");
      }
    };

    const [header, setHeader] = React.useState("Week of:");
    const [buttons] = React.useState(["<",">"]);

    const [category, setCat] = React.useState(0);
    const handleChangeCat = (event) => {
      setCat(event.target.value);
      // console.log(event.target.value);
    };

    const [startDate, setStart] = React.useState(props.startDate);
    const [endDate, setEnd] = React.useState(props.endDate);
    // console.log(startDate)
    // console.log(endDate)
    const [start, setStringStart] = React.useState(String(startDate).substring(4, 15));
    const [end, setStringEnd] = React.useState(String(endDate).substring(4, 15));

    const [data, setData] = React.useState('');

    //Calls the select method one time when the page loads
    React.useEffect(() => {
        select();
    }, []);

    const handleUpdate = () => {
      window.location.reload(true);
    }

    const select = () => {

        Axios.get('http://localhost:3002/api/get/board/transactions', {
            params: {  
            board: props.boardID, 
            lowEnd: startDate,
            highEnd: endDate,
            category: category
            }
        }).then((response) => {
          //Last values of data array is the new start date and time gap
          response.data.push(age*7);
          response.data.push(startDate);
          setData(Array.from(response.data));
          props.sendDataToParent(response.data);
        });
        // console.log("effect logged")
        buttonUpdate(startDate, endDate);
      };

      const next = () => {
        var interval = age*7;
        var y = endDate;
        setStart(y);
        var x = new Date(y);
        x = new Date(x.setDate(y.getDate() + interval))
        setEnd(x);
        buttonUpdate(y, x);
      }

      //DO NOT CHANGE ABOVE/BELOW DATE SETS !!!!!

      const prev = () => {
        var interval = age*7;
        var y = startDate;
        setEnd(y);
        var x = new Date(y);
        x = new Date(x.setDate(y.getDate() - interval))
        setStart(x);
        buttonUpdate(x, y);
      }

      const buttonUpdate = (start, end) => {
        setStringStart(String(start).substring(4, 15));
        setStringEnd(String(end).substring(4, 15));
      }

  return (
    <div className='board-function-bar-wrapper'>
        <div className='board-function-bar-left'>
        <AddTransactionButton sendDataToParent={(handleUpdate)} userID={props.userID} boardID={props.boardID}/>
            <p className='board-function-bar-weekof-wrapper'>
                {/*<p className='board-function-bar-weekof'>{header} </p> */}
                <p className='board-function-bar-viewby'>View by:</p>
                <Button variant="outlined" onClick={prev} id='nav-button'>
                    {buttons[0]}
                </Button>
                {start} - {end}
                <Button variant="outlined" onClick={next} id='nav-button'>
                    {buttons[1]}
                </Button>
            </p>
        </div>
        <div className='board-function-bar-right'>
            
            <Box sx={{ minWidth: 120 }} id="board-function-bar-dropdown">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Time</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="function-bar-select"
                            value={age}
                            label="Time"
                            onChange={handleChange}
                            >
                            <MenuItem value={1}>One week</MenuItem>
                            <MenuItem value={2}>Two weeks</MenuItem>
                            <MenuItem value={4}>Four weeks</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }} id="board-function-bar-dropdown">
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="function-bar-select"
                            value={category}
                            label="Category"
                            onChange={handleChangeCat}
                            >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={10}>Rent</MenuItem>
                            <MenuItem value={20}>Groceries</MenuItem>
                            <MenuItem value={30}>Entertainment</MenuItem>
                            <MenuItem value={40}>Other</MenuItem>
                            </Select>
                    </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }} id="submit-button-wrapper">
                    <FormControl fullWidth>
                        <Button variant="outlined" onClick={select} id='add-transaction-button'>
                            Search
                        </Button>
                </FormControl>
            </Box>
        </div>
    </div>
  )
}

export default BoardFunctionBar