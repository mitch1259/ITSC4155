import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, fabClasses } from "@mui/material"
import React from "react"
import {useState} from 'react'


export const MuiDialog = () =>{
    const [open, setOpen] = useState(false)
    return (
            <>
                <Button onClick={()=> setOpen(true)}>Open Dialog</Button>
                <Dialog 
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="dialog-title"
                    aria-describedby="dialog-description">
                    <DialogTitle id= 'dialog-title'> Submit the Test?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id ='dialog-description'> 
                            Are you sure you wanted to submit the test? You will not be able to edit after
                            Submitting
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions> 
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button autoFocus onClick={() => setOpen(false)}>Submit</Button>
                    </DialogActions>
                </Dialog>
        </>
    )
}