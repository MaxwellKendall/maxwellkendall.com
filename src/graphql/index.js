import { useStaticQuery, graphql } from "gatsby";
import moment from 'moment';

const izOffHrs = () => {
  return (
    moment().day() >= 6 || moment().hour() >= 17
  ); 
};

export const getImage = () => {
  let index = 1; // fancy headshot
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
    if (izOffHrs()) index = 0;
    return allImageSharp.edges[index].node.fluid;
};
