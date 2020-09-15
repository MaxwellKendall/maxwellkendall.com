import React from "react";
import { Link, graphql } from "gatsby";

import { Header } from "../components/blog/Header";
import { Footer } from "../components/blog/Footer";
import { SEO } from "../components/shared/SEO";

import Img from "gatsby-image";

export default ({
    data: {
        seo,
        resume: {
            childImageSharp: {
                fluid: img
            }
        }
    }
}) => {
    console.log("resume", img)
    return (
        <SEO siteMetadata={seo.siteMetadata}>
            <Img fluid={img} />
        </SEO>
    )
}

export const query = graphql`
    query resumePage {
        seo: site {
            siteMetadata {
                title
                description
            }
        }
        resume: file(name: {eq: "resume"}) {
            childImageSharp {
              fluid(maxWidth: 700) {
                  ...GatsbyImageSharpFluid
              }
            }
          }
        }
`