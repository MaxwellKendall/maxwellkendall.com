import React, { Component } from 'react';
import { graphql } from "gatsby"
import Nav from "../components/shared/Nav";
class RootIndex extends Component {
    render() {
        console.log('props: ', this.props.data)
        const imageProps = this.props.data.allContentfulAsset.edges.reduce(
          (node, item, index) => ({
            ...node,
            [index + 1]: item.node.fluid
          }),
          {}
        );
        const { menuLinks } = this.props.data.site.siteMetadata;
        return (
            <div id="app">
                <Nav imageProps={imageProps} links={menuLinks}/>
                <div className="home__container">
                  <h1>Hi, I'm Max.</h1>
                </div>
            </div>
        );
    }
}

export default RootIndex;

export const pageQuery = graphql`
         query getHeaderData {
           allContentfulAsset(
             filter: { title: { in: ["header_1", "header_2"] } }
           ) {
             edges {
               node {
                 fluid {
                   ...GatsbyContentfulFluid
                 }
               }
             }
           }
           site {
             siteMetadata {
               menuLinks {
                 name
                 link
               }
             }
           }
         }
       `;