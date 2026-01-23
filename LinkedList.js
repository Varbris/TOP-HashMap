class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  traversing(node) {
    let temp = node;
    while (temp.nextNode !== null) {
      temp = temp.nextNode;
    }
    return temp;
  }

  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      current = this.traversing(current);
      current.nextNode = newNode;
    }
  }

  prepend(data) {
    let temp;
    if (this.head.nextNode !== null) {
      const newNode = new Node(data);
      temp = this.head;
      newNode.nextNode = this.head;
      this.head = newNode;
    }
  }

  size() {
    let temp = this.head;
    let result = 0;
    while (temp !== null) {
      temp = temp.nextNode;
      result++;
    }
    return result;
  }

  headCheck() {
    if (this.head !== null) {
      return this.head.value;
    } else {
      return undefined;
    }
  }

  tail() {
    if (this.head !== null) {
      let current = this.head;
      current = this.traversing(current);
      return current.value;
    } else {
      return undefined;
    }
  }

  getListLength(list) {
    let length = 0;
    let current = list;
    while (current !== null) {
      current = current.nextNode;
      length++;
    }
    return length;
  }

  at(index) {
    let current = this.head;
    let currentIndex = 0;
    let listLength = this.getListLength(current);

    if (index > listLength) {
      return undefined;
    } else {
      while (current !== null && currentIndex < listLength) {
        if (currentIndex === index) {
          break;
        }
        currentIndex++;
        current = current.nextNode;
      }
    }
    return current === null ? current : current.value;
  }

  pop() {
    if (this.head == null) {
      return undefined;
    }
    let temp = this.head.nextNode;
    this.head = temp;
  }

  contains(value) {
    let current = this.head;
    while (current !== null) {
      if (current.value === value) {
        break;
      }
      current = current.nextNode;
    }
    current = current == null ? current : current.value;
    if (current == null || current !== value) {
      return false;
    } else {
      return true;
    }
  }

  findIndex(value) {
    let current = this.head;
    let currentIndex = 0;
    let foundNode = [];
    while (current !== null) {
      if (current.value === value) {
        foundNode.push(currentIndex);
      }
      current = current.nextNode;
      currentIndex++;
    }
    if (foundNode.length === 0) {
      return -1;
    } else if (foundNode.length > 1) {
      return foundNode[0];
    } else {
      return foundNode[0];
    }
  }

  toString() {
    let current = this.head;
    let value = "";
    while (current !== null) {
      value = value.concat("(", current.value, ")", " ", "-> ");
      current = current.nextNode;
    }
    value = value.concat("null");
    return value;
  }

  insertAt(index, ...value) {
    if (index >= this.size()) {
      try {
        throw new Error("RangeError");
      } catch (err) {
        console.log(err.message);
      }
      return;
    }
    let currentIndex = 0;
    let current = this.head;
    while (current !== null) {
      if (currentIndex === index) {
        break;
      } else {
        currentIndex++;
        current = current.nextNode;
      }
    }
    let temp = current.nextNode;
    current.nextNode = null;
    value.forEach(function (data) {
      const nNode = new Node(data);
      current.nextNode = nNode;
      current = current.nextNode;
    });
    current.nextNode = temp;
  }
  removeAt(index) {
    if (index >= this.size()) {
      try {
        throw new Error("RangeError");
      } catch (err) {
        console.log(err.message);
      }
      return;
    }
    let currentIndex = 0;
    let current = this.head;
    let previous = null;
    while (current !== null) {
      if (currentIndex === index) {
        break;
      } else {
        currentIndex++;
        previous = current;
        current = current.nextNode;
      }
    }
    let temp = current.nextNode;
    if (index === 0) {
      this.head = temp;
    } else {
      previous.nextNode = temp;
      current = previous;
    }
  }
}
