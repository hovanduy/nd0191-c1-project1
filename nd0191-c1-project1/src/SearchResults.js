import React from 'react';
import Book from './Book';

const SearchResults = props => {
  const { searchBooks, onMove } = props;

  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {searchBooks.map(book => (
          <Book
            key={book.id}
            book={book}
            shelf={book.shelf ? book.shelf : 'none'}
            onMove={onMove}
          />
       ))}
      </ol>
    </div>
  );
};

export default SearchResults;
