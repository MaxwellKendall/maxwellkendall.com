import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import moment from "moment";
import { hierarchy, treemap, treemapBinary } from "d3-hierarchy";
import { interpolateGreens } from "d3-scale-chromatic";
import { scaleLinear } from "d3-scale";

const rootNode = "All Experience";
const test_data = {
  title: "All Experience",
  notes: "Click on a category to learn more about my experience.",
  children: [
    {
      title: "Front End Engineering",
      notes: "Full stack developer for Recreation.gov and USAspending.gov.",
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
      notes: "As a full stack developer in my career thus far I have always focused on the front end. My experience here should be read as such.",
      children: [
        {
          title: "Golang",
          start: moment("2018-03-01"),
          end: moment("2019-03-01"),
          notes: "Professional experience includes building very simple endpoints as well as data migrations.",
        },
        {
          title: "Python",
          start: moment("2019-03-01"),
          end: moment(),
          notes: "Professional experience includes building very simple endpoints using Django.",
        },
        {
          title: "NodeJS",
          start: moment("2017-07-01"),
          end: moment(),
          notes: "Professional experience includes building a sitemap using Node, configuring build process with WebPack, and various other miscellaneous scripts.",
        }
      ]
    },
    {
      title: "Cloud Engineering",
      children: [
        {
          title: "AWS",
          notes: "Professional experience includes S3, CloudFront, Lambda, and API Gateway.",
          children: [
            {
              title: "Certified Solutions Architect, Associate",
              start: moment("2019-12-01"),
              end: moment()
            },
          ]
        },
        {
          title: "Docker",
          start: moment("2018-03-01"),
          end: moment(),
          notes: "Professional experience includes setting up deployable containers using DockerFile and maintaining local back ends.",
        },
        {
          title: "Jenkins",
          start: moment("2018-03-01"),
          end: moment(),
          notes: "Professional experience kicking off jobs regularly as well as defining a job to decouple our sitemap generation from our deploy process."
        }
      ]
    },
    {
      title: "Janitorial Work",
      start: moment("2010-07-01"),
      end: moment("2013-01-01"),
      notes: "Very grateful for this experience as a janitor at my church during college. I'm grateful to be able to work with my mind and not so much my hands.",
    },
    {
      title: "Construction",
      start: moment("2012-06-01"),
      end: moment("2013-01-01"),
      notes: "Very grateful for this experience as a facilities manager at a Christian Summer camp. I'm grateful to be able to work with my mind and not so much my hands.",
    },
    {
      title: "Restaurant",
      start: moment("2013-01-01"),
      end: moment("2014-06-01"),
      notes: "Very grateful for this experience as a deli worker at the best deli in Charleston SC -- Mozzo Deli.",
    }
  ]
};

const findChild = (node, referenceString) => {
  if (node.data.title === referenceString) return node;
  if (node.children) {
    return node.children.reduce((acc, child) => {
      if (acc.data.title === referenceString) return acc;
      if (child.data.title === referenceString) return child;
      return findChild(child, referenceString);
    }, { data: { title: "" } });
  }
  return { data: { title: "" } };
}

const ExperienceMap = ({ mapWidth, mapHeight }) => {
  const [activeMap, setActiveMap] = useState(null); // this will have to be rebuilt every time it changes
  const [referenceObject, setReferenceObject] = useState(null); // this will have to be preserved and used as a reference for traversal.
  const [selectedNodeTitle, setSelectedNodeTitle] = useState(rootNode);

  const getSelectedReferenceNode = () => {
    if (!referenceObject) {
      return { data: test_data }; // no selected node, init reference map
    }
    if (selectedNodeTitle === rootNode) {
      return referenceObject;
    }

    return referenceObject.children.reduce((acc, child) => {
        if (acc.data.title === selectedNodeTitle) return acc;
        return findChild(child, selectedNodeTitle);
    }, { data: { title: "" } })
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
    buildTreemap();
  }, [selectedNodeTitle, mapWidth, mapHeight]);

  const getColorByValue = data => {
    const lowest = data.children ? data.children[data.children.length - 1].value : data.value;
    const highest = data.children ? data.children[0].value : data.value;
    return scaleLinear()
      .domain([
        lowest,
        highest
      ])
      .range([interpolateGreens(0.45), interpolateGreens(0.5)]);
  };

  const getDisplayMessage = (totalProfessionalHours, skill) => {
    const hoursForSkill = Math.round(skill.value);
    if (selectedNodeTitle === rootNode) {
      // show a percentage of total professional hours
      const percentOfTotalSkillset =
        (hoursForSkill / totalProfessionalHours) * 100;
      return `${Math.round(percentOfTotalSkillset)}%`;
    }
    const skillDuration = moment.duration(hoursForSkill, "hours");
    if (skillDuration.years() === 0) {
      return `${skillDuration.months()} ${skillDuration.months() === 1 ? 'month' : 'months'}`;
    }
    return `${skillDuration.years()} ${skillDuration.years() === 1 ? 'year' : 'years'}, ${skillDuration.months()} ${skillDuration.months() === 1 ? 'month' : 'months'}`;
  };

  const goBack = () => {
    const activeNode = getSelectedReferenceNode();
    setSelectedNodeTitle(activeNode.parent.data.title);
  };

  const goDeeper = node => {
    setSelectedNodeTitle(node.data.title);
  };

  const totalProfessionalHours = referenceObject
    ? Math.round(referenceObject.value)
    : 0;
  
  const getTruncatedTitle = (title, width) => {
    if (width < 50) {
      return `${title.slice(0,2)}`;
    }
    if (width < 100) {
      return `${title.slice(0,4)}...`;
    }
    return title;
  }

  const renderTreemapCell = (skill) => {
    let displayMessage = getDisplayMessage(totalProfessionalHours, skill);
    const width = skill.x1 - skill.x0;
    const height = skill.y1 - skill.y0;
    const handleClick = goDeeper.bind(null, skill);
    const color = getColorByValue(activeMap)(skill.value);
    const skillTitle = getTruncatedTitle(skill.data.title, width);
    displayMessage = getTruncatedTitle(displayMessage, width);
    return (
      <g
        transform={`translate(${skill.x0}, ${skill.y0})`}
        className="skillz-treemap__item cursor-pointer"
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
  }

  if (activeMap) {
    console.log('active', activeMap)
    return (
      <div className="experience__explorer w-full flex flex-col items-center justify-center">
        <div className="experience__explorer__header flex items-center">
          {selectedNodeTitle !== rootNode && <FontAwesomeIcon icon={faChevronLeft} onClick={goBack} className="cursor-pointer mr-2 text-2xl" />}
          <h2 className="text-3xl uppercase tracking-wider">{activeMap.data.title}</h2>
        </div>
        <svg
          width={activeMap.x1}
          height={activeMap.y1}
          className="skillz-treemap"
        >
          {activeMap.children
            ? activeMap.children.map(skill => renderTreemapCell(skill))
            : renderTreemapCell(activeMap)
          }
        </svg>
        {activeMap.data?.notes && (
          <p className="pt-10 text-xl text-center">
            {activeMap.data.notes}
          </p>
        )}
      </div>
    );
  }
  return null; // return loading?
};

export default ExperienceMap;
