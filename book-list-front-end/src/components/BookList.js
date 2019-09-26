import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries'

// Components
import BookDetails from './BookDetails';


// const getBooksQuery = gql `
// {
//     books{
//         name
//         id
//     }
// }`;


class BookList extends Component{
    constructor(props){
        super(props);
        this.state = {
            seleted: null
        }
    }
    displayBook(){
        var data = this.props.data;
        if(data.loading){
            return <div>Loading Books ...</div>
        }
        else{
            return data.books.map(book => {
                return(
                    <li key = {book.id} onClick={(e)=>{this.setState({seleted: book.id})}}>{book.name}</li>
                );
            })
        }
    }
    getCSS = ()=>{
        return{
            cursor: "pointer",
            paddingBottom: "1rem",
        }
    }
    render(){
        // console.log(this.props)
        return(
            <div>
                <ul id = "book-list" style = {this.getCSS()}>
                    {this.displayBook()}
                </ul>
                <BookDetails bookId = {this.state.seleted}></BookDetails>
            </div>
        )
    }
}
export default graphql(getBooksQuery)(BookList);