import React from 'react';
import cx from 'classnames';

export const Tags = ({
  tags,
  updateSearch,
  activeTag,
}) => {
  return (
    <ul className="tags">
      {tags.map((tag) => (
        <li className="tag">
          <a className={cx({ "active-tag": (tag === activeTag) })} onClick={() => updateSearch(tag)}>
            {`#${tag}`}
          </a>
        </li>
      ))}
    </ul>
  )
};
