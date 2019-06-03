import React, { Component } from 'react';
import { graphql } from "gatsby";
import moment from 'moment';
import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { interpolateGreens } from "d3-scale-chromatic"
import { scaleLinear } from "d3-scale";
import Nav from "../components/shared/Nav";
import 'react-vertical-timeline-component/style.min.css';
import { SkillDropdown } from '../components/home/SkillDropdown';

const test_data = {
  "name": "root",
  "children": [
    {
      "title": "Front End Engineering",
      "children": [
        {
          "title": "Sass/CSS",
          "start": moment('2017-03-01'),
          "end": moment()
        },
        {
          "title": "WebPack 2+",
          "start": moment('2017-07-01'),
          "end": moment()
        },
        {
          "title": "Javascript",
          "children": [
            {
              "title": "React",
              "start": moment('2017-07-01'),
              "end": moment()
            },
            {
              "title": "Redux",
              "start": moment('2017-07-01'),
              "end": moment()
            },
            {
              "title": "ES6",
              "start": moment('2017-07-01'),
              "end": moment()
            }
          ]
        }
      ]
    },
    {
      "title": "Back End Engineering",
      "children": [
        {
          "title": "Golang",
          "start": moment('2018-03-01'),
          "end": moment('2019-03-01')
        },
        {
          "title": "Python",
          "start": moment('2019-03-01'),
          "end": moment()
        },
        {
          "title": "NodeJS",
          "start": moment('2017-07-01'),
          "end": moment()
         }
      ]
    },
    {
      "title": "Cloud Engineering",
      "children": [
        {
          "title": "AWS",
          "start": moment('2018-03-01'),
          "end": moment(),
          "children": [
            {
              "title": "DynamoDB"
            },
            {
              "title": "S3"
            },
            {
              "title": "Code Pipeline"
            },
            {
              "title": "Code Build"
            },
            {
              "title": "Simple Notification Service"
            }
          ]
        },
        {
          "title": "Docker",
          "start": moment('2018-03-01'),
          "end": moment()
        },
        {
          "title": "Jenkins",
          "start": moment('2018-03-01'),
          "end":moment()
         }
      ]
    },
    {
      "title": "Janitorial Work",
      "start": moment('2010-07-01'),
      "end": moment('2013-01-01')
    },
    {
      "title": "Construction",
      "start": moment('2012-06-01'),
      "end": moment('2013-01-01')
    },
    {
      "title": "FOH/BOH Restaurant",
      "start": moment('2013-01-01'),
      "end": moment('2014-06-01')
     }
  ]
};

class RootIndex extends Component {
  renderSkills = (skill) => {
    const imgs = skill.logos.map((img) => ({ url: img.file.url, description: img.description }));
    return <SkillDropdown title={skill.title} startDate={skill.startDate} imgs={imgs} />;
  }

  render() {
    const treemapData = hierarchy(test_data, (d) => d.children) // second param defines where the node's descendants live, must return an array
      .sum((skill) => {
        const { start, end } = skill;
        console.log(skill.title, "start is moment", moment.isMoment(start), "end is moment", moment.isMoment(end))
        console.log("SKILLZ", skill);
        if (start && end) {
          const lengthOfExperience = moment.duration(end.diff(start));
          return lengthOfExperience.as("hours");
        }
        return 0;
      }) // defines value of property "value" for each node
      .sort((a, b) => {
        if (a.height > b.height) return -1;
        return 1;
      });
    
    const tree = treemap()
      .round(true)
      .padding(2)
      .tile(treemapBinary)
      .size([800, 600]);

    tree(treemapData);

    const getColorByValue = scaleLinear()
      .domain([
        treemapData.children[treemapData.children.length - 1].value,
        treemapData.children[0].value])
      .range([interpolateGreens(0.25), interpolateGreens(0.99)]);
    const { menuLinks } = this.props.data.site.siteMetadata;
    const imageProps = this.props.data.allContentfulAsset.edges
      .filter((item) => item.node.title !== "logo-bah")
      .reduce((node, item) => ({ ...node, [item.node.title]: item.node.fluid }), {});
    const skills = this.props.data.allContentfulSkill.edges;
    return (
        <div id="app">
            <Nav imageProps={imageProps} links={menuLinks}/>
            <div className="home__container">
              <svg width={treemapData.x1} height={treemapData.y1} className="skillz-treemap">
                {treemapData.children.map((skill) => {
                  console.log('yizo', skill);
                  const lengthOfExperience = moment.duration(skill.value, 'hours');
                  const displayMessage = `${lengthOfExperience.get("years")} years, ${lengthOfExperience.get("months")} months`;
                  const width = skill.x1 - skill.x0;
                  const height = skill.y1 - skill.y0;
                  return (
                    <g transform={`translate(${skill.x0}, ${skill.y0})`} className="skillz-treemap__item" onClick={() => console.log("YOU CLICKED", skill.data.name)}>
                      <rect x={0} y={0} fill={getColorByValue(skill.value)} width={width} height={height} />
                      <text textAnchor="middle" x={width / 2} y={(height / 2) - 5} fill="white">{skill.data.title}</text>
                      <text textAnchor="middle" x={width / 2} y={(height / 2) + 15} fill="white">{displayMessage}</text>
                    </g> 
                  );
                })}
              </svg>
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