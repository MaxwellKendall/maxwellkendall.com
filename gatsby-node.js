const Promise = require('bluebird');
const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  console.log('this is tha node', node);
  // Ensures we are processing only markdown files
  if (node.internal.type === 'MarkdownRemark') {
    // Use `createFilePath` to turn markdown files in our `/blog` directory into `/blog/slug`
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'blog/',
    });

    // Creates new query'able field with name of 'slug'
    createNodeField({
      node,
      name: 'slug',
      value: `/blog${relativeFilePath}`,
    });
  }
};

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;

//   return new Promise((resolve, reject) => {
//     const blogPost = path.resolve('./src/templates/blog-post.js');
//     graphql(
//       `
// 				{
// 					allContentfulBlogPost {
// 						edges {
// 							node {
// 								title
// 								slug
// 							}
// 						}
// 					}
// 				}
// 			`,
//     )
//       .then((result) => {
//         if (result.errors) {
//           console.log(result.errors);
//           reject(result.errors);
//         }

//         console.log('RESULT : **** ', result);

//         const posts = result.data.allContentfulBlogPost.edges;
//         posts.forEach((post, index) => {
//           createPage({
//             path: `/blog/${post.node.slug}/`,
//             component: blogPost,
//             context: {
//               slug: post.node.slug,
//             },
//           });
//         });
//       })
//       .catch((err) => {
//         console.log('error from ya boi: ', err);
//       });
//   });
// };
