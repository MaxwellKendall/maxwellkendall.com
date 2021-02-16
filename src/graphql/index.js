import { useStaticQuery, graphql } from "gatsby";

export const getImage = (izOffHrs) => {
  const str = izOffHrs
    ? "dancing"
    : "Headshot";
    const { allImageSharp } = useStaticQuery(
        graphql`{
            allImageSharp {
              edges {
                node {
                  original {
                    src
                  }
                  id
                  fluid(maxWidth: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }`
    );
    return allImageSharp.edges
      .find((edge) => {
        return edge.node.original.src.includes(str);
      })
      .node.fluid;
};
