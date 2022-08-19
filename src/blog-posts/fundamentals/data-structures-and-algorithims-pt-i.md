---
title: Data Structures and Algorithms Pt I
tags: public, fundamentals
featuredImage: ../../images/fundamentals.png
date: '2022-08-19'
---

Whenever we face a given problem, we would be wise to remember that we are not the first people to encounter it! While there may be some unique elements to our given case, problems can be reduced into discrete, finite categories defined by their optimal solution. And while there may be many ways to satisfy a given set of product requirements, not every solution is equally satisfactory. The main concern within software engineering -- and especially within modern web development -- is that of scalability. In other words, how will this feature/program perform given millions of users? Or, how will our application perform given 10x the normal volume of data? The terms used to articulate a response to these questions is `Big O Notation`. This is a mathematical way to express the efficiency of a program in its `upper bound` or "worst case scenario." This notation applies to two dimensions of efficiency: time and space. The optimal solution of a given problem is subject to change depending on which dimension takes priority. In most cases, the time efficiency can be increased at the expense of space efficiency and vice-versa.

In Big O Notation, we perform single variable analysis. This variable is typically referred to as `n` where `n` is the dominant term and represents the size of the input. Other variables exist, but are normally "non-dominant" terms and therefore ignored. The aim in our analysis in Big O is to consider the worst case scenario and optimize for it, not to give a precise, granular definition of the performance. For that, we can rely on tools like benchmarking, observability, and discrete units like milliseconds and so on.

While not exhaustive, these are the most common expressions in Big O.

O(1): remains `constant` regardless of input size.
O(log n): the `log` of the input size.
O(n): increases `linearly` with input size.
O(n^2): `doubles` based on input size.
O(2^n): `exponentially` increases based on input size.

## Array
An array is often the input itself. However, sometimes when the input is a `string` we coerce it into an array to perform the necessary task. When dealing with an array, there are a few observations to make:

1. Beware of Nested Loops
A nested loop is sometimes unavoidable, but this results in O(n^2) runtime which is tough!

2. Is the Array Sorted?
If the array is sorted, you can likely take advantage of that and make a `binary` decision on each iteration whether to look to the left or the right. Two common strategies to take advantage of sorted arrays are `sliding window` and `two pointer`. The former entails looking at an entire subset of the array while the latter typically only requires looking at two elements. In both cases, a `binary` decision is made to go either left or right on the next iteration.

3. Not all Sorts Are Equal
The problem "Sort a given array" is possibly the most common of all. Many people have come up with excellent solutions to this problem. In many cases we rely on the native library's implementation of sort. However it shouldn't be taken for granted, and when performing a sort we should acknowledge what kind of cost is entailed in it.

## Stacks and Queues
A queue is a list which operates in the opposite manner as a stack in relation to `appending` and `lookup`. The names of these data structures are apt in describing their behavior. When entering a queue, you cannot leave the queue until everyone in front of you has left. When adding to a stack of books, you can only access the last one you added until it is removed.

According to what one can `read` relative to when something was added to the list, `stacks` are `last in, last out` and `queues` are `first in, first out`.

In JavaScript, a `stack` uses `pop` whereas a `queue` uses `shift`:

```javascript
  var input = [1,2,3];
  var stack = [];
  var queue = [];
  for (var i = 0; i < input.length; i++) {
    stack.push(input[i]);
    queue.push(input[i]);
  }
  // to read from a stack, you can only look at stack[stack.length - 1]
  stack.pop(); // => 3
  queue.shift(); // => 1
```
## Hash Table (Or Hash Map)
A hash table or a hash map is a dictionary whose key is the result of a `hash function`. The value is an arbitrary data type. The main value of this data structure is the O(1) look up time. Often times this used in sync with an array results in a very common solution.

Here's an example where the hash function used is based on the unicode value of a lowercase letter:

```javascript
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = {};
    strs.forEach((w) => {
        // hashKeyForWord is a key representing the # of letters in the word
        const hashKeyForWord = w
            .split('')
            .reduce((acc, l) => {
                const index = l.charCodeAt() - 'a'.charCodeAt();
                acc[index] = acc[index] + 1;
                return acc;
            }, new Array(26).fill(0))

        map[hashKeyForWord] = map[hashKeyForWord]
            ? map[hashKeyForWord].concat(w)
            : [w]
    });
    return Object.values(map)
};
```

## Trees
Trees are a data structure that is non-linear. They are made up of a few different components:

1. Root Node: no parent
2. Parent Nodes: Node with one or more children
3. Sibling Nodes: Nodes at the same depth
4. Leaf Nodes: Nodes with a parent and no children

Various attributes exist, like "diameter", "height", and "depth." Most of these are pretty straight forward.

There are also various classifications of trees which describe the number of children present on the trees:

1. N-ary Tree: Tree with `n` children. 
2. Complete Tree: All levels except the last have all children. Last level has all children to the left. 
4. Perfect Tree: All levels possess all children

### Traversal Strageties
- In Order: left, current, right
- Pre Order: current, left, right
- Post Order: left, right, current


### Binary Search Tree
This is a specific kind of tree where the left node is greater than the parent node, and the right node is less than the parent node.

## Linked Lists
A LinkedList is a data structure where each node contains a reference (typically under the `next` key) to another node. If `next` is null, the list is done. If the list contains a `previous` key the list is is considered a `doubly linked list`
