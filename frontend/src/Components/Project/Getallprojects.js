import {useQuery,useMutation} from '@apollo/client'
import  {getProjects,projectbyid} from '../../Query/projectQuery'
import { delete_Project } from '../../Mutation/projetMutation';
import { useNavigate } from 'react-router-dom';
import {Button,Table,Pagination} from 'react-bootstrap'
import  Loader  from '../Loader'
import  Message  from '../Message'
import './Projectsss.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Getallprojects = () => {
  const [limit,setLimit]=useState(1)
  const userLogin =useSelector(state =>state.userLogin)
  const {userInfo} =userLogin
  const id= userInfo._id
  const page=2
  const {loading,error,data} = useQuery(projectbyid,{variables:{
    id,limit:parseInt(limit),page
  }})

  const pages= Math.ceil(data?.projectbyid.totalCount / page)
  console.log(pages)
  const navigate = useNavigate();
    const [deleteProject] =useMutation(delete_Project
  )
    const deleteproj=(id)=>{
      if (window.confirm('Are you sure')) {
      deleteProject({
        variables: { id: id },
      })

    }
    }
    const next=()=>{
      if(limit<pages){
      setLimit((p)=>p+1)
      console.log(limit)
      }
    }
    const back=()=>{
      if (limit>1){
      setLimit((p)=>p-1)
      console.log(limit)
    }
  }

   const gotoupdate=(id)=>{
    navigate(`/updateproject/${id}`)
   }
   const addproject=()=>{
    navigate(`/addproject`)
   }

  return (
    <>
    <h1 className='py-5'>Project</h1>
   
    {loading ? <Loader></Loader> : error ? <Message>{error}</Message>:(
      <>
      <Button variant='success' 
      className='btn-sm offset-10' 
      onClick={() => {addproject()}}
      > add
       <i class="fa-sharp fa-solid fa-plus"></i>
      </Button>
         <Table striped bordered hover responsive className='table-sm'>
 
         <thead>
             <tr>
                 <th>Name</th>
                 <th>Description</th>   
             </tr>
         </thead >
         <tbody>
         {data?.projectbyid.data.map(project => (
             <tr key={project.id}>
             <td>{project.name}</td>
             <td>{project.description}</td>
          
             <td>
                 <div >
                 <Button variant='light' className='btn-sm' onClick={() => {gotoupdate(project.id)}}>
                         <i className='fas fa-edit'></i>
                     </Button>
                 </div>
                 <Button variant='danger' 
                     className='btn-sm' 
                     onClick={() => {deleteproj(project.id)}}
                     >
                      <i className='fas fa-trash'></i>
                     </Button>
                     
             </td>

             </tr>
         ))}
         

         </tbody>
     </Table>
     <Pagination className='offset-10'>
     <Pagination.Prev  onClick={back}/>
     {Array.from(Array(pages),(e,i)=>{
       return <Pagination.Item  onClick={() => setLimit(i+1)}>{i+1}</Pagination.Item>
     })}
     <Pagination.Next onClick={next} />
     </Pagination>
     </>
    )}

    </>
  )
}

export default Getallprojects





