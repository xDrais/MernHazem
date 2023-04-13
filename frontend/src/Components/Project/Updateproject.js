import React,{ useState} from 'react'
import { useMutation } from '@apollo/client'
import { Form ,Button,Container ,Col} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {update_Project} from '../../Mutation/projetMutation'
import { useParams, Link, useNavigate} from 'react-router-dom'

const Updateproject = () => {

    const [name,setName]=useState(()=>{return ""})
    const [description,setDescription]=useState("")
    const [imageUrl, setImageUrl] = useState("");
    const navigate=useNavigate()
    const {id} = useParams()
    console.log(id)
    const [updateProject] =useMutation(update_Project,{
        variables:{name,description,imageUrl,id}
    })

    const getallprojects=()=>{
        navigate('/projects')
    }
   const submitHandler=async(e)=>{
    e.preventDefault();
        console.log("============="+imageUrl)
    updateProject(name,description,imageUrl,id)
  }


  return (
 <>
    <div className='py-5'
    style={{marginTop:"50px"}}>
    <Button variant='info' 
      className='btn-sm ' 
      onClick={() => {getallprojects()}}
      > Back
       <i class="fa-sharp fa-solid fa-arrow-left"></i>
      </Button>
    </div>
      

    
       <center><h3 className="py-5">Update Project</h3></center>
      <Col md={6} style={{float:'right',marginRight:'450px'}}>
      <Form  onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <Form.Label>
                   name
                </Form.Label>
                <Form.Control
                 type="name"
                 placeholder="name"
                 minLength={8}
                 value={name}
                 onChange={(e)=>
                    setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>
                   description
                </Form.Label>
                <Form.Control
                 type="description"
                 placeholder="description"
                 minLength={8}
                 value={description}
                 onChange={(e)=>
                    setDescription(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="imageUrl">
                <Form.Label>
                   imageUrl
                </Form.Label>
                <Form.Control
                type="file"
                name="imageUrl"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => setImageUrl(e.target.files[0].name)}
                 >
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" >Submit</Button>
        </Form>
      </Col>
    </>  )
}

export default Updateproject