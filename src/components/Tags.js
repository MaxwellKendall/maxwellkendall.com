import React from 'react';
import cx from 'classnames';
import styles from './tags.module.css';

export default ({
  tags,
  updateSearch,
  activeTag,
}) => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.header}>Tags: </h4>
      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li className={cx(`${styles.tag}`, { [styles.activeTag]: (tag === activeTag)})}>
            <a onClick={() => updateSearch(tag)}>
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
};
