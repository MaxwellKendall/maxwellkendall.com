import React, { useContext, useEffect, useState } from "react";
import { Link, graphql } from "gatsby";
import Img from 'gatsby-image';
import moment from 'moment';

import { Header } from "../components/blog/Header";
import { Footer } from "../components/blog/Footer";
import { ThemeContext } from "../../gatsby-browser";
import ExperienceMap from "../components/home/ExperienceMap";

import "../styles/index.scss";
import { SEO } from "../components/shared/SEO";

const useMapDimensions = () => {
  const [mapDimensions, setMapDimensions] = useState({ mapHeight: 0, mapWidth: 0 });

  const setDimensions = (viewPort) => {
    if (viewPort && viewPort < 900) {
      setMapDimensions({
        mapHeight: 300,
        mapWidth: viewPort - 100
      });
    } else if (viewPort) {
      setMapDimensions({
        mapHeight: 500,
        mapWidth: 800
      });
    } else {
      setMapDimensions({
        mapHeight: 0,
        mapWidth: 0
      });
    }
  }

  useEffect(() => {
    if (window) {
      setDimensions(window.innerWidth);
      window.addEventListener('resize', () => {
        setDimensions(window.innerWidth);
      })
    }
  }, [])

  return mapDimensions;
}

const RootIndex = ({ data }) => {
  const { izOffHrs } = useContext(ThemeContext);
  const { siteMetadata } = data.site;
  const mapDimensions = useMapDimensions()
  return (
      <SEO siteMetadata={siteMetadata}>
        <Header izOffHrs={izOffHrs} />
          <div className="w-full about flex flex-wrap mx-auto justify-center items-center">
          <ExperienceMap {...mapDimensions} />
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
