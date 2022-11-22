class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const a = new Node('A');
const b = new Node('B');
const c = new Node('C');
const d = new Node('D');

a.next = b;
b.next = c;
c.next = d;


// A -> B -> C -> D -> NULL
// cur
//     cur
//          cur
//               cur
//                      cur
const printLinkedList = (head) => {
    let current = head;
    
    while(current) {
        console.log(current.val);
        current = current.next
    }
}

const printLinkedListRecursive = (head) => {
    if (head) {
        console.log(head.val)
        printLinkedList(head.next)
    }
}

// printLinkedList(a);
printLinkedListRecursive(a);
