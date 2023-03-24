import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../../css/savingsBoard/boardFunctionBar.css';

function Recurrent() {

    const [recurrence, setRec] = React.useState('');

    const handleRec = (event) => {
      setRec(event.target.value);
      console.log(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Recurrence</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={recurrence}
                    label="Recurrence"
                    onChange={handleRec}
                    >
                    <MenuItem value={10}>Once per week</MenuItem>
                    <MenuItem value={20}>Once per month</MenuItem>
                    <MenuItem value={30}>Once per year</MenuItem>
                    </Select>
        </FormControl>
    );
}

export default Recurrent