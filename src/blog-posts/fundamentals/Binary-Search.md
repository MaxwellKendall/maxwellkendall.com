---
title: Binary Search Algorithim
tags: public, cs fundamentals
featuredImage: ../../images/fundamentals.png
date: '2022-05-03'
---

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const decrementIndex = (i) => {
    return i > 0 ? i - 1 : i;
};

const isInTerminalState = (start, end) => {
    return (
        start === end
    );
}

const properIndex = (lastValue, target, i) => {
    if (lastValue === target) return i;
    // not i - 1 b/c we are appending to the array and replacing the current index with this new value    
    if (lastValue > target) return i;
    return i + 1;
}

var searchInsert = function(nums, target, start = null, end = null) {
    const startIndex = start === null ? 0 : start;
    const endIndex = end === null ? nums.length - 1 : end;
    if (isInTerminalState(startIndex, endIndex)) {
        return properIndex(nums[endIndex], target, endIndex);
    }
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    if (nums[middleIndex] === target){
        return middleIndex;
    }
    if (nums[middleIndex] > target) {
        return searchInsert(nums, target, 0, decrementIndex(middleIndex))
    }
    
    return searchInsert(nums, target, middleIndex + 1, endIndex)
};

```