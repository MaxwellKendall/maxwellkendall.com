import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { hierarchy, treemap, treemapBinary } from "d3-hierarchy";
import { interpolateGreens } from "d3-scale-chromatic";
import { scaleLinear } from "d3-scale";

const rootNode = "All Experience";
const test_data = {
  title: "All Experience",
  children: [
    {
      title: "Front End Engineering",
      children: [
        {
          title: "Sass/CSS",
          start: moment("2017-03-01"),
          end: moment()
        },
        {
          title: "WebPack 2+",
          start: moment("2017-07-01"),
          end: moment()
        },
        {
          title: "React",
          start: moment("2017-07-01"),
          end: moment()
        },
        {
          title: "Redux",
          start: moment("2017-07-01"),
          end: moment()
        },
        {
          title: "ES6",
          start: moment("2017-07-01"),
          end: moment()
        }
      ]
    },
    {
      title: "Back End Engineering",
      children: [
        {
          title: "Golang",
          start: moment("2018-03-01"),
          end: moment("2019-03-01")
        },
        {
          title: "Python",
          start: moment("2019-03-01"),
          end: moment()
        },
        {
          title: "NodeJS",
          start: moment("2017-07-01"),
          end: moment()
        }
      ]
    },
    {
      title: "Cloud Engineering",
      children: [
        {
          title: "AWS",
          children: [
            {
              title: "DynamoDB",
              start: moment("2019-03-01"),
              end: moment()
            },
            {
              title: "S3",
              start: moment("2019-07-01"),
              end: moment()
            },
            {
              title: "Code Pipeline",
              start: moment("2019-05-01"),
              end: moment()
            },
            {
              title: "Code Build",
              start: moment("2019-05-01"),
              end: moment()
            },
            {
              title: "Simple Notification Service",
              start: moment("2019-03-01"),
              end: moment()
            }
          ]
        },
        {
          title: "Docker",
          start: moment("2018-03-01"),
          end: moment()
        },
        {
          title: "Jenkins",
          start: moment("2018-03-01"),
          end: moment()
        }
      ]
    },
    {
      title: "Janitorial Work",
      start: moment("2010-07-01"),
      end: moment("2013-01-01")
    },
    {
      title: "Construction",
      start: moment("2012-06-01"),
      end: moment("2013-01-01")
    },
    {
      title: "FOH/BOH Restaurant",
      start: moment("2013-01-01"),
      end: moment("2014-06-01")
    }
  ]
};

const ExperienceMap = ({ mapWidth, mapHeight, isMobile }) => {
  const [activeMap, setActiveMap] = useState(null); // this will have to be rebuilt every time it changes
  const [referenceObject, setReferenceObject] = useState(null); // this will have to be preserved and used as a reference for traversal.
  const [selectedReferenceNode, setSelectedReferenceNode] = useState(rootNode);

  const getSelectedReferenceNode = () => {
    if (!referenceObject) {
      return { data: test_data }; // no selected node, init reference map
    }
    if (selectedReferenceNode === rootNode) {
      return referenceObject;
    }

    return referenceObject.children.reduce(
      (acc, child1) => {
        if (acc.data.title === selectedReferenceNode) {
          return acc;
        }
        // TODO: Good opportunity for recursion here.
        // depth1
        if (child1.data.title === selectedReferenceNode) return child1;
        // depth2
        const child2 = child1.children
          ? child1.children.find(
              child => child.data.title === selectedReferenceNode
            )
          : null;
        if (child2) return child2;
        // depth3
        const child3 = child1.children
          ? child1.children.find(nextChild =>
              nextChild.children
                ? nextChild.children.find(
                    nextNextChild =>
                      nextNextChild.data.title === selectedReferenceNode
                  )
                : false
            )
          : null;
        if (child3) return child3;
        return acc;
      },
      { data: { title: "" } }
    );
  };

  const buildTreemap = () => {
    const activeNode = getSelectedReferenceNode().data;
    const newMap = hierarchy(activeNode, d => d.children)
      .sum(skill => {
        const { start, end } = skill;
        if (moment.isMoment(start) && moment.isMoment(end)) {
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
      .size([mapWidth, mapHeight]);

    tree(newMap);

    if (!referenceObject) {
      setReferenceObject(newMap);
    }
    setActiveMap(newMap);
  };

  useEffect(() => {
    console.log("EFFECT HAPPENING!!!");
    buildTreemap();
  }, [selectedReferenceNode, mapWidth, mapHeight]);

  const getColorByValue = data => {
    return scaleLinear()
      .domain([
        data.children[data.children.length - 1].value,
        data.children[0].value
      ])
      .range([interpolateGreens(0.45), interpolateGreens(0.5)]);
  };

  const getDisplayMessage = (totalProfessionalHours, skill) => {
    const hoursForSkill = Math.round(skill.value);
    if (selectedReferenceNode === rootNode) {
      // show a percentage of total professional hours
      const percentOfTotalSkillset =
        (hoursForSkill / totalProfessionalHours) * 100;
      return `${Math.round(percentOfTotalSkillset)}%`;
    }
    const skillDuration = moment.duration(hoursForSkill, "hours");
    if (skillDuration.years() === 0) {
      return `${skillDuration.months()} months`;
    }
    return `${skillDuration.years()} ${skillDuration.years() === 1 ? 'year' : 'years'}, ${skillDuration.months()} ${skillDuration.months() === 1 ? 'month' : 'months'}`;
  };

  const goBack = () => {
    const activeNode = getSelectedReferenceNode();
    setSelectedReferenceNode(activeNode.parent.data.title);
  };

  const goDeeper = node => {
    setSelectedReferenceNode(node.data.title);
  };

  const totalProfessionalHours = referenceObject
    ? Math.round(referenceObject.value)
    : 0;
  
  const getTruncatedTitle = (title, width) => {
    console.log("title", title);
    console.log("width ", width);
    if (width < 100) {
      return `${title.slice(0,4)}...`;
    }
    return title;
  }

  if (activeMap) {
    return (
      <div className="experience__explorer">
        <div className="experience__explorer__header">
          {selectedReferenceNode !== rootNode && (
            <FontAwesomeIcon icon="chevron-left" onClick={goBack} />
          )}
          <h1>{activeMap.data.title}</h1>
        </div>
        <svg
          width={activeMap.x1}
          height={activeMap.y1}
          className="skillz-treemap"
        >
          {activeMap.children.map(skill => {
            let displayMessage = getDisplayMessage(totalProfessionalHours, skill);
            const width = skill.x1 - skill.x0;
            const height = skill.y1 - skill.y0;
            const handleClick = skill.children
              ? goDeeper.bind(null, skill)
              : null;
            const color = getColorByValue(activeMap)(skill.value);
            const skillTitle = getTruncatedTitle(skill.data.title, width);
            displayMessage = getTruncatedTitle(displayMessage, width);
            return (
              <g
                transform={`translate(${skill.x0}, ${skill.y0})`}
                className="skillz-treemap__item"
                onClick={handleClick}
              >
                <rect x={0} y={0} fill={color} width={width} height={height} />
                <text
                  textAnchor="middle"
                  x={width / 2}
                  y={height / 2 - 5}
                  fill="white"
                >
                  {skillTitle}
                </text>
                <text
                  textAnchor="middle"
                  x={width / 2}
                  y={height / 2 + 15}
                  fill="white"
                >
                  {displayMessage}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
  return null; // return loading?
};

export default ExperienceMap;
