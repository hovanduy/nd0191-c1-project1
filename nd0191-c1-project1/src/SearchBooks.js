import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class SearchBooks extends Component {
  state = { value: ''};

  handleSearch = event => {
    const val = event.target.value;
    this.setState({ value: val }, () => {
      this.props.onSearch(val);
    });
  };

  render() {
    const { searchBooks, myBooks, onResetSearch, onMove} = this.props; 

    const updatedBooks = searchBooks.map(book => {
      myBooks.map(b => {
        if (b.id === book.id) {
          book.shelf = b.shelf;
        }
        return b;
      });
      return book;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={onResetSearch}>
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={this.state.value} placeholder="Search by title, author, or ISBN"
              onChange={this.handleSearch} autoFocus/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {updatedBooks.map(book => (
                <Book key={book.id} book={book} shelf={book.shelf ? book.shelf : 'none'} onMove={onMove}/>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;