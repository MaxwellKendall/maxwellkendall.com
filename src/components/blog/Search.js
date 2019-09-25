import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  searchTerm: PropTypes.string,
  updateSearchTerm: PropTypes.func,
  renderAutoCompleteOptions: PropTypes.func,
  onSubmit: PropTypes.func
};

const Search = ({
  searchTerm,
  updateSearchTerm,
  submit,
  renderAutoCompleteOptions
}) => {
  const keyPress = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  }
  return (
    <div className="search">
      <input onKeyDown={keyPress} className="search__input" list="tags" type="text" id="search" value={searchTerm} onChange={updateSearchTerm} placeholder="Search for post" />
      <datalist className="search__options" id="tags">
        {renderAutoCompleteOptions()}
      </datalist>
    </div>
  );
};

Search.propTypes = propTypes;
export default Search;
