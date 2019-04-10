import React from 'react'
import Img from 'gatsby-image'

export default ({ data }) => (
  <div className="hero">
    {data.heroImage && (
      <Img
        className="heroImage"
        alt={data.name}
        sizes={data.heroImage.sizes}
      />
    )}
    <div className="heroDetails">
      <h3 className="heroHeadline">{data.name}</h3>
      <p className="heroTitle">{data.title}</p>
      <p>{data.shortBio.shortBio}</p>
    </div>
  </div>
);
