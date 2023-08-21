import SearchResults from './SearchResults';
import { Link } from 'react-router-dom';
import SearchBooksInput from './SearchBooksInput';

export default function SearchBooks({searchBooks, myBooks, onSearch, onResetSearch, onMove}) {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={onResetSearch}>
              Close
            </button>
          </Link>
          <SearchBooksInput onSearch={onSearch} />
        </div>
        <SearchResults
          searchBooks={searchBooks}
          myBooks={myBooks}
          onMove={onMove}
        />
      </div>
    );
}