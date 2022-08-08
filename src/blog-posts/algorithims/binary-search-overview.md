---
title: Binary Search Overview
tags: cs fundamentals
featuredImage: ../../images/fundamentals.png
date: '2022-05-31'
---

This algorithm can be applied to any scenario where you can "make a binary decision to shrink the search range". The main logic in this problem domain can be reduced to finding the "boundary in an array". What constitutes the boundary is variable.

For example, given an array of booleans, identify the first index with the value of true:

```javascript

fn([false, false, true])
// => 2
```

Or, given an array of sorted integers, find the index of a given target:

```javascript

fn([1,2,3,4], 4)
// => 3
```

The solution requires a simple while loop which executes so long as the `base condition` evaluates to true. This would be when the two pointers

```javascript
function firstNotSmaller(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let rtrn = -1;
    while (left <= right) {
      let mid = Math.trunc((right + left) / 2);
      if (arr[mid] >= target) {
          rtrn = mid;
          right = mid - 1;
      } else {
          left = mid + 1;
      }
    }
    return rtrn;
}
````

