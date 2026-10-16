const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  getUnderlyingList() {
    let current = this.head;
    let plainHead = null;
    let prev = null;

    while (current) {
      const node = { value: current.value, next: null };
      if (prev) {
        prev.next = node;
      } else {
        plainHead = node;
      }
      prev = node;
      current = current.next;
    }

    return plainHead;
  }

  enqueue(value) {
    const newNode = new ListNode(value);

    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;

    if (!this.head) {
      this.head = newNode;
    }
    this.size++;
  }

  dequeue() {
    if (!this.head) {
      return;
    }

    const value = this.head.value;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    return value;
  }
}

module.exports = {
  Queue,
};
