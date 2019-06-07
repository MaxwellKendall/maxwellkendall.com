import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';

const breakpoint = 780;

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

    const responsiveChildren = children.map((child) => React.cloneElement(child, { isMobile }));
    return (
        <React.Fragment>
            {responsiveChildren}
        </React.Fragment>
    );
}

export default ResponsiveWrapper;