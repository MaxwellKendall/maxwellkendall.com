---
title: Algorithms Cheat Sheet
tags: interviews
featuredImage: ../../images/psql.png
date: '2023-05-25'
---
## In Place Sort
```javascript
// sort an array in place in DESC order
const sortDesc = (arr) => {
    let min = 0;
    let max = arr.length - 1;
    while (min <= max) {
        let first = arr[min];
        let last = arr[max];
        // ascending order
        if (first < last) {
            arr[min] = last;
            arr[max] = first;
            max--;
        } else if (last < first) {
            max--;
        } else if (min === max) {
            min++;
            max = arr.length - 1;
        } else {
            min++
            last--
        }
    }
}
```