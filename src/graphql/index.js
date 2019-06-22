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
            allContentfulPerson(filter: {name: {eq: "Maxwell Kendall"}}) {
              edges {
                node {
                  name
                  headShots {
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
                    file {
                      url
                    }
                  }
                  shortBio {
                    childMarkdownRemark {
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