import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import ArticlePreview from '../components/article-preview'
import Header from '../components/Header'

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

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')
    console.log('state: ', this.state.posts);
    return (
      <div style={{ background: '#fff' }}>
        <Header logo={this.props.data.allContentfulAsset} />
        <Helmet title={siteTitle} />
        <input type="text" id="search" value={this.state.searchTerm} onChange={(e) => this.setState({ searchTerm: e.target.value })} placeholder="Search for post" />
        <button type="submit" onClick={this.filterPosts}>Search</button>
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
      </div>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
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
    allContentfulPerson(filter: { id: { eq: "c15jwOBqpxqSAOy2eOO4S0m" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
        }
      }
    }
    allContentfulAsset(filter: { id: { eq: "c5qFKZIiWEEAewqC4AyqcWC" } }) {
      edges {
        node {
          sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
            ...GatsbyContentfulSizes_withWebp
            }
        }
      }
    }
  }
`
