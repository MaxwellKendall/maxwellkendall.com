import React, { useEffect, useState } from "react";
import { throttle } from "lodash";

const breakpoint = 780;
const maxMapWidth = 800;
const mapPadding = 10;

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
    window.addEventListener("resize", throttle(updateWindowWidth, 100));
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
        const { name } = child.type;
        if (name === "Nav") {
          return React.cloneElement(child, {
            isMobile: isMobile(),
            navWidth: getNavWidth()
          });
        } else if (name === "ExperienceMap") {
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
