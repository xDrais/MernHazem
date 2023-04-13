import {gql}  from '@apollo/client'

const add_Project = gql`

mutation addProject($name : String! , $description:String! ,$imageUrl:String!, $projectCreator: ID! ){
    addproject(name:$name  , description:$description ,imageUrl:$imageUrl, projectCreator:$projectCreator )
        {
            id
            name
    description
    imageUrl
    projectCreator{
     id
    }
        }      
}

`;


const update_Project = gql`

mutation updateProject($name : String! , $description:String! ,$imageUrl:String!, $id: ID! ){
  updateproject(name:$name  , description:$description ,imageUrl:$imageUrl, id:$id ){
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


const delete_Project = gql`

mutation deleteProject( $id: ID! ){
  deleteproject( id:$id ){
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

export {add_Project,update_Project,delete_Project}