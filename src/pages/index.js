import React, { Component } from 'react';
import { graphql } from "gatsby"
import Nav from "../components/shared/Nav";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Image from "gatsby-image";

class RootIndex extends Component {
  renderTimeline = () => {
    return this.props.data.allContentfulExperience.edges.map((item) => {
      const experience = item.node;
      return (
        <VerticalTimelineElement
          date={`${experience.startDate} through ${experience.endDate}`}
          icon={<Image className="BAH-Icon" fluid={experience.image.fluid} />}>
          <div
            className="timeline-element__body"
            dangerouslySetInnerHTML={{
              __html: experience.description.childMarkdownRemark.html,
            }}
          />
        </VerticalTimelineElement>
    );
  })};

  render() {
    const { menuLinks } = this.props.data.site.siteMetadata;

    const imageProps = this.props.data.allContentfulAsset.edges
      .filter((item) => item.node.title !== "logo-bah")
      .reduce((node, item) => ({ ...node, [item.node.title]: item.node.fluid }), {});        
    return (
        <div id="app">
            <Nav imageProps={imageProps} links={menuLinks}/>
            <div className="home__container">
              <VerticalTimeline layout="2-columns">
                {this.renderTimeline()}
              </VerticalTimeline>
            </div>
        </div>
    );
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query homePageData {
    allContentfulAsset(
      filter: { title: { in: ["headshot", "chs", "BAH"] } }
    ) {
      edges {
        node {
          title
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
    site {
      siteMetadata {
        menuLinks {
          name
          link
        }
      }
    }
  allContentfulBlogPost(
    filter: { title: { eq: "Home Page Introduction" }}
  ){
    edges {
      node {
        title
        body {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
  allContentfulExperience {
    edges {
      node {
        startDate
        endDate
        description {
          id
          childMarkdownRemark {
            id
            html
          }
        }
        
        image {
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
}
`;