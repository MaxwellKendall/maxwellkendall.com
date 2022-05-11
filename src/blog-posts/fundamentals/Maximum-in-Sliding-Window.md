---
title: Maximum Sliding Window
tags: public, cs fundamentals
featuredImage: ../../images/fundamentals.png
date: '2022-05-011'
---
**Problem Statement:** Given an integer array and a window of size w, find the current maximum value in the window as it slides through the entire array.
**Note:** If the window size is greater than the array size, we will consider the entire array as a single window.

This solution prompts us to use the "two pointers" strategy. The real effort here is kind of handled by `Math.max`. It would be nice to show a solution without using this built in from JS.

**Solution**:

```javascript
let findMaxSlidingWindow = function(nums, windowSize) {
  let left = 0;
  var result = [];
  while (left <= nums.length - windowSize) {   
	  const arr = nums.slice(left, left + windowSize);
	  result.push(Math.max(...arr));
	  left++
  }
  return result;
};
```

