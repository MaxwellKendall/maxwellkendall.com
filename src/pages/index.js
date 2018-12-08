import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import ArticlePreview from '../components/article-preview'
import Layout from '../components/layout'
import { Header } from '../components/Header'
import { Search } from '../components/Search'

class RootIndex extends React.Component {
  state = {
    searchTerm: '',
    posts: []
  };

  componentDidMount() {
    this.setState({ posts: get(this, 'props.data.allContentfulBlogPost.edges') });
  }

  filterPosts = () => {
    const posts = this.props.data.allContentfulBlogPost.edges.filter((post) => {
      return (
        post.node.tags ? post.node.tags.some((tag) => tag.includes(this.state.searchTerm)) : false ||
        post.node.title.includes(this.state.searchTerm)
      );
    });

    this.setState({ posts });
  };

  renderAutoCompleteOptions = () => {
    const autoCompleteMarkUp = [];
    this.props.data.allContentfulBlogPost.edges.map((post) => {
      if (post.node.tags) {
        
        return (
          <option value=""></option>
        )
      }
    })
  }

  render() {
    const { allContentfulAsset, siteTitle } = this.props.data;
    return (
      <Layout>
        <Header logo={allContentfulAsset} />
        <Helmet title={siteTitle} />
        <Search
          renderAutoCompleteOptions={this.renderAutoCompleteOptions}
          searchTerm={this.state.searchTerm}
          updateSearchTerm={(e) => this.setState({ searchTerm: e.target.value })}
          onSubmit={this.filterPosts} />
        <div className="wrapper">
          <ul className="article-list">
            {this.state.posts.map(({ node }) => {
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
  query index {
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