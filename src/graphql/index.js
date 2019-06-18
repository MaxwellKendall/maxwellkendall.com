import { useStaticQuery, graphql } from "gatsby";

// export const getSkilledExperience = (skill) => {
//     const { allContentfulExperience } = useStaticQuery(
//         graphql`
//             {
//                 allContentfulExperience {
//                     edges {
//                         node {
//                             startDate
//                             endDate
//                             description {
//                                 id
//                                 childMarkdownRemark {
//                                     id
//                                     html
//                                 }
//                             }
//                             image {
//                                 fluid {
//                                     ...GatsbyContentfulFluid
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         `
//     );
//     return allContentfulExperience.edges.find((edge) => edge.node.skill === skill).node;
// }

export const getBio = (name = "Maxwell Kendall") => {
    const { allContentfulPerson } = useStaticQuery(
        graphql`
            {
                allContentfulPerson {
                    edges {
                      node {
                        name
                        image {
                            fluid {
                                ...GatsbyContentfulFluid
                            }
                        }
                        shortBio {
                          shortBio
                          childMarkdownRemark {
                            id
                            html
                          }
                        }
                      }
                    }
                }
            }
        `
    );
    return allContentfulPerson.edges.find((edge) => edge.node.name === name).node;
}