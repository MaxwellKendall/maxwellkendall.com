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
  submit,
  renderAutoCompleteOptions
}) => {
  const keyPress = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  }
  return (
    <div className={styles.search}>
      <input onKeyDown={keyPress} className={styles.search__input} list="tags" type="text" id="search" value={searchTerm} onChange={updateSearchTerm} placeholder="Search for post" />
      <datalist className={styles.search__options} id="tags">
        {renderAutoCompleteOptions()}
      </datalist>

    </div>
  );
}

 Search.propTypes = propTypes;