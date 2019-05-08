import React, { Component } from 'react';
import { graphql } from "gatsby"
import Nav from "../components/shared/Nav";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Image from "gatsby-image";

class RootIndex extends Component {
    render() {
        console.log('props: ', this.props.data)
        const getIcon = (icon) => {
          return this.props.data.allContentfulAsset.edges.reduce((acc, item) => {
            if (item.node.title === icon) {
              return {
                ...item.node.fluid
              }
            }
            return acc;
          }, {});
        }
        const imageProps = this.props.data.allContentfulAsset.edges
          .filter((item) => item.node.title !== "logo-bah")
          .reduce((node, item) => ({ ...node, [item.node.title]: item.node.fluid }), {});
        const { menuLinks } = this.props.data.site.siteMetadata;
        const bahIconProps = getIcon("logo-bah");
        
        return (
            <div id="app">
                <Nav imageProps={imageProps} links={menuLinks}/>
                <div className="home__container">
                  <VerticalTimeline layout="2-columns">
                  <VerticalTimelineElement
                    date="2015 - present"
                    icon={<Image className="BAH-Icon" fluid={bahIconProps} />}>
                    <h3>YOYOYOYO</h3>
                    <h4>YO</h4>
                    <p>BLABLBALBABL</p>
                  </VerticalTimelineElement>
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
      filter: { title: { in: ["headshot", "chs", "logo-bah"] } }
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
}
`;