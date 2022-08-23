---
title: Tree Traversal
tags: public, fundamentals
featuredImage: ../../images/fundamentals.png
date: '2022-08-19'
---

When navigating a tree, there are two general paths available: Depth First Search (DFS) and Breadth First Search (BFS). When using DFS, we start from the leaves of the tree and make our way toward the root. Conversely, when using BFS, we terminate our search on the leaves of the tree and look at every sibling node on each level before moving along. DFS and BFS each make use of distinct data structures to manage the program state in such a way that each node is visited in the proper order. Knowing how to traverse this complex data structure requires both a clear vision of the intended path and a sound understanding of the underlying data structures used to chart the way.

## DFS: A Counter Intuitive Path
In both paths we start at the root of the tree. In DFS it is said we "start from the leaves of the tree" because once we reach the leaf level, we have only begun our journey through the nodes. There are two basic steps to this path. First, we make our way to the leaves of the tree. From there, we move onto our second step which is to "backtrack" toward the root again.

When taking this path through a binary tree, there are three orders of traversal which emerge: in-order, pre-order, and post-order. A path is said to be "in order" when it looks at the left node first, root node second, and right node third. This can be shortened to `left-root-right` (LRR). With this understood, we can infer post-order as the reverse, `right-left-root` (RRL), and pre-order as `root-left-right` (RLR).

It is difficult (at least for me) to conceive of this path at the tree level. It is much easier is to reduce the complexity to a single node and apprehend the order from there. That said, when working with trees, it is very important to be able to visualize the available paths which one can take.

### Examples
```javascript
const inOrderRecursive = (root) => {
    // append left subtree to of the stack 
    if (root.leftChild) {
      inOrderRecursive(root.leftChild);
    }

    // print current node
    console.log(`Current node: ${root.val}`);
    
    // append right subtree to the top of the stack 
    if (root.rightChild) {
      inOrderRecursive(root.rightChild);
    }
  }

const inOrderIterative = (root) => {
  const stack = [];

  while (root || stack.length) {
    if (root) {
      stack.push(root);
      root = root.left;
      continue;
    }
    const node = stack.pop();
    if (node.right) {
      stack.push(node.right);
    }
    console.log(`Current node: ${node.val}`);
  }
}
const recursivePreOrder = (root) => {
  // print root node
  console.log(root.val);
  
  // print all nodes in left subtree 
  if (root.leftChild) {
    recursivePreOrder(root.leftChild);
  }

  // print all nodes in right subtree
  if (root.rightChild) {
    recursivePreOrder(root.rightChild);
  }
}

const iterativePreOrder = (root) => {
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const next = stack.pop();
    console.log(`Current Node: ${next.val}`);
    if (next.left) {
      stack.push(next.left);
    }
    if (next.right) {
      stack.push(next.right);
    }
  }
}

const postOrderRecursive = (root) => {
  // print all nodes in right subtree
  if (root.rightChild) {
    postOrderRecursive(root.rightChild);
  }
  
  // print all nodes in left subtree 
  if (root.leftChild) {
    postOrderRecursive(root.leftChild);
  }

  // print root node
  console.log(root.val);
}

const postOrderIterative = (root) => {
  const stack = [];

  while (root || stack.length) {
    if (root) {
      // append the entire right subtree to the stack + root node
      stack.push(root);
      root = root.right;
      continue;
    }
    const node = stack.pop();
    if (node.left) {
      stack.push(node.left);
    }
    console.log(`Current node: ${node.val}`);
  }
}
```

## DFS: Under the Hood
Whether we are implementing a recursive or iterative DFS, iwe are making use of the `stack` data structure. What's distinctive about the behavior of a stack is that when you read/remove a node from it, **you always read the last one that was added**. As you can observe above, when we drill down to a leaf-node, the stack is populated with only one side of the tree -- whether left or right. The trick is that before we read the next left/right node, we push to the stack the other node. This means on the next iteration, we read the node's sibling. 