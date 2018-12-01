import React from 'react';
import PropTypes from 'prop-types';
import styles from './search.module.css';

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
    <div className={styles.search}>
      <input className={styles.search__input} type="text" id="search" value={searchTerm} onChange={updateSearchTerm} placeholder="Search for post" />
      <button className={styles.search__button} type="submit" onClick={onSubmit}>Search</button>
    </div>
  );
}

 Search.propTypes = propTypes;