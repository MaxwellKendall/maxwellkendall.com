import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ExperienceMap = ({
    getDisplayMessage,
    getColorByValue,
    goDeeper,
    goBack,
    activeMap
}) => {
  console.log('referenceObject ******', referenceObject);
  console.log('activeMap ******', activeMap);
  return (
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
    </div>
  );
}

export default ExperienceMap;
