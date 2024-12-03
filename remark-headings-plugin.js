const { toString } = require('mdast-util-to-string');

(async () => {
  const { visit } = await import('unist-util-visit');
  // Use slugify as needed
})();

const transformer = (tree, file) => {
  let headings = [];

  visit(tree, `heading`, (heading) => {
    headings.push({
      value: toString(heading),
      depth: heading.depth,
    });
  });

  const mdxFile = file;
  if (!mdxFile.data.meta) {
    mdxFile.data.meta = {};
  }

  mdxFile.data.meta.headings = headings;
};

const remarkHeadingsPlugin = () => transformer;

module.exports = remarkHeadingsPlugin;
