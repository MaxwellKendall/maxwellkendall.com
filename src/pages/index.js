import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby";
import moment from 'moment';
import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { interpolateGreens } from "d3-scale-chromatic"
import { scaleLinear } from "d3-scale";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Nav from "../components/shared/Nav";
import 'react-vertical-timeline-component/style.min.css';
import { SkillDropdown } from '../components/home/SkillDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faChevronLeft)

const test_data = {
  "title": "All Experience",
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
          "children": [
            {
              "title": "DynamoDB",
              "start": moment('2019-03-01'),
              "end": moment()
            },
            {
              "title": "S3",
              "start": moment('2019-07-01'),
              "end": moment()
            },
            {
              "title": "Code Pipeline",
              "start": moment('2019-05-01'),
              "end": moment()
            },
            {
              "title": "Code Build",
              "start": moment('2019-05-01'),
              "end": moment()
            },
            {
              "title": "Simple Notification Service",
              "start": moment('2019-03-01'),
              "end": moment()
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
  const [ dataSource, setDataSource ] = useState({ data: test_data });
  const [ map, setMap ] = useState(null);

  const buildTreemap = () => {
    console.log("BUILDING TREEMAP...");
    const buildingFromNode = dataSource.data;
    const newMap = hierarchy(buildingFromNode, (d) => d.children) // second param defines where the node's descendants live, must return an array
      .sum((skill) => {
        const { start, end } = skill;
        if (moment.isMoment(start) && moment.isMoment(end) ){
          const lengthOfExperience = moment.duration(end.diff(start));
          return lengthOfExperience.as("hours");
        }
        return 0;
      })
      .sort((a, b) => {
        if (a.height > b.height) return -1;
        return 1;
      });
  
    const tree = treemap()
      .round(true)
      .padding(2)
      .tile(treemapBinary)
      .size([800, 600]);
  
    tree(newMap);

    setMap(newMap);
  }

  useEffect((args) => {
    console.log("EFFECT HAPPENING!!!");
    buildTreemap();
  }, [dataSource])

  const getColorByValue = (data) => {
    return scaleLinear()
      .domain([data.children[data.children.length - 1].value, data.children[0].value])
      .range([interpolateGreens(0.45), interpolateGreens(0.5)])
  };

  const renderSkills = (skill) => {
    const imgs = skill.logos.map((img) => ({ url: img.file.url, description: img.description }));
    return <SkillDropdown title={skill.title} startDate={skill.startDate} imgs={imgs} />;
  }

  const getDisplayMessage = (totalProfessionalHours, skill) => {
    const hoursForSkill = Math.round(skill.value);
    if (map.data.title === 'All Experience') { // show a percentage of total professional hours
      const percentOfTotalSkillset = (hoursForSkill / totalProfessionalHours) * 100;
      return `${Math.round(percentOfTotalSkillset)}%`;
    }
    const skillDuration = moment.duration(hoursForSkill, 'hours');
    const msg = `${skillDuration.years()} years, ${skillDuration.months()}, months`;
    return msg;
  }

  const imageProps = props.data.allContentfulAsset.edges
    .filter((item) => item.node.title !== "logo-bah")
    .reduce((node, item) => ({ ...node, [item.node.title]: item.node.fluid }), {});
  const { menuLinks } = props.data.site.siteMetadata;
  const skills = props.data.allContentfulSkill.edges;
  const totalProfessionalHours = map ? Math.round(map.value) : 0;

  const goBack = () => {
    setDataSource(map.parent);
  }

  console.log('map ******', map);
  // svg should always be the map build from test_data, but the parent of children on line 213 should change dynamically.
  return (
      <div id="app">
          <Nav imageProps={imageProps} links={menuLinks}/>
          <div className="home__container">
            {map &&
              <div className="experience__explorer">
                {map.parent && <FontAwesomeIcon icon="chevron-left" onClick={goBack} />}<h1>{map.data.title}</h1>
                <svg width={map.x1} height={map.y1} className="skillz-treemap">
                  {map.children.map((skill) => {
                    const displayMessage = getDisplayMessage(totalProfessionalHours, skill);
                    const width = skill.x1 - skill.x0;
                    const height = skill.y1 - skill.y0;
                    const handleClick = skill.children ? setDataSource.bind(null, skill) : null;
                    const color = getColorByValue(map)(skill.value);
                    return (
                      <g transform={`translate(${skill.x0}, ${skill.y0})`} className="skillz-treemap__item" onClick={handleClick}>
                        <rect x={0} y={0} fill={color} width={width} height={height} />
                        <text textAnchor="middle" x={width / 2} y={(height / 2) - 5} fill="white">{skill.data.title}</text>
                        <text textAnchor="middle" x={width / 2} y={(height / 2) + 15} fill="white">{displayMessage}</text>
                      </g> 
                    );
                  })}
                </svg>
              </div>}
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