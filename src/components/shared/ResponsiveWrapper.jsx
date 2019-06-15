import React, { useEffect, useState } from "react";
import { debounce } from "lodash";

import Nav from "./Nav";
import ExperienceMap from "../home/ExperienceMap";

const breakpoint = 780;

const homePagePadding = 48; // 2x nav padding of 2em or 24px

const classMap = {
  home: "home-page__container",
  blog: "blog-page__container",
  blogPost: "blog-post__container"
};

const ResponsiveWrapper = ({ children, page }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isMobile = () => {
    if (windowWidth <= breakpoint) {
      return true;
    } else if (windowWidth > breakpoint) {
      return false;
    }
  };

  const updateWindowWidth = () => setWindowWidth(window.innerWidth);

  const registerResize = () => {
    window.addEventListener("resize", debounce(updateWindowWidth, 100));
  };

  useEffect(() => {
    registerResize();
  }, []);

  const getMapWidth = () => {
    if (isMobile()) {
      return windowWidth * 0.95;
    }
    return windowWidth / 2;
  };

  const getNavWidth = () => {
    if (isMobile()) return windowWidth;
    return windowWidth * 0.25;
  }

  return (
    <div
      style={{ left: isMobile() ? 0 : getNavWidth() + homePagePadding }}
      className={classMap[page]}
      id="app">
      {children.map(child => {
        const { type } = child;
        if (type === Nav) {
          return React.cloneElement(child, {
            isMobile: isMobile(),
            navWidth: getNavWidth()
          });
        } else if (type === ExperienceMap) {
          return React.cloneElement(child, {
            isMobile: isMobile(),
            mapWidth: getMapWidth(),
            mapHeight: 600
          });
        }
      })}
    </div>
  );
};

export default ResponsiveWrapper;
