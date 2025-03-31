import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import './job-card.css'
import { useDrag } from 'react-dnd'

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

    const [drag] = useDrag(() => ({
        type: ItemType,
        item: { id, column },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))



    return (
        <Card
            ref={drag as any}
            elevation={3}
            className='cardRoot'
        >
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
                <Typography align='left' variant="body2" color="text.secondary">
                    {company}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={sourceLink} target='_blank' variant='contained' color="primary">
                    View Job
                </Button>
                <Button href={sourceLink} target='_blank' variant='outlined' color="primary">
                    Delete Job
                </Button>
            </CardActions>
        </Card>
    )
}

export default Jobcard