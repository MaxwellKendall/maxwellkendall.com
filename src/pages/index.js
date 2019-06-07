import React from 'react';
import { graphql } from "gatsby";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import 'react-vertical-timeline-component/style.min.css';

import Nav from "../components/shared/Nav";
import ResponsiveWrapper from "../components/shared/ResponsiveWrapper";
import ExperienceMap from "../components/home/ExperienceMap";

library.add(faChevronLeft)

const RootIndex = (props) => {
  const imageProps = props.data.allContentfulAsset.edges
    .filter((item) => item.node.title !== "logo-bah")
    .reduce((node, item) => ({ ...node, [item.node.title]: item.node.fluid }), {});
  const { menuLinks } = props.data.site.siteMetadata;
  // svg should always be the map build from test_data, but the parent of children on line 213 should change dynamically.
  return (
      <div id="app" className="home__container">
          <ResponsiveWrapper>
            <Nav imageProps={imageProps} links={menuLinks}/>
            <ExperienceMap />
          </ResponsiveWrapper>
      </div>
  );
}

export default RootIndex;

export const pageQuery = graphql`
  query homePageData {
    allContentfulAsset(filter: { title: { in: ["headshot", "chs", "BAH"] } }) {
      edges {
        node {
          title
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
    allContentfulSkill {
      edges {
        node {
          title
          start
          end
        }
      }
    }
    site {
      siteMetadata {
        menuLinks {
          name
          link
        }
      }
    }
}
`;