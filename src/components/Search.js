import React from 'react';
import PropTypes from 'prop-types';
import styles from './search.module.css';

const propTypes = {
  searchTerm: PropTypes.string,
  updateSearchTerm: PropTypes.func,
  renderAutoCompleteOptions: PropTypes.func,
  onSubmit: PropTypes.func
};

export const Search = ({
  searchTerm,
  updateSearchTerm,
  onSubmit,
  renderAutoCompleteOptions
}) => {
  return (
    <div className={styles.search}>
      <input className={styles.search__input} list="tags" type="text" id="search" value={searchTerm} onChange={updateSearchTerm} placeholder="Search for post" />
      <button className={styles.search__button} type="submit" onClick={onSubmit}>Search</button>
      <datalist className={styles.search__options} id="tags">
        {renderAutoCompleteOptions()}
      </datalist>
    </div>
  );
}

 Search.propTypes = propTypes;