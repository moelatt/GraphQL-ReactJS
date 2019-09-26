import {gql} from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }`;

const getBooksQuery = gql `
{
    books{
        name
        id
    }
}`;

// add the data to graphQL
const addBookMutation = gql`
    mutation($name: String!, $genre:String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`
// get book query
const grapBookQuery = gql `
    query($id: ID){
        book(id: $id){
            id 
            name
            genre
            author{
                id
                name
                age
                books{
                    name 
                    id
                }
            }
        }
    }
`

export{getAuthorsQuery, getBooksQuery, addBookMutation, grapBookQuery};