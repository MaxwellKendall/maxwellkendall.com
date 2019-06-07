import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';

const breakpoint = 780;
const maxMapWidth = 800;
const mapPadding = 10;

const ResponsiveWrapper = ({
    children
}) => {
    const [ isMobile, setIsMobile ] = useState(null);
    
    const handleResize = () => {
        if (!isMobile && window.innerWidth <= breakpoint) {
            setIsMobile(true);
        }
        else if ((isMobile || isMobile === null) && window.innerWidth > breakpoint) {
            setIsMobile(false);
        }
    }
    const registerResize = () => {
        if (isMobile === null) {
            handleResize();
        }
        window.addEventListener('resize', throttle(handleResize, 100))
    }
    
    useEffect(() => {
        registerResize();
    }, []);

    const getMapWidth = () => {
        const { innerWidth } = window;

        if (isMobile) {
            return innerWidth - (mapPadding * 2);
        }

        const normalWidth = (innerWidth * .75) - (mapPadding * 4);

        if (innerWidth > 1024) {
            return maxMapWidth;
        }

        return normalWidth;
    }

    const responsiveChildren = children.map((child) => React.cloneElement(child, {
        isMobile,
        mapWidth: getMapWidth(),
        mapHeight: 600
    }));
    return (
        <React.Fragment>
            {responsiveChildren}
        </React.Fragment>
    );
}

export default ResponsiveWrapper;