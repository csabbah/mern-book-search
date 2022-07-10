import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
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
`;
