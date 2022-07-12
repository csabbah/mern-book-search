import React from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

import { useMutation } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);

  const [deleteBook, { error }] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deleteBook({
        variables: { bookId },
      });

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
      document.getElementById(bookId).remove();
      let counterEl = document.getElementById('counter');
      let currentNum = parseInt(counterEl.innerText.split(' ')[1]);
      if (currentNum === 1) {
        return (counterEl.innerText = 'You have no saved books!');
      } else {
        counterEl.innerText = `Viewing ${currentNum - 1} saved ${
          currentNum === 1 ? 'book' : 'books'
        }`;
      }
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2 id="counter">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book, key) => {
            return (
              <Card key={key} id={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    sid="link"
                    href={book.link}
                  >
                    {book.link == null ? 'No link available' : 'Link to google'}
                  </a>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
        {error && <div>There was an issue viewing your books</div>}
      </Container>
    </>
  );
};

export default SavedBooks;
