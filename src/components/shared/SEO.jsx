import React from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';

import { getBio } from '../../graphql';

const isInclusivelyAfter5 = moment().hour() >= 17;
const isWeekend = (moment().isoWeekday() === 6 || moment().isoWeekday() === 7);

export const SEO = ({ siteMetadata }) => {
    const { headShots } = getBio();
    const image = (isInclusivelyAfter5 || isWeekend) ? headShots[1] : headShots[0];

    return (
        <React.Fragment>
            <Helmet>
                {/* General tags */}
                <title>{siteMetadata.title}</title>
                <meta name="description" content={siteMetadata.description} />
                {/* <meta name="image" content={image.file.url} />
                <link rel="canonical" href={image.file.url} /> */}

                {/* OpenGraph tags */}
                {/* <meta property="og:url" content={url} />
                {isBlogPost ? <meta property="og:type" content="article" /> : null}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="fb:app_id" content={seo.social.fbAppID} /> */}

                {/* Twitter Card tags */}
                {/* <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content={seo.social.twitter} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} /> */}
            </Helmet>
        </React.Fragment>
    );
}