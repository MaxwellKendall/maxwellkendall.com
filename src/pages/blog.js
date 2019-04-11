import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import ArticlePreview from '../components/blog/ArticlePreview'
import { Layout } from '../components/blog/Layout'
import { Header } from '../components/blog/Header'
import { Search } from '../components/blog/Search'
import { Tags } from '../components/blog/Tags';

require('../styles/index.scss');

class RootIndex extends React.Component {
  state = {
    searchTerm: '',
    posts: [],
    activeTag: ''
  };

  componentDidMount() {
    this.setState({ posts: get(this, 'props.data.allContentfulBlogPost.edges') });
  }

  updateSearchTerm = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  filterPosts = () => {
    const searchTerm = this.state.searchTerm.toLowerCase();
    const posts = this.props.data.allContentfulBlogPost.edges.filter((post) => {
      return (
        post.node.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        post.node.title.toLowerCase().includes(searchTerm)
      );
    });

    this.setState({ posts });
  };

  renderAutoCompleteOptions = () => {
    const tags = this.props.data.allContentfulBlogPost.edges.map((post) => {
        const tagsForCurrentPost = post.node.tags
          .filter(tag => tag.includes(this.state.searchTerm))
          .join(',')
          return tagsForCurrentPost;
      })
    return Array.from(new Set(tags))
      .map(tag => <option value={tag}>{tag}</option>)
  }

  getUniqueTags = (limit = 4) => {
    return this.props.data.allContentfulBlogPost.edges.reduce((acc, edge) => {
      edge.node.tags.forEach((tag) => {
        if (acc.includes(tag)) {
          return null
        }
        acc.push(tag)
      })
      return acc;
    }, [])
  }

  render() {
    const { siteTitle } = this.props.data;
    return (
      <Layout>
        <Helmet title={siteTitle} />
        <Header>
          <Search
            renderAutoCompleteOptions={this.renderAutoCompleteOptions}
            searchTerm={this.state.searchTerm}
            updateSearchTerm={this.updateSearchTerm}
            submit={this.filterPosts} />
          <Tags activeTag={this.state.activeTag} tags={this.getUniqueTags()} updateSearch={(tag) => { this.setState({ searchTerm: tag, activeTag: tag }, this.filterPosts)}} />
        </Header>
        <div className="wrapper">
          {this.state.posts.length === 0 && <p>No posts available, please enter new search term!</p>}
          <ul className="article-list">
            {this.state.posts.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ArticlePreview article={node} />
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
  query blog {
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
    }
`