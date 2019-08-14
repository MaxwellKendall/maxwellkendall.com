import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import 'react-vertical-timeline-component/style.min.css';

import { SEO } from '../components/shared/SEO';
import { getRepos } from '../utils/git_api';

import Nav from '../components/shared/Nav';
import ResponsiveWrapper from '../components/shared/ResponsiveWrapper';
import ExperienceMap from '../components/home/ExperienceMap';

library.add(faChevronLeft);

const RootIndex = (props) => {
  useEffect(() => {
    getRepos()
      .then((data) => {
        const repositories = data.data
          .filter((repo) => repo.language)
          .map((repo) => ({
            language: repo.language,
            name: repo.name,
            url: repo.url,
            desc: repo.description,
            homepage: repo.homepage,
          }));
        console.log(repositories);
      });
  }, []);

  const imageProps = props.data.allContentfulAsset.edges
    .filter((item) => item.node.title !== 'logo-bah')
    .reduce(
      (node, item) => ({ ...node, [item.node.title]: item.node.fluid }),
      {},
    );
  const { menuLinks } = props.data.site.siteMetadata;
  // svg should always be the map build from test_data, but the parent of children on line 213 should change dynamically.
  return (
    <React.Fragment>
      <SEO siteMetadata={props.data.site.siteMetadata} />
      <ResponsiveWrapper page="home">
        <Nav imageProps={imageProps} links={menuLinks} />
        <ExperienceMap />
      </ResponsiveWrapper>
    </React.Fragment>
  );
};

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
        title
        description
      }
    }
  }
`;
