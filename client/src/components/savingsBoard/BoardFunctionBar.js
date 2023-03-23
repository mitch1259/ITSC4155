import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PlusIcon from '../../images/plus-icon-2-white.png';
import AddTransactionButton from './AddTransactionButton';
import '../../css/savingsBoard/boardFunctionBar.css';

function BoardFunctionBar(props) {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const [category, setCat] = React.useState('');

    const handleChangeCat = (event) => {
      setCat(event.target.value);
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
                            <MenuItem value={10}>Category One</MenuItem>
                            <MenuItem value={20}>Category Two</MenuItem>
                            <MenuItem value={30}>Category Three</MenuItem>
                            <MenuItem value={40}>Category Four</MenuItem>
                            </Select>
                </FormControl>
            </Box>
        </div>
    </div>
  )
}

export default BoardFunctionBar