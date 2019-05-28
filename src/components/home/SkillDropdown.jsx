import React  from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import Image from "gatsby-image";

import moment from 'moment';

import { getSkilledExperience } from "../../graphql/index";

export const SkillDropdown = ({ title, startDate, img }) => {
    const renderTimeline = () => {
        const { node } = getSkilledExperience(title);
        const experience = node;
        const start = moment(experience.startDate).format("MM/YYYY");
        const end = experience.endDate ? moment(experience.endDate).format("MM/YYYY") : "present";
        return (
            <VerticalTimelineElement
                date={`${start} through ${end}`}
                icon={<Image className="BAH-Icon" fluid={experience.image.fluid} />}>
                <div
                className="timeline-element__body"
                dangerouslySetInnerHTML={{
                    __html: experience.description.childMarkdownRemark.html,
                }}
                />
            </VerticalTimelineElement>
        );
    }

    console.log("title ", title);
    return (
        <h1>{title}</h1>
    );
};
