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

    const [age, setAge] = React.useState(10);

    const handleChange = (event) => {
      setAge(event.target.value);
      console.log(event.target.value);
    };

    const [category, setCat] = React.useState(0);
    const handleChangeCat = (event) => {
      setCat(event.target.value);
      console.log(event.target.value);
    };

    const select = () => {
        var ageHigh;
        if (age === 10) {
            //By week
        } else if (age === 20) {
            //By month
        } else if (age === 30) {
            //By year
        }

        Axios.get('http://localhost:3002/api/get/board/transactions', {
            params: {    
            lowEnd: 0,
            highEnd: 0,
            category: category
            }
        }).then((response) => {
          var data = Array.from(response.data);
          console.log(response);
        });
        console.log("effect logged")
      };

  return (
    <div className='board-function-bar-wrapper'>
        <div className='board-function-bar-left'>
            <p className='board-function-bar-weekof-wrapper'>
                <p className='board-function-bar-weekof'>Week of: </p> {props.startDate} - {props.endDate}  
            </p>
        </div>
        <div className='board-function-bar-right'>
            <AddTransactionButton />
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
                            <MenuItem value={10}>One week</MenuItem>
                            <MenuItem value={20}>Two weeks</MenuItem>
                            <MenuItem value={30}>One month</MenuItem>
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