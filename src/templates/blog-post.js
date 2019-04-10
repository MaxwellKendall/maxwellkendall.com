import React, { Component } from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import styles from './blog-post.module.css'

class BlogPostTemplate extends Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    return (
      <Layout includeHeader>
        <div className={styles.blogpost__wrapper} style={{ background: '#fff' }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          {post.heroImage &&
            <div className={styles.hero}>
              <Img className={styles.heroImage} alt={post.title} sizes={post.heroImage.sizes} />
            </div>
          }
          <div className={styles.blogpost__postheader}>
            <h1>{post.title}</h1>
            <p>{post.publishDate}</p>
          </div>
          <div
            className={styles.blogpost__post}
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`