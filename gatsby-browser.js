import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import moment from 'moment';
import Highlight, { defaultProps } from "prism-react-renderer";


export const izOffHrs = () => (
    moment().day() >= 6 || moment().hour() >= 17
);

export const getFontColor = (condition) => (
    condition
        ? '#6DA7B5'
        : '#4C6063'
);

require("github-markdown-css");

export const ThemeContext = React.createContext({ izOffHrs: izOffHrs() });

const SyntaxHighlighter = (props) => {
    const className = props.children.props.className || "";
    const matches = className.match(/language-(?<lang>.*)/);

    return (
        <Highlight
            {...defaultProps}
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
