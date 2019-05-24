import React, { Component } from 'react';
import { graphql } from "gatsby";
import Image from "gatsby-image";
import moment from 'moment';

import Nav from "../components/shared/Nav";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { SkillDropdown } from '../components/home/SkillDropdown';


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

  renderSkills = () => {
    return <SkillDropdown skill="Back End Engineering" />;
  }

  render() {
    const { menuLinks } = this.props.data.site.siteMetadata;
    const imageProps = this.props.data.allContentfulAsset.edges
      .filter((item) => item.node.title !== "logo-bah")
      .reduce((node, item) => ({ ...node, [item.node.title]: item.node.fluid }), {});        
    return (
        <div id="app">
            <Nav imageProps={imageProps} links={menuLinks}/>
            <div className="home__container">
              {dropdownSkillAndTimeline}
            </div>
        </div>
    );
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query homePageData {
    allContentfulAsset(filter: { title: { in: ["headshot", "chs", "BAH"] } }) {
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
}
`;