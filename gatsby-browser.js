import React, { useEffect, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import moment from 'moment';
import vsDark from 'prism-react-renderer/themes/vsDark';
import Highlight, { defaultProps } from "prism-react-renderer";

export const izOffHrs = () => (
    moment().day() >= 6 || moment().hour() >= 17
);

require("github-markdown-css");

export const ThemeContext = React.createContext({ izOffHrs: izOffHrs() });

const SyntaxHighlighter = (props) => {
    const className = props.children.props.className || "";
    const matches = className.match(/language-(?<lang>.*)/);
    
    return (
        <Highlight
            {...defaultProps}
            theme={vsDark}
            code={props.children.props.children.trim()}
            language={
            matches && matches.groups && matches.groups.lang
                    ? matches.groups.lang
                    : ""
            }>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            <div className="line-number">{i + 1}</div>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                        ))}
                    </div>
                ))}
            </pre>
            )}
        </Highlight>
    );
}

const components = {
    pre: (props) => <SyntaxHighlighter {...props} />
};

export const wrapRootElement = ({
    element
}) => {
    return (
        <ThemeContext.Provider value={{ izOffHrs: izOffHrs() }}>
            <MDXProvider components={components}>
                {element}
            </MDXProvider>
        </ThemeContext.Provider>
    );
};
