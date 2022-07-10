import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
        author: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    )
  {
    saveBook(author: $author, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
        author: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      me {
      _id
      username
      email
      savedBooks {
        _id
        bookId: String
        author: [String]
        title: String
        description: String
        image: String
        link: String
      }
      
    }
    }
  }
`;
