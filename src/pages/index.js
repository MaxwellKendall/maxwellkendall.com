import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby";
import moment from 'moment';
import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { interpolateGreens } from "d3-scale-chromatic"
import { scaleLinear } from "d3-scale";
import Nav from "../components/shared/Nav";
import 'react-vertical-timeline-component/style.min.css';
import { SkillDropdown } from '../components/home/SkillDropdown';

const test_data = {
  "title": "root",
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
          "end": moment()
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

const RootIndex = (props) => {
  const [ selectedBranch, setSelectedBranch ] = useState({ depth: 0, data: { title: "root" } });
  const [ treemapShape, setTreemapShape ] = useState(null);

  useEffect(() => {
    updateTreemapShape();
  }, [selectedBranch.data.title])

  const updateTreemapShape = () => {
    console.log("updateTreemapShape selectedBranch, ", selectedBranch);
    const data = hierarchy(selectedBranch, (d) => d.children) // second param defines where the node's descendants live, must return an array
      .sum((skill) => {
        const { start, end } = skill;
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

    tree(data);

    setTreemapShape(data);
    return data;
  }

  const getColorByValue = (data) => scaleLinear()
      .domain([
        data.children[data.children.length - 1].value,
        data.children[0].value])
      .range([interpolateGreens(0.45), interpolateGreens(0.99)]);

  const renderSkills = (skill) => {
    const imgs = skill.logos.map((img) => ({ url: img.file.url, description: img.description }));
    return <SkillDropdown title={skill.title} startDate={skill.startDate} imgs={imgs} />;
  }

  const getDisplayMessage = (totalProfessionalHours, skill) => {
    const hoursForSkill = Math.round(skill.value);
    if (selectedBranch.data.title === 'root') { // show a percentage of total professional hours
      const percentOfTotalSkillset = (hoursForSkill / totalProfessionalHours) * 100;
      return `${Math.round(percentOfTotalSkillset)}%`;
    }
    console.log("display message", skill);
    const skillDuration = moment.duration(hoursForSkill);
    return `${skillDuration.get('years')} years, ${skillDuration.get('months')}, months`;
  }

  const imageProps = props.data.allContentfulAsset.edges
    .filter((item) => item.node.title !== "logo-bah")
    .reduce((node, item) => ({ ...node, [item.node.title]: item.node.fluid }), {});
  const { menuLinks } = props.data.site.siteMetadata;
  const skills = props.data.allContentfulSkill.edges;
  const totalProfessionalHours = treemapShape ? Math.round(treemapShape.value) : 0;
  return (
      <div id="app">
          <Nav imageProps={imageProps} links={menuLinks}/>
          <div className="home__container">
            {treemapShape &&
              <svg width={treemapShape.x1} height={treemapShape.y1} className="skillz-treemap">
                {treemapShape.children.map((skill) => {
                  const displayMessage = getDisplayMessage(totalProfessionalHours, skill);
                  const width = skill.x1 - skill.x0;
                  const height = skill.y1 - skill.y0;
                  const handleClick = setSelectedBranch.bind(null, skill);
                  return (
                    <g transform={`translate(${skill.x0}, ${skill.y0})`} className="skillz-treemap__item" onClick={handleClick}>
                      <rect x={0} y={0} fill={getColorByValue(treemapShape)(skill.value)} width={width} height={height} />
                      <text textAnchor="middle" x={width / 2} y={(height / 2) - 5} fill="white">{skill.data.title}</text>
                      <text textAnchor="middle" x={width / 2} y={(height / 2) + 15} fill="white">{displayMessage}</text>
                    </g> 
                  );
                })}
            </svg>
            }
            <ul>
              {skills
                .sort((skillA, skillB) => (moment(skillA.node.startDate) > moment(skillB.node.startDate)) ? -1 : 1)
                .map((skill) => renderSkills(skill.node))}
            </ul>
          </div>
      </div>
  );
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