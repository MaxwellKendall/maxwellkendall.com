import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  searchTerm: PropTypes.string,
  updateSearchTerm: PropTypes.func,
  onSubmit: PropTypes.func
};

export const Search = ({
  searchTerm,
  updateSearchTerm,
  onSubmit
}) => {
  return (
    <div className="search">
      <input className="search__input" type="text" id="search" value={searchTerm} onChange={updateSearchTerm} placeholder="Search for post" />
      <button className="search__button"type="submit" onClick={onSubmit}>Search</button>
    </div>
  );
}

 Search.propTypes = propTypes;