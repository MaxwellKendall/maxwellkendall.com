---
title: Graphs
tags: cs fundamentals
featuredImage: ../../images/fundamentals.png
date: '2022-09-19'
---

What is a graph?
> Node/verticies + Edges.

What is an edge?
> a connection between two nodes.

A graph functions to illustrate the relationship between things; for instance, a graph may contain nodes representing cities with edges representing the roads connecting them.

There are various kinds of relationships between things, resulting in various kinds of graphs illustrating the variety of relationships; for instance, given the city example above, roads may or may not be one way. For cities with roads that are all one way, we would use a `directed graph` whereas for cities with bi-directional raods, we would use an `undirected graph`. In the former, we can only go from node x to one of its edges. In the latter, we can go from node x to one of its edges, but we can also go back to node x.

## Mental Model

When visualizing a graph we typically use circles with values in the center to represent our nodes and arrows/lines to represent their edges. However, when dealing with graphs in our code, we typically use an `adjacency list` to grasp the data structure:

```javascript
const neighborsByNode = {
    x: ['y', 'z'],
    y: [],
    z: [],
    a: ['e'],
    e: []
    
}
```
What is a neighbor?
> In the above datastructure, a `neighbor` is an `edge` of a given node. So, this means node x is connected to nodes y and z. Likewise, node a is only connected to e, and e has no edges.

## Algorithms

Graph traversal can be done in one of two ways; first, depth first; second, breadth first. In the former, from the starting node, we choose a neighbor and run with it. Following it all the way to its terminal node. Then, once we've gone as far "deep" as we can go, we go back to the starting node and do the same thing for its next neighbor. In the latter, breadth first traversal, we visit all the starting node's neighbors in order.

The difference between these two approaches is `breadth first search explores all directions evenly whereas depth first search favors a single direction`. This means the order in which nodes are visited is vastly different. Using the depth first approach, we go in the same direction for as long as possible before switching directions. In contrast, when using the breadth first approach, we move forward in each direction available, one node at a time, looking at each neighbor, before moving forward.

The implementation of these two different approaches boils down to using either a `queue` for breadth first and a `stack` for depth first search.

### Stacks and Queues

A stack follows the `last in last out` principle of add and remove. It should be visualized as a `vertical` data structure. Imagine a stack of books. When you add to the stack, you cannot really remove the bottom book. Instead, you have to pick up from the top of the stack, then the next from the top and so on until you get to the very bottom.

A queue follows the opposite principle of add and remove: `first in, first out`. A queue should be imagined as a `linear` data structure. Imagine a line at the hot dog stand. When you go into the line, you cannot come out until everyone in front of you has already come out.

These contrasting principles of `add and remove` allow us to implement the two different traversals of a graph:

```javascript
const breadthFirst = (graph, startingPoint) => {
    const queue = [ graph[startingPoint] ];
    while (queue.length) {
        const current = queue.shift(); // queue[0]
        console.log(current.val) // current = { val: 'x', neighbors: [...]}
        if (current.neighbors) {
            queue.push(...current.neighbors)
        }
    }
}

const depthFirst = (graph, startingPoint) => {
    const stack = [ graph[startingPoint] ];
    while (stack.length) {
        const current = stack.pop(); // stack[stack.length - 1]
        console.log(current.val) // current = { val: 'x', neighbors: [...]}
        if (current.neighbors) {
            stack.push(...current.neighbors)
        }
    }
}
```
In the above example, you can see that we always use `.push()` to append the neighbors to the data structure, but the order in which they are removed is completely different. The stack uses `.pop()` for reading/removing and the queue uses `.shift()`. We can accomplish the same behavior by using `.push()` only for stacks and `.unshift()` only for queues and always using `.pop()` for removing/reading. In either implementation, we are following the proper add/remove principle.

## Cycles
An undirected graph has a potential infinite loop -- or cycle -- on every edge. To avoid this, we instantiate a `Set` to mark each node we traverse as visited. You might also have the same issue with a `directed` graph; however, in many cases a graph of this sort will be introduced as `acyclical` so in that case we are prompted to not use a `visited`  set.

## Graph Components
A "component" in a graph is going to be a single node or group of nodes where each 