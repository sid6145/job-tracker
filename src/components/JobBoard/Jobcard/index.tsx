import { Typography } from '@mui/material'
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
    const {title, company, sourceLink, id, column} = props

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType,
        item: { id, column },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    

  return (
      <div ref={drag as any} style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move'
      }} className='jobCardRoot'>
          <Typography>{title}</Typography>
          <Typography>{company}</Typography>
          <a target='blank' href={sourceLink}>Link</a>
      </div>
  )
}

export default Jobcard