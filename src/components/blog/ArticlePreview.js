import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

export default ({ article }) => {
  const renderTags = () => {
    return article.tags.map(tag => tag).join(', ')
  }
  return (
    <div className="article-preview">
      <Link to={`/blog/${article.slug}`}>
        {article.heroImage && <Img alt="" sizes={article.heroImage.sizes} />}
        <h3 className="preview-title">{article.title}</h3>
        <div className="preview-tags-date">
          <small>{article.publishDate} </small>
          <small>Tags: {renderTags()}</small>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: article.description.childMarkdownRemark.html
          }}
        />
      </Link>
    </div>
  );
}
