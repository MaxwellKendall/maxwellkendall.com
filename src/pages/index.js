import React from 'react';
import { graphql } from 'gatsby';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import 'react-vertical-timeline-component/style.min.css';

import { SEO } from '../components/shared/SEO';
import Nav from '../components/shared/Nav';
import ResponsiveWrapper from '../components/shared/ResponsiveWrapper';
import ExperienceMap from '../components/home/ExperienceMap';

library.add(faChevronLeft);

const RootIndex = (props) => {
  // const imageProps = props.data.allContentfulAsset.edges
  //   .filter((item) => item.node.title !== 'logo-bah')
  //   .reduce((node, item) => ({ ...node, [item.node.title]: item.node.fluid }), {});
  // const { menuLinks } = props.data.site.siteMetadata;
  // svg should always be the map build from test_data, but the parent of children on line 213 should change dynamically.
  return (
    <>
      <SEO siteMetadata={'test'} />
      <ResponsiveWrapper page="home">
        {/* <Nav imageProps={imageProps} links={menuLinks} /> */}
        <ExperienceMap />
      </ResponsiveWrapper>
    </>
  );
};

export default RootIndex;
