import React from 'react';
import cx from 'classnames';

export const Tags = ({
  tags,
  updateSearch,
  activeTag,
}) => {
  return (
    <div className="tags-wrapper">
      <p className="header">Tags: </p>
      <ul className="tags">
        {tags.map((tag) => (
          <li className="tag">
            <a className={cx({ "active-tag": (tag === activeTag) })} onClick={() => updateSearch(tag)}>
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
};
