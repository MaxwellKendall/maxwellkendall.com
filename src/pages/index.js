import React, { Component } from 'react';
import { graphql } from "gatsby";
import moment from 'moment';
import { hierarchy, treemap } from 'd3-hierarchy';

import Nav from "../components/shared/Nav";
import 'react-vertical-timeline-component/style.min.css';
import { SkillDropdown } from '../components/home/SkillDropdown';

const test_data = {
  "name": "Eve",
  "offspring": [
    {
      "name": "Cain"
    },
    {
      "name": "Seth",
      "offspring": [
        {
          "name": "Enos"
        },
        {
          "name": "Noam"
        }
      ]
    },
    {
      "name": "Abel"
    },
    {
      "name": "Awan",
      "offspring": [
        {
          "name": "Enoch"
        }
      ]
    },
    {
      "name": "Azura"
    }
  ]
};

class RootIndex extends Component {
  renderSkills = (skill) => {
    const imgs = skill.logos.map((img) => ({ url: img.file.url, description: img.description }));
    return <SkillDropdown title={skill.title} startDate={skill.startDate} imgs={imgs} />;
  }

  render() {
    const treemapData = hierarchy(test_data, (d) => d.offspring) // second param defines where the node's descendants live, must return an array
      .sum(() => 1) // defines value of property "value" for each node
      .sort()
    
    const tree = treemap();

    tree(treemapData);

    console.log('haylo', treemapData);
    const { menuLinks } = this.props.data.site.siteMetadata;
    const imageProps = this.props.data.allContentfulAsset.edges
      .filter((item) => item.node.title !== "logo-bah")
      .reduce((node, item) => ({ ...node, [item.node.title]: item.node.fluid }), {});
    const skills = this.props.data.allContentfulSkill.edges;
    return (
        <div id="app">
            <Nav imageProps={imageProps} links={menuLinks}/>
            <div className="home__container">
              <ul>
                {skills
                  .sort((skillA, skillB) => (moment(skillA.node.startDate) > moment(skillB.node.startDate)) ? -1 : 1)
                  .map((skill) => this.renderSkills(skill.node))}
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
          title
          startDate
          logos {
            id
            description
            file {
              url
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