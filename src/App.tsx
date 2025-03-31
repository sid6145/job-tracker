import './App.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField, Typography } from '@mui/material'
import JobBoard from './components/JobBoard'
import { useState } from 'react'
import { useAppDispatch } from './hooks'
import { addJob } from './mainSlice'

function App() {

  const initialState = {
    jobTitle: '',
    company: '',
    sourceLink: '',
    col: 'applied',
    id: ''
  }

  const [open, setOpen] = useState(false)
  const [jobformData, setJobFormData] = useState(initialState)

  const dispatch = useAppDispatch()

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(performance.now())}`;
  };

  const onClickAdd = () => {
    dispatch(addJob(jobformData))
    setJobFormData(initialState)
    setOpen(false)
  }

  const handleChange = (e: any) => {
    const value = e.target.value
    const name = e.target.name

    setJobFormData((prev) => ({
      ...prev,
      [name]: value,
      col: 'interview',
      id: generateUniqueId()
    }))
  }

  return (
    <div className='appRoot'>
      <Typography className='appTitle'>Job Tracker</Typography>
      <JobBoard />
      <Fab onClick={() => setOpen(true)} className='addNewJobBtn' color='primary' variant='extended'>Add Job</Fab>


      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add a New Job</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Job Title" margin="dense" name='jobTitle' onChange={handleChange}/>
          <TextField fullWidth label="Company" margin="dense" name='company' onChange={handleChange}/>
          <TextField fullWidth label="Source Link" margin="dense" name='sourceLink' onChange={handleChange}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={onClickAdd}>
            Add Job
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default App
