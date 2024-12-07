import React from 'react';
import { GatsbyImage as Img } from 'gatsby-plugin-image';

const Hero = ({ data }) => (
  <div className="hero">
    {data.heroImage && (
      <Img className="heroImage" alt={data.name} sizes={data.heroImage.sizes} />
    )}
    <div className="heroDetails">
      <h3 className="heroHeadline">{data.name}</h3>
      <p className="heroTitle">{data.title}</p>
      <p>{data.shortBio.shortBio}</p>
    </div>
  </div>
);

export default Hero;
