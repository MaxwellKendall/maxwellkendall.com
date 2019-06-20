import { useStaticQuery, graphql } from "gatsby";

export const getSiteMetadata = () => {
    const { site } = useStaticQuery(
        graphql`
          {
            site {
                siteMetadata {
                  menuLinks {
                    link
                    name
                  }
                  title
                }
            }
          }        
        `
    );
    return site.siteMetadata;
}