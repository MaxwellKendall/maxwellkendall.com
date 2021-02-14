import React, { useContext } from "react";
import { Link, graphql } from "gatsby";
import Img from 'gatsby-image';
import moment from 'moment';

import { Header } from "../components/blog/Header";
import { Footer } from "../components/blog/Footer";
import { ThemeContext } from "../../gatsby-browser";
import ExperienceMap from "../components/home/ExperienceMap";

import "../styles/index.scss";
import { SEO } from "../components/shared/SEO";

const RootIndex = ({ data }) => {
  const { izOffHrs } = useContext(ThemeContext);
  const { siteMetadata } = data.site;
  return (
      <SEO siteMetadata={siteMetadata}>
        <Header izOffHrs={izOffHrs} />
          <div className="w-full about flex flex-wrap mx-auto justify-center items-center">
            <ExperienceMap />
          </div>
        <Footer izOffHrs={izOffHrs} />
      </SEO>
  );
};

export const pageQuery = graphql`
  query aboutPage {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

export default RootIndex;
