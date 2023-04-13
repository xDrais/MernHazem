import {gql}  from '@apollo/client'

const getProjects = gql`

query getProjects($limit:Int){
    projects(limit:$limit)
        {
            id
            name
    description
    imageUrl
    projectCreator{
      firstName
      lastName
      email
    }
        }
        
    
}

`;

const getProject = gql`
    query getProject($id:ID){
        project(id:$id){
            id
            name
    description
    imageUrl
    projectCreator{
      firstName
      lastName
      email
    }
        }
        }
`;
const projectbyid = gql`
    query projectbyid($id:ID,$limit:Int,$page:Int){
        projectbyid(id:$id,limit:$limit,page:$page){
            totalCount
            data{
                id
            name
            description
            projectCreator{
            firstName
            lastName
            email
            }
            }
        }
    }
`;
export {getProject,getProjects,projectbyid}