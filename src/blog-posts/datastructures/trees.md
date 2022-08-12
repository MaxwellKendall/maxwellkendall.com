---
title: Trees
tags: cs fundamentals
featuredImage: ../../images/fundamentals.png
date: '2022-08-09'
---

A tree is similar to a LinkedList in that each node contains references to other nodes. It is different from a LinkedList in that it may contain a reference to more than one

> What is a binary tree?
> A tree where each node has two children.

## Traversal Strageties
- In Order: left, current, right
- Pre Order: current, left, right
- Post Order: left, right, current

## Depth First Search (DFS)
Depth first search is an algorithim which implements `pre-order traversal` and `backtracking`. We look at the deepest node first, then we back track and look at the other paths on the ancestor nodes.

## Code Examples
Inverting a tree:
```javascript
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (!root) return null;
    
    const left = root.left;
    root.left = root.right;
    root.right = left;
    
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
     
};
```

With a LinkedList, the easiest way to traverse is via a `while` loop, whereas in this case it appears the easiest way to traverse is via recursion as the same logic applies to each child. 

Within this data structure, this is where Depth First Search (DFS) -- recursive and iterative -- and Breadth First Search (BFS) come into play.

1. DFS with Recursion:
```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root, depth = 0) {
    let counter = depth;
    if (!root) {
        return counter;
    } else {
        counter++;
    }
    
    const left = maxDepth(root.left, counter);
    const right = maxDepth(root.right, counter);
    
    if (left > right) return left;
    return right;
};
```
2. Iterative DFS
Uses "pre-order" depth first search where we arbitrarily look at the left side first. 

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    let stack = [[root, 1]]; // first in last out (this is how js arrays work by default)
    let counter = 0;
    while (stack.length) {
        const [node, depth] = stack.pop();
        node && node.left ? stack.push([node.left, depth + 1]) : null;
        node && node.right ? stack.push([node.right, depth + 1]) : null;
        
        if (node) {
            counter = Math.max(counter, depth);
        }
    }
    return counter;
};
```


3. BFS 
Benefit of this approach is only that we don't use recursion. Recursion is considered a "stack" because of the "call stack" which it utilizes under the hood. In this case, we end up using a `queue` instead of a stack.

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    let counter = 0;
    let queue = [root];
    while (queue.length) {
        for (var i = 0; i < queue.length; i++) {
            // hacky - remove the first item in array. Like python dequeue.popleft()
            const node = queue[0];
            queue = queue.slice(1);
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
            
        }
        counter++;
    }
    return counter;
};
```