---
title: Linked List Data Structure
tags: cs fundamentals
featuredImage: ../../images/fundamentals.png
date: '2022-05-24'
---
LinkedLists aren't really a thing AFAIK in JavaScript. Implementing them is a pain. There isn't a native data structure that really conforms to its requirements. Nor have I ever seen this implemented
in over 5 years of software engineering. That said, here are some common ways to solve the thing in j
Reverse a linkedlist:
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let ll = head;
    let llReversed = null;
    while(ll) {
        let next = ll.next; // keep the actual next node
        ll.next = llReversed; // Assigning the previous node as the next one
        llReversed = ll; // set to mutated ll
        ll = next; // look at the next node
    }
    return llReversed;
};
```

Merge a linkedList:
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
const nullNode = { val: 0, next: null };

var mergeTwoLists = function(list1, list2) {
    let list3 = nullNode;
    while(list1 && list2) {
        if (list1.val >= list2.val) {
            list3.next = list2;
            list2 = list2.next;
        } else {
            list3.next = list1;
            list1 = list1.next;
        }
        list3 = list3.next;
    }
    list3.next = list1 || list2;
    // b/c JS is pass by reference on line 15, we are able to do this.      
    return nullNode.next;
};
```