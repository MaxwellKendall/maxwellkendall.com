[Overall guide](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/#gatsby-related-packages)

- Upgrade gatsby: ✅
- Upgrade plugins: ✅

```shell
 CXXFLAGS="--std=c++14" npm i gatsby-plugin-google-analytics@latest gatsby-plugin-mdx@latest gatsby-plugin-react-helmet@latest gatsby-plugin-sharp@latest gatsby-remark-images@latest gatsby-remark-prismjs@latest gatsby-transformer-remark@latest gatsby-transformer-sharp@latest
```

- Upgrade [Image package](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/) from 'gatsby-plugin-image';

```javascript
import { getImage } from "gatsby-plugin-image"

const image = getImage(data.avatar)

// This is the same as:

const image = data?.avatar?.childImageSharp?.gatsbyImageData
```