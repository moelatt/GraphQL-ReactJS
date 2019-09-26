import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// Components folder(BookList.js)
import BookList from './components/BookList';
import AddBook from './components/AddBook'

// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})
function App() {
  return (
    <ApolloProvider client = {client}>
      <div id="main">
        <h1>Reading list</h1>
        <BookList></BookList>
        <AddBook></AddBook>
      </div>
    </ApolloProvider>
  );
}

export default App;
