import { useStaticQuery, graphql } from "gatsby";
import moment from 'moment';

const izOffHrs = () => {
  return (
    moment().day() >= 6 || moment().hour() >= 17
  ); 
};

export const getImage = () => {
  let str = "Headshot"; // fancy headshot
    const { allImageSharp } = useStaticQuery(
        graphql`
          query getImage {
            allImageSharp {
              edges {
                node {
                  original {
                    src
                  }
                  id
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }`
    );
    if (izOffHrs()) str = "dancing";
    return allImageSharp.edges
      .find((edge) => {
        return edge.node.original.src.includes(str);
      })
      .node.fluid;
};
