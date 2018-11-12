import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.css'
import ArticlePreview from '../components/article-preview'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')

    return (
      <StaticQuery
        query={graphql`
        query BlogIndexQuery {
          allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
            edges {
              node {
                title
                slug
                publishDate(formatString: "MMMM Do, YYYY")
                tags
                description {
                  childMarkdownRemark {
                    html
                  }
                }
              }
            }
          }
        }
      `}
        render={data => (
          <div style={{ background: '#fff' }}>
            <Helmet title={siteTitle} />
            <div className={styles.hero}>
              Blog
            </div>
            <div className="wrapper">
              <h2 className="section-headline">Recent articles</h2>
              <ul className="article-list">
                {posts.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}/>
    )
  }
}

export default BlogIndex
