import { Paper, Typography } from '@mui/material';
import './job-board.css'
import { useAppSelector, useAppDispatch } from '../../hooks';
import Jobcard from './Jobcard';
import { useDrop } from 'react-dnd'
import { updateJobColumn } from '../../mainSlice';

const ItemType = 'JOBCARD'

const JobBoard = () => {
    const columns = ["Applied", "Interview", "Offer", "Rejected"];
    const jobs = useAppSelector(state => state.job.jobs)
    const dispatch = useAppDispatch()

    const moveJob = (id: string, toColumn: string) => {
        dispatch(updateJobColumn({ id, column: toColumn.toLowerCase() }))
    }

    const Column = ({ column }: { column: string }) => {
        const [{ isOver }, drop] = useDrop(() => ({
            accept: ItemType,
            drop: (item: { id: string }) => moveJob(item.id, column),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }))

        return (
            <div
                ref={drop as any}   
                style={{
                    backgroundColor: isOver ? 'rgba(255, 255, 255, 0.56)' : 'transparent',
                    padding: '1rem',
                    position: 'relative'
                }}
            >
                <Typography sx={{fontWeight: 'bold'}} variant='h6' className='columnHeading'>{column}</Typography>
                <div className='jobContainer'>
                    {jobs.map((job, index) => {
                        if (job.col === column.toLowerCase()) {
                            return (
                                <Jobcard
                                    key={`job-${index}`}
                                    id={job.id}
                                    title={job.jobTitle}
                                    company={job.company}
                                    sourceLink={job.sourceLink}
                                    column={column.toLowerCase()}
                                />
                            )
                        }
                        return null
                    })}
                </div>
            </div>
        )
    }

    if(!jobs.length) {
        return <Paper className='jobBoardRoot' elevation={10}>
            <Typography variant='h5' alignSelf={'center'} sx={{margin: 'auto'}}>Add a job to showcase it on the board.</Typography>
        </Paper>
    }

    return (
        <Paper elevation={4} className='jobBoardRoot' style={{display: 'flex', gap: '1rem' }}>
            {columns.map((item, index) => (
                <Column key={`col-${index}`} column={item} />
            ))}
        </Paper>
    )
}

export default JobBoard