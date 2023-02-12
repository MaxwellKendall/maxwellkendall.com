import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import vsDark from 'prism-react-renderer/themes/vsDark';
import Highlight, { defaultProps } from "prism-react-renderer";
import { Helmet } from 'react-helmet';

require("github-markdown-css");

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
        <MDXProvider components={components}>
            {element}
        </MDXProvider>
    );
};
