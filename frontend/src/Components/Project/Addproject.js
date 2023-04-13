import React,{ useState} from 'react'
import { useMutation } from '@apollo/client'
import { Form ,Button,Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {add_Project} from '../../Mutation/projetMutation'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Addproject = () => {

    const [name,setName]=useState(()=>{return ""})
    const [description,setDescription]=useState("")
    const [imageUrl, setImageUrl] = useState("");
    
    
    const userLogin =useSelector(state =>state.userLogin)
    const {userInfo} =userLogin
    const projectCreator =userInfo._id
    const [addProject] =useMutation(add_Project,{
        variables:{name,description,imageUrl,projectCreator}
    })


    const navigate=useNavigate()

    
    const imageupload=async(e)=>{
      e.preventDefault();

      const image=  e.target.files[0]

      const formdata = new FormData();
      formdata.append('imageUrl',image)

      try {
        const config = {
          Headers:{
            'Content-Type':'multipart/form-data'
          }
        }
        const {data} = await axios.post(`http://localhost:5000/image`, formdata,config );
        console.log(data)
        setImageUrl(data.message)
        console.log(imageUrl)

      } catch (error) {
        console.error(error);
      }
    }
      
    const getallprojects=()=>{
      navigate('/projects')
  }
   const submitHandler=async(e)=>{
        e.preventDefault();
        console.log(imageUrl)

        addProject(name,description,imageUrl,projectCreator)
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
      

    
       <center><h3 className="py-5">ADD Project</h3></center>
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
                onChange={imageupload}  
                 >
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" >Submit</Button>
        </Form>
      </Col>
    </> 
  )
}

export default Addproject





