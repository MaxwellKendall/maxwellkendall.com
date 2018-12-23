import React from 'react';
import styles from './tags.module.css';

export default ({
  tags,
  updateSearch
}) => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.tags}>Tags: </h4>
      {tags.map((tag) => <span className={styles.tag}><a onClick={updateSearch}>{tag}</a></span>)}
    </div>
  )
};
