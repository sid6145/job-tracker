import { Button, Card, CardActions, CardContent, Tooltip, Typography } from '@mui/material'
import './job-card.css'
import { useDrag } from 'react-dnd'
import { useAppDispatch } from '../../../hooks'
import { deleteJob } from '../../../mainSlice'

type JobcardProps = {
    title: string,
    company: string,
    sourceLink: string,
    id: string,
    column: string
}

const ItemType = 'JOBCARD'

const Jobcard = (props: JobcardProps) => {
    const { title, company, sourceLink, id, column } = props

    const dispatch = useAppDispatch()

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType,
        item: { id, column },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const handleDelete = (id: string) => {
        dispatch(deleteJob(id))
    }


    return (
        <Card
            ref={drag as any}
            elevation={3}
            style={{ backgroundColor: isDragging ? 'red' : '' }}
            className='cardRoot'
        >
            <Tooltip placement='top' title="Click and hold to drag">
                <CardContent sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: '150px',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                }}>
                    <Typography align='left' variant='h5'>
                        {title}
                    </Typography>
                    <Typography align='left' variant='h6' color="text.secondary">
                        {company}
                    </Typography>
                </CardContent>
            </Tooltip>
            <CardActions>
                <Button href={sourceLink} target='_blank' variant='contained' sx={{
                    background: '#4CAF50', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255, 255, 255, 0.35)'
                }}>
                    View Job
                </Button>
                <Button onClick={() => handleDelete(id)} variant='contained' sx={{
                    background: '#E64A19', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255, 255, 255, 0.35)'
                }}>
                    Delete Job
                </Button>
            </CardActions>
        </Card>
    )
}

export default Jobcard