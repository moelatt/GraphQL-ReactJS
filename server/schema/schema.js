const buildSchema = require('graphql');
const lodash = require("lodash");

const Book = require('../models/book');
const Author = require('../models/author');

const { 
        GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
        } = buildSchema;

// // dummy data
// var books = [
//     {name: "The Hero of Ages", genre: 'Fantasy', id: '4', authorId: '2'},
//     {name: "The cloud of Magic", genre: 'Fantasy', id: '5', authorId: '3'},
//     {name: "The Light Fantas", genre: 'Fantasy', id: '6', authorId: '3'},
// ]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        // get the author information
        author: {
            type: AuthorType,
            resolve(parent, args){
                // return lodash.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        // get the all book information that author wrote
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return lodash.filter(books, {authorId: parent.id});
                return Book.find({authorId: parent.id})
            }
        }
    })
})
const ProducerType = new GraphQLObjectType({
    name: 'Producer',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        publishDate: {type: GraphQLInt},

        // showing book information
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({authorId: parent.id})
            }
        },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { 
                id: { type: GraphQLID } 
            },
            resolve(parent, args){
                // code to get data from db / other source
                // return lodash.find(books,{id:args.id});
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                // return lodash.find(authors, {id: args.id})
                return Author.findById(args.id)
            }
        },
        // get all the books info
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books;
                return Book.find({})
            }
        },
        // get all the author information
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors;
                return Author.find({})
            }
        }
    }
});

// input data in graphQL and save the data in DataBase 
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add author to data-base
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                
               return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                genre: { type: new GraphQLNonNull(GraphQLString)},
                authorId: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save();
            }
        },
        // addProducer: {
        //     type: ProducerType,
        //     args: {
        //         name: {type: new GraphQLNonNull(GraphQLString)},
        //         publishDate: {type: new GraphQLNonNull(GraphQLString)}
        //     },
        //     resolve(parent, args){
        //         let producer = new ProducerType({
        //             name: args.name
        //         })
        //     }
        // }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


// add the book or author in GraphQL
// mutation{
// 	addBook(name: "Love the Way You Lie", genre: "Fantasy", authorId: "5d7c36647d3f8bfed5260bf7"){
//     name
//     genre
//   }
// }
// mutation{
// 	addAuthor(name: "Jame BLue", age: 39){
//     name 
//     age
//   }
// }