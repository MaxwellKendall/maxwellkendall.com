# 🧠 Two Pointers — Coding Memes (Grammar Stage)

> Learn the form, not the problem. Each meme is a reusable structure.

---

## 🧩 Meme 1: Converging Two Pointers (Palindrome Check)

### Use Case

* Check if a string or array is symmetrical from both ends
  📁 [`~/two-pointers/is-palindrome`](https://github.com/MaxwellKendall/leetcode/tree/main/two-pointers/is-palindrome)

### Pattern

```ts
function isPalindrome(s: string): boolean {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

### Key Features

* Two pointers start at both ends and move inward
* Compares values until they meet

---

## 🧩 Meme 2: Parallel Pointers in Sorted Arrays (Merge)

### Use Case

* Merge two sorted arrays or lists
  📁 [`~/two-pointers/merge-sorted-array`](https://github.com/MaxwellKendall/leetcode/tree/main/two-pointers/merge-sorted-array)

### Pattern

```ts
function mergeSorted(arr1: number[], arr2: number[]): number[] {
  let i = 0, j = 0, merged: number[] = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) merged.push(arr1[i++]);
    else merged.push(arr2[j++]);
  }
  return [...merged, ...arr1.slice(i), ...arr2.slice(j)];
}
```

### Key Features

* Traverse both arrays simultaneously
* Used in merge sort, sorted intersection/union

---

## 🧩 Meme 3: Fast and Slow Pointers (Cycle Detection)

### Use Case

* Detect cycles in a linked list or repeated state
  📁 [`~/linked-lists/linked-list-cycle`](https://github.com/MaxwellKendall/leetcode/tree/main/linked-lists/linked-list-cycle)

### Pattern

```ts
function hasCycle(head: ListNode | null): boolean {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

### Key Features

* One pointer moves 1 step, the other moves 2 steps
* If there's a cycle, they will meet

---

## 🧩 Meme 4: Deduplicate Sorted Array (In-Place Write)

### Use Case

* Remove duplicates in-place from a sorted array
  📁 [`~/two-pointers/remove-duplicates`](https://github.com/MaxwellKendall/leetcode/tree/main/two-pointers/remove-duplicates)

### Pattern

```ts
function removeDuplicates(nums: number[]): number {
  let write = 1;
  for (let read = 1; read < nums.length; read++) {
    if (nums[read] !== nums[read - 1]) {
      nums[write] = nums[read];
      write++;
    }
  }
  return write;
}
```

### Key Features

* Write pointer trails read pointer
* In-place deduplication

---

## 🧩 Meme 5: Partition Array by Condition (Dutch Flag / Two Color)

### Use Case

* Reorder an array into two partitions (e.g., evens/odds, 0s/1s)
  📁 [`~/two-pointers/sort-colors`](https://github.com/MaxwellKendall/leetcode/tree/main/two-pointers/sort-colors)

### Pattern

```ts
function partition(nums: number[]): void {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    if (nums[left] % 2 === 0) {
      left++;
    } else {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      right--;
    }
  }
}
```

### Key Features

* In-place partitioning
* Swap elements based on a binary condition

---

More memes coming soon. These are your building blocks — internalize their structure.

Next up: Sliding Window coding memes?
