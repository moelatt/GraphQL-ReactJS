import React, { Component } from 'react';
import{graphql} from 'react-apollo';
import { grapBookQuery} from '../queries/queries'

class BookDetails extends Component {
    displayBookDetails(){
        // const{book} = this.props.data;
        // variable same as above ES6
        const bookData = this.props.data.book;
        if(bookData){
            return(
                <div>
                    <h2>{bookData.name}</h2>
                    <p>{bookData.genre}</p>
                    <p>{bookData.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className = 'other-books'>
                        {bookData.author.books.map(item =>{
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )
        }
        else{
            return(
                <div>No Book selected</div>
            )
        }
    }
    render() { 
        return (
            <div id="book-details">
                
                {this.displayBookDetails()}
            </div>
          );
    }
}
 
export default graphql(grapBookQuery,{
    options: (props) =>{
        return{
            variables:{
                id: props.bookId
            }
        }
    }
})(BookDetails);