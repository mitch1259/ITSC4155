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
      console.log(event.target.value);

      //DO NO CHANGE THE DATE SETS!!!!!!! WILL BREAK CATASTROPHICALLY IF NOT DONE LIKE THIS
      if (event.target.value === 1) {
        var x = new Date();
        setEnd(new Date(x.setDate(startDate.getDate() + 7)));
      } else if (event.target.value === 2) {
        var x = new Date();
        setEnd(new Date(x.setDate(startDate.getDate() + 14)));
      } else if (event.target.value === 4) {
        var x = new Date();
        setEnd(new Date(x.setDate(startDate.getDate() + 28)));
      }
    };

    const [header, setHeader] = React.useState("Week of:");

    const [category, setCat] = React.useState(0);
    const handleChangeCat = (event) => {
      setCat(event.target.value);
      console.log(event.target.value);
    };

    const [startDate, setStart] = React.useState(props.startDate);
    const [endDate, setEnd] = React.useState(props.endDate);
    console.log(endDate)
    const [start, setStringStart] = React.useState(String(startDate).substring(4, 15));
    const [end, setStringEnd] = React.useState(String(endDate).substring(4, 15));

    const [data, setData] = React.useState('');

    //Calls the select method one time when the page loads
    React.useEffect(() => {
        select();
    }, []);

    const handleUpdate = () => {
        select();
    }

    const select = () => {

        Axios.get('http://localhost:3002/api/get/board/transactions', {
            params: {  
            user: 1, 
            board: 1, 
            lowEnd: startDate,
            highEnd: endDate,
            category: category
            }
        }).then((response) => {
          //Last value of data array is the new end date
          response.data.push(age*7);
          setData(Array.from(response.data));
          props.sendDataToParent(response.data);
          if (age === 1) {
            setHeader("Week of:");
          } else if (age === 2) {
            setHeader("Two weeks of:");
          } else if (age === 4) {
            setHeader("Month of:");
          }
        });
        console.log("effect logged")
        setStringStart(String(startDate).substring(4, 15));
        setStringEnd(String(endDate).substring(4, 15));
      };

  return (
    <div className='board-function-bar-wrapper'>
        <div className='board-function-bar-left'>
            <p className='board-function-bar-weekof-wrapper'>
                <p className='board-function-bar-weekof'>{header} </p> {start} - {end}  
            </p>
        </div>
        <div className='board-function-bar-right'>
            <AddTransactionButton sendDataToParent={(handleUpdate)}/>
            <p className='board-function-bar-viewby'>View by:</p>
            
            <Box sx={{ minWidth: 120 }} id="board-function-bar-dropdown">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Time</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Time"
                            onChange={handleChange}
                            >
                            <MenuItem value={1}>One week</MenuItem>
                            <MenuItem value={2}>Two weeks</MenuItem>
                            <MenuItem value={4}>One month</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }} id="board-function-bar-dropdown">
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChangeCat}
                            >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={10}>Category One</MenuItem>
                            <MenuItem value={20}>Category Two</MenuItem>
                            <MenuItem value={30}>Category Three</MenuItem>
                            <MenuItem value={40}>Category Four</MenuItem>
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