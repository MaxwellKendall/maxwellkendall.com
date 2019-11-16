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
  return { headShots: [] };
};