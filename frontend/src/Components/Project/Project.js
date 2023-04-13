import {useQuery} from '@apollo/client'
import  {getProject} from '../../Query/projectQuery'

const Project = () => {
  
    const projectid = "6422352edc12460f0e0b22d1"
    const {loading,error,data} = useQuery(getProject,{variables:{id:projectid}})


  return (
    <>

    <div>Project</div>
    <div>
        <h1>{data?.project.name} </h1> 
        <h1>{data?.project.description} </h1> 
        <h1>{data?.project.projectCreator.firstName} </h1> 

     </div>
    </>
  )
}

export default Project