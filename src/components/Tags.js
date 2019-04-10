import React from 'react';
import cx from 'classnames';

export const Tags = ({
  tags,
  updateSearch,
  activeTag,
}) => {
  return (
    <div className="tags-wrapper">
      <h4 className="header">Tags: </h4>
      <ul className="tags">
        {tags.map((tag) => (
          <li className={cx("tag", { activeTag: (tag === activeTag)})}>
            <a onClick={() => updateSearch(tag)}>
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
};
