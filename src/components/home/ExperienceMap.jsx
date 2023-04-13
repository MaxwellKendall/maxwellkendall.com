import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import moment from "moment";
import { hierarchy, treemap, treemapBinary } from "d3-hierarchy";
import { interpolateGreens } from "d3-scale-chromatic";
import { scaleLinear } from "d3-scale";
import { navigate } from "gatsby";
import queryString from 'query-string'

const calculateDurations = (arr) => arr.reduce((dur, [start, end]) => {
  const endDate = end === null ? moment() : moment(end);
  const duration = Math.round(moment.duration(moment(endDate).diff(moment(start))).asHours());
  return dur.add(duration, 'hours');
}, moment.duration()).asHours();

const rootNode = "All Experience";

const test_data = {
  title: "All Experience",
  notes: "Click on a category to learn more about my experience.",
  children: [
    {
      title: "Front End Engineering",
      notes: "From 2017 until 2020, my experience was heavily focused on the front end. I've contributed code on multiple websites with millions of users including rec.gov, usaspending.gov, and app.mural.co",
      children: [
        {
          title: "React, Redux, Webpack, ES6 and so on",
          totalHours: calculateDurations([['2017-07-01', null]]),
          notes: "Thus far I've worked on three production, enterprise scale code bases, all of which had been using React. Two using redux for state management and one using alternatives."
        }
      ]
    },
    {
      title: "Backend Engineering",
      notes: "Prior to 2021, my experience on the back end was very light but I did have local environments and contributions in production code.",
      children: [
        {
          title: "Golang",
          totalHours: calculateDurations([["2018-03-01", "2019-03-01"]]),
          notes: "Professional experience includes building very simple endpoints as well as data migrations.",
        },
        {
          title: "Python",
          start: moment("2019-03-01"),
          end: moment("2021-05-31"),
          totalHours: calculateDurations([["2019-03-01", "2021-05-31"]]),
          notes: "Professional experience includes building very simple endpoints using Django.",
        },
        {
          title: "NodeJS and TypeScript",
          totalHours: calculateDurations([["2021-06-01", null]]),
          notes: "Lots of experience ranging from: serverless APIs, asynchronous bulk processes, external/customer facing APIs, internal APIs, various scripts and so on.",
        }
      ]
    },
    {
      title: "Cloud Engineering: AWS",
      totalHours: calculateDurations([['2019-12-01', '2022-12-22']]),
      notes: "Certified as Solutions Architect at the Associate Level. December 2019 through December 2022"
    },
    {
      title: "Operations and Support",
      notes: "My experience here has been exceedingly valuable in trouble shooting and communication with non technical audiences.",
      children: [
        {
          title: "SaaS Help Desk",
          totalHours: calculateDurations([["2014-06-01", '2015-06-01']]),
          notes: "Tier I & II help desk for a software company called Benefitfocus which had millions of users."
        },
        {
          title: "Enterprise Application Production Operations",
          totalHours: calculateDurations([["2015-06-01", '2017-02-28']]),
          notes: "Assisting in deployment operations and real time troubleshooting of Enterprise scale web application."
        },
      ]
    },
    {
      title: "Miscellaneous",
      notes: "My experience outside of the tech world has taught me a lot.",
      children: [
        {
          title: "Janitorial Work",
          totalHours: calculateDurations([['2010-05-05', '2010-08-15'], ['2011-05-05', '2011-08-15']]),
          notes: "For two summers in college, I worked as a janitor at my church.",
        },
        {
          title: "Construction",
          totalHours: calculateDurations([['2012-06-01', '2013-01-01']]),
          notes: "Landscaping, electrical, and plumbing for a Christian Summer Camp.",
        },
        {
          title: "Restaurant",
          start: moment("2013-01-01"),
          end: moment("2014-06-01"),
          totalHours: calculateDurations([['2013-01-01', '2014-06-01']]),
          notes: "Working in the restaurant industry really brought a ton of perspective into my life. I recommend everyone should do it.",
        }
      ]
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

const ExperienceMap = ({ mapWidth, mapHeight, location }) => {
  const [activeMap, setActiveMap] = useState(null); // this will have to be rebuilt every time it changes
  const [referenceObject, setReferenceObject] = useState(null); // this will have to be preserved and used as a reference for traversal.
  const selectedNodeTitle = queryString.parse(location.search)?.node || rootNode;
  console.log('selectedNodeTitle', selectedNodeTitle)

  const setSelectedNodeTitle = (title) => {
    console.log('title', title);
    navigate(`/?node=${title}`);
  }

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
        return skill.totalHours ? skill.totalHours : 0;
      })

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
      .range([interpolateGreens(0.65), interpolateGreens(.95)]);
  };

  const getDisplayMessage = (skill) => {
    const skillDuration = moment.duration(skill.value, 'hours');
    if (skillDuration.years() === 0) {
      return `${skillDuration.months()} ${skillDuration.months() === 1 ? 'month' : 'months'}`;
    }
    if (skillDuration.years() && skillDuration.months()) {
      return `${skillDuration.years()} ${skillDuration.years() === 1 ? 'year' : 'years'}, ${skillDuration.months()} ${skillDuration.months() === 1 ? 'month' : 'months'}`;
    }
    return `${skillDuration.years()} ${skillDuration.years() === 1 ? 'year' : 'years'}`;
  };

  const goBack = () => {
    const activeNode = getSelectedReferenceNode();
    setSelectedNodeTitle(activeNode.parent.data.title);
  };

  const goDeeper = node => {
    setSelectedNodeTitle(node.data.title);
  };

  
  const getTruncatedTitle = (title, width) => {
    if (width < 40) {
      return `${title.slice(0,2)}`;
    }
    if (width < 125) {
      return `${title.slice(0, 10)}...`;
    }
    return title;
  }

  const renderTreemapCell = (skill) => {
    let displayMessage = getDisplayMessage(skill);
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
    return (
      <div className="experience__explorer w-full flex flex-col items-center justify-center">
        <div className="experience__explorer__header flex items-center">
          {selectedNodeTitle !== rootNode && <FontAwesomeIcon icon={faChevronLeft} onClick={goBack} className="cursor-pointer px-2 mb-4 text-xl" />}
          <h2 className="text-xl mb-4 uppercase tracking-wider">{activeMap.data.title}</h2>
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
          <p className="pt-10 text-xl text-center experience-notes" dangerouslySetInnerHTML={{ __html: activeMap.data.notes }} />
        )}
      </div>
    );
  }
  return null; // return loading?
};

export default ExperienceMap;
