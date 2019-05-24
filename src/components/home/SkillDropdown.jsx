import React  from 'react';
import { useStaticQuery, graphql } from "gatsby";

export const getSkill = (title) => {
    const skills = useStaticQuery(
        graphql`
            query getAllSkillz {
                allContentfulSkill {
                    nodes {
                        title
                        logo {
                            fluid {
                                base64
                                tracedSVG
                                aspectRatio
                                src
                                srcSet
                                srcWebp
                                srcSetWebp
                                sizes
                            }
                        }
                    }
                }
            }
        `
    );

    return skills.allContentfulSkill.nodes.find((node) => node.title === title);
};

export const getSkilledExperience = (skill) => {
    const { allContentfulExperience } = useStaticQuery(
        graphql`
            query getAllExperience {
                allContentfulExperience {
                    edges {
                        node {
                            startDate
                            endDate
                            description {
                                id
                                childMarkdownRemark {
                                    id
                                    html
                                }
                            }
                            image {
                                fluid {
                                    base64
                                    tracedSVG
                                    aspectRatio
                                    src
                                    srcSet
                                    srcWebp
                                    srcSetWebp
                                    sizes
                                }
                            }
                        }
                    }
                }
            }
        `
    );
    return allContentfulExperience.edges.find((edge) => edge.node.skill === skill);
}

export const SkillDropdown = ({ skill }) => {
    const { title, logo } = getSkill(skill);
    const { node } = getSkilledExperience(skill);
    console.log("node", node);
    return (
        <h1>{title}</h1>
    );
};
