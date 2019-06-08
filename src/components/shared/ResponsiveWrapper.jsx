import React, { useEffect, useState } from "react";
import { throttle } from "lodash";

const breakpoint = 780;
const maxMapWidth = 800;
const mapPadding = 10;

const homePagePadding = 58; // 2x nav padding of 2em or 24px, + 10 for extra padding

const classMap = {
  home: "home-page__container",
  blog: "blog-page__container",
  blogPost: "blog-post__container"
};

const ResponsiveWrapper = ({ children, page }) => {
  const [isMobile, setIsMobile] = useState(null);
  const [navWidth, setNavWidth] = useState(null);

  const handleResize = () => {
    if (!isMobile && window.innerWidth <= breakpoint) {
      setIsMobile(true);
    } else if ((isMobile || isMobile === null) && window.innerWidth > breakpoint) {
      setIsMobile(false);
    }
  };
  const registerResize = () => {
    if (isMobile === null) {
      handleResize();
    }
    window.addEventListener("resize", throttle(handleResize, 100));
  };

  useEffect(() => {
    if (!navWidth) {
      const width = window.innerWidth * 0.25;
      setNavWidth(width);
    }
    registerResize();
  }, []);

  const getMapWidth = () => {
    const { innerWidth } = window;

    if (isMobile) {
      return innerWidth - mapPadding * 2;
    }

    const normalWidth = innerWidth * 0.75 - mapPadding * 4;

    if (innerWidth > 1024) {
      return maxMapWidth;
    }

    return normalWidth;
  };

  return (
    <div
      style={{ marginLeft: navWidth, paddingLeft: homePagePadding }}
      className={classMap[page]}
      id="app">
      {children.map(child => {
        const { name } = child.type;
        if (name === "Nav") {
          return React.cloneElement(child, {
            isMobile,
            navWidth: navWidth
          });
        } else if (name === "ExperienceMap") {
          return React.cloneElement(child, {
            isMobile,
            mapWidth: getMapWidth(),
            mapHeight: 600
          });
        }
      })}
    </div>
  );
};

export default ResponsiveWrapper;
