import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
    mutation loginUser($email: String!, password: String!){
        loginUser(email: $email, password: $password) {
            token
            user{
                _id
                username
            }
        }
    }`;

export const ADD_USER = gql`
    mutation: addUser($username: String!, $email: email!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }`;

export const SAVE_BOOK = gql`
    mutation: saveBook($author: author, $description: description, $title: title, $bookId: bookId, $image: image, $link: link){
        saveBook(author: $author, description: $description, title: $title, bookId: $bookId, image: $image, link: $link){
            user{
                _id
                username
            }
        }
    }`;

export const REMOVE_BOOK = gql`
    mutation: removeBook($bookId: bookId){
        removeBook(bookId: $bookId){
            user{
                _id
                username
                email
                bookCount
                savedBooks{
                    author
                    description
                    title
                    bookId
                    image
                    link
                }
            }
        }

    }`;