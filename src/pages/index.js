import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import ArticlePreview from '../components/article-preview'
import Layout from '../components/layout'
import Header from '../components/Header'

class RootIndex extends React.Component {
  render() {
    const { allContentfulAsset, allContentfulBlogPost, siteTitle } = this.props.data;
    const posts = allContentfulBlogPost.edges;
    return (
      <Layout>
        <Header logo={allContentfulAsset} />
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <ul className="article-list">
            {posts.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ArticlePreview article={node} />
                  <hr className="preview-hr"/>
                </li>
              )
            })}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query {
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
        contentfulPerson(name: { eq: "Maxwell Kendall" }) {
          name
          shortBio {
            shortBio
          }
        }
        allContentfulAsset(filter:{ file: { fileName: { eq:"Logo.png"}} }) {
          edges{
            node {
              file {
                url
                fileName
                contentType
              }
              fluid {
                base64
                tracedSVG
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
            }
          }
        }
    }
`