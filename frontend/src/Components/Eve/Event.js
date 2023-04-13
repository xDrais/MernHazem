import {useQuery} from '@apollo/client'
import  {getEvent} from '../../Query/eventQuerry'

const Event = () => {

    const eventid = "641fd4a7d28610797d479b4b"
    const {loading,error,data} = useQuery(getEvent,{variables:{id:eventid}})
  return (
    <>

    <div>Event</div>
    <div>
        <h1>{data?.event.name} </h1> 
        <h1>{data?.event.description} </h1> 
        <h1>{data?.event.eventCreator.firstName} </h1> 

     </div>
    </>  )
}

export default Event