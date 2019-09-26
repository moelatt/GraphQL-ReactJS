const express = require('express');
const graphql_http = require('express-graphql');
const schema_file = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allow cross-orign requests
app.use(cors());
// connect to mongoDB database
mongoose.connect('mongodb+srv://@mydatabase-jpjpq.mongodb.net/graphql?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Connect to MongoDB database');
})
//  same as above
// mongoose.connection.once('open', ()=>{
//     console.log('Connect to MongoDB database')
// })




// bind express with graphql
app.use('/graphql', graphql_http({
    schema: schema_file,
    graphiql: true
}));

app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});
