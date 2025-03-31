import { Typography } from '@mui/material';
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
        console.log("id::>",id)
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
                    backgroundColor: isOver ? '#f0f0f0' : 'transparent',
                    padding: '1rem',
                    minHeight: '200px'
                }}
            >
                <Typography>{column}</Typography>
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
        )
    }

    return (
        <div className='jobBoardRoot' style={{ display: 'flex', gap: '1rem' }}>
            {columns.map((item, index) => (
                <Column key={`col-${index}`} column={item} />
            ))}
        </div>
    )
}

export default JobBoard