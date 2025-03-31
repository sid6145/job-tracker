import './App.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField, Typography } from '@mui/material'
import JobBoard from './components/JobBoard'
import { useState } from 'react'
import { useAppDispatch } from './hooks'
import { addJob, clearBoard } from './mainSlice'

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
  const [error, setError] = useState('')

  const dispatch = useAppDispatch()

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(performance.now())}`;
  };

  const onClickAdd = () => {
    if(!jobformData.jobTitle && !jobformData.company && !jobformData.sourceLink) {
      setError("All fields cannot be empty") 
      return
    }
    dispatch(addJob(jobformData))
    setJobFormData(initialState)
    setOpen(false)
    setError('')
  }

  const handleChange = (e: any) => {
    const value = e.target.value
    const name = e.target.name

    setJobFormData((prev) => ({
      ...prev,
      [name]: value,
      col: 'applied',
      id: generateUniqueId()
    }))
  }

  return (
    <>
    <div className='appRoot'>
      <Typography className='appTitle'>Job Tracker</Typography>
      <div style={{position: 'relative'}}>
        <JobBoard />
        <Fab onClick={() => setOpen(true)} className='addNewJobBtn' color='primary' variant='extended'>Add Job</Fab>
        <Fab onClick={() => dispatch(clearBoard())} className='clearJobsBtn' color='primary' variant='extended'>Clear Board</Fab>
      </div>


      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{error ? error : 'Add Job Details'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Job Title" margin="dense" name='jobTitle' onChange={handleChange}/>
          <TextField fullWidth label="Company" margin="dense" name='company' onChange={handleChange}/>
          <TextField fullWidth label="Source Link" margin="dense" name='sourceLink' onChange={handleChange}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpen(false)
            setError('')  
          }}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={onClickAdd}>
            Add Job
          </Button>
        </DialogActions>
      </Dialog>

    </div>
      <footer className='footer'><Typography fontSize={15} variant='caption'>©{new Date().getFullYear()} Siddhant Deshmukh. All rights reserved.</Typography></footer>
    </>
  )
}

export default App
