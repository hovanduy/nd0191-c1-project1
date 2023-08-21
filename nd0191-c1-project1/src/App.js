import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

const bookAction = [
  { key: 'currentlyReading', name: 'Currently Reading' },
  { key: 'wantToRead', name: 'Want to Read' },
  { key: 'read', name: 'Read' }
];

function MyApp() {
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll()
      .then(books => {
        setBooks(books)
      }); 
    return () => true;
  }, [])

  const moveBook = (selectedBook, shelf) => {
    BooksAPI.update(selectedBook, shelf).then((res) => {
      selectedBook.shelf = shelf;
      const newBooks = books.filter((b) => {
        return b.id !== selectedBook.id;
      }).concat([selectedBook]);
      setBooks(newBooks);
    });
  }

  const searchForBooks = debounce(200, false, query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(results => {
        if (results.error) {
          setSearchBooks({ searchBooks: [] });
        } else {
          let foundBooks = results.map((foundBook) => {
            let bookExist = books.find(book => book.id === foundBook.id);
            if (bookExist) {
              return bookExist;
            }
            else {
              return foundBook;
            }
          });
          return setSearchBooks(foundBooks);
        }
      });
    } else {
      setSearchBooks ([]);
    }
  });

  const resetSearch = () => {
    setSearchBooks([]);
  };

  return (
    <div className="app">
      <Route
        exact
        path="/"
        render={() => (
          <ListBooks bookAction={bookAction} books={books} onMove={moveBook}/>
        )}
      />
      <Route
        path="/search"
        render={() => (
          <SearchBooks searchBooks={searchBooks} myBooks={books} onSearch={searchForBooks} onMove={moveBook}
            onResetSearch={resetSearch}/>
        )}
      />
    </div>
  );
}

export default MyApp;