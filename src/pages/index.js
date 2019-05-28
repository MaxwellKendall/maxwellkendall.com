import React, { Component } from 'react';
import { graphql } from "gatsby";
import moment from 'moment';

import Nav from "../components/shared/Nav";
import 'react-vertical-timeline-component/style.min.css';
import { SkillDropdown } from '../components/home/SkillDropdown';


class RootIndex extends Component {
  renderSkills = (node) => {
    console.log("node", node)
    return <SkillDropdown title={node.title} startDate={node.startDate} img={node.logo.fluid} />;
  }

  render() {
    const { menuLinks } = this.props.data.site.siteMetadata;
    const imageProps = this.props.data.allContentfulAsset.edges
      .filter((item) => item.node.title !== "logo-bah")
      .reduce((node, item) => ({ ...node, [item.node.title]: item.node.fluid }), {});
    const skills = this.props.data.allContentfulSkill.edges;
    console.log(this.props);
    return (
        <div id="app">
            <Nav imageProps={imageProps} links={menuLinks}/>
            <div className="home__container">
              <ul>
                {skills
                  .sort((a, b) => (moment(a.node.startDate) > moment(b.node.startDate)) ? -1 : 1)
                  .map((edge) => this.renderSkills(edge.node))}
              </ul>
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
    allContentfulSkill {
      edges {
        node {
          startDate
          title
          logo {
            fluid {
              ...GatsbyContentfulFluid
            }
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