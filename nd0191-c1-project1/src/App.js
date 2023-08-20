import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

const bookAction= [
  { key: 'currentlyReading', name: 'Currently Reading' },
  { key: 'wantToRead', name: 'Want to Read' },
  { key: 'read', name: 'Read' }
];
class MyApp extends Component {
  state = {  myBooks: [], searchBooks: []};
  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ myBooks: books });
      })
  };
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
    if (shelf === 'none') {
      this.setState(bookState => ({
        myBooks: bookState.myBooks.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(bookState => ({
        myBooks: bookState.myBooks.filter(b => b.id !== book.id).concat(book)
      }));
    }
  };
  searchForBooks = debounce(200, false, query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  });
  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  render() {
    const { myBooks, searchBooks} = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks bookAction={bookAction} books={myBooks} onMove={this.moveBook}/>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks searchBooks={searchBooks} myBooks={myBooks} onSearch={this.searchForBooks} onMove={this.moveBook}
              onResetSearch={this.resetSearch}/>
          )}
        />
      </div>
    );
  }
}

export default MyApp;