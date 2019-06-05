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

const rootNode = 'All Experience';
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
  const [ activeMap, setActiveMap ] = useState(null); // this will have to be rebuilt every time it changes
  const [ referenceObject, setReferenceObject ] = useState(null); // this will have to be preserved and used as a reference for traversal.
  const [ selectedReferenceNode, setSelectedReferenceNode ] = useState(rootNode);
  
  const getSelectedReferenceNode = () => {
    if (!referenceObject) {
      return { data: test_data }; // no selected node, init reference map
    }
    if (selectedReferenceNode === rootNode) {
      return referenceObject;
    }

    return referenceObject.children.reduce((acc, child1) => {
      if (acc.data.title === selectedReferenceNode) {
        return acc;
      }
      // TODO: Good opportunity for recursion here.
      // depth1
      if (child1.data.title === selectedReferenceNode) return child1;
      // depth2
      const child2 = child1.children
        ? child1.children.find((child) => child.data.title === selectedReferenceNode)
        : null;
      if (child2) return child2;
      // depth3
      const child3 = child1.children
        ? child1.children.find((nextChild) => nextChild.children ? nextChild.children.find((nextNextChild) => nextNextChild.data.title === selectedReferenceNode) : false)
        : null;
      if (child3) return child3;
      return acc;
    }, { data: { title: '' } });
  }

  const buildTreemap = () => {
    const activeNode = getSelectedReferenceNode().data;
    const newMap = hierarchy(activeNode, (d) => d.children)
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

    if (!referenceObject) {
      setReferenceObject(newMap);
    }
    setActiveMap(newMap);
  }

  useEffect((args) => {
    console.log("EFFECT HAPPENING!!!");
    buildTreemap();
  }, [selectedReferenceNode])

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
    if (selectedReferenceNode === rootNode) { // show a percentage of total professional hours
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
  const totalProfessionalHours = referenceObject ? Math.round(referenceObject.value) : 0;

  const goBack = () => {
    const activeNode = getSelectedReferenceNode();
    setSelectedReferenceNode(activeNode.parent.data.title);
  }

  const goDeeper = (node) => {
    setSelectedReferenceNode(node.data.title);
  }

  console.log('referenceObject ******', referenceObject);
  console.log('activeMap ******', activeMap);
  // svg should always be the map build from test_data, but the parent of children on line 213 should change dynamically.
  return (
      <div id="app">
          <Nav imageProps={imageProps} links={menuLinks}/>
          <div className="home__container">
            {activeMap &&
              <div className="experience__explorer">
                <div className="experience__explorer__header">
                  {selectedReferenceNode !== rootNode && <FontAwesomeIcon icon="chevron-left" onClick={goBack} />}<h1>{activeMap.data.title}</h1>
                </div>
                <svg width={activeMap.x1} height={activeMap.y1} className="skillz-treemap">
                  {activeMap.children.map((skill) => {
                    const displayMessage = getDisplayMessage(totalProfessionalHours, skill);
                    const width = skill.x1 - skill.x0;
                    const height = skill.y1 - skill.y0;
                    const handleClick = skill.children ? goDeeper.bind(null, skill) : null;
                    const color = getColorByValue(activeMap)(skill.value);
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