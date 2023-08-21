import React from 'react';


export default function SearchBooksInput({onSearch}) {

  const handleChange = (event) => {
    const val = event.target.value;
    onSearch(val);
  };

  return (
    <div className="search-books-input-wrapper">
      <input
        type="text"
        placeholder="Search by title or author"
        onChange={handleChange}
        autoFocus
      />
    </div>
  );
}


