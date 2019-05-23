import React, { Component } from 'react';
import { graphql } from "gatsby";
import Image from "gatsby-image";
import moment from 'moment';

import Nav from "../components/shared/Nav";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';


class RootIndex extends Component {
  renderTimeline = () => {
    return this.props.data.allContentfulExperience.edges
      .sort((a, b) => (moment(a.node.startDate) > moment(b.node.startDate)) ? -1 : 1)
      .map((item) => {
        const experience = item.node;
        const start = moment(experience.startDate).format("MM/YYYY");
        const end = experience.endDate ? moment(experience.endDate).format("MM/YYYY") : "present";
        return (
          <VerticalTimelineElement
            date={`${start} through ${end}`}
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
    const homePageIntro = this.props.data.contentfulBlogPost.body.childMarkdownRemark.html;
    const imageProps = this.props.data.allContentfulAsset.edges
      .filter((item) => item.node.title !== "logo-bah")
      .reduce((node, item) => ({ ...node, [item.node.title]: item.node.fluid }), {});        
    return (
        <div id="app">
            <Nav imageProps={imageProps} links={menuLinks}/>
            <div className="home__container">
              <div
                className="home__intro"
                dangerouslySetInnerHTML={{ __html: homePageIntro }}/>
              <VerticalTimeline layout="1-column">
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
  contentfulBlogPost( title: { eq: "Home Page Introduction" }) {
    body {
      childMarkdownRemark {
        html 
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