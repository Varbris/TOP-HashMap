import { Node, LinkedList } from "./LinkedList.js";

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  set(key, value) {
    if (typeof key !== "string") {
      try {
        throw new Error("key type Error, use string instead");
      } catch (err) {
        console.log(err.message);
      }
      return;
    }
    const index = this.hash(key) % this.buckets.length;
    if (this.buckets[index] == undefined) {
      this.buckets[index] = { key: key, value: value };
    } else if (
      this.buckets[index].key !== key &&
      this.buckets[index].key !== undefined
    ) {
      const previous_data = this.buckets[index];
      const list = new LinkedList();
      list.append(previous_data);
      list.append({ key, value });
      this.buckets[index] = list;
    } else {
      let current = this.buckets[index];

      if (current instanceof Node || current instanceof LinkedList) {
        current = this.buckets[index].head;
        while (current !== null) {
          if (current.value.key == key) {
            current.value.value = value;
          }
          current = current.nextNode;
        }
      } else if (current.key == key) {
        current.value = value;
      }
    }
  }

  get(key) {
    let arr = this.buckets
      .filter(function (data) {
        if (data === undefined) {
          return false;
        } else if (data.key == key) {
          return true;
        } else if (data instanceof LinkedList) {
          let current = data.head;
          while (current !== null) {
            if (current.value.key == key) {
              return current.value;
            }
            current = current.nextNode;
          }
        }
      })
      .map(function (data) {
        if (data instanceof LinkedList) {
          let current = data.head;
          while (current !== null) {
            if (current.value.key == key) {
              return current.value.value;
            }
            current = current.nextNode;
          }
        } else {
          return data.value;
        }
      })
      .find((data) => data);

    return arr == undefined ? null : arr;
  }

  has(key) {
    let arr = this.buckets
      .filter(function (data) {
        if (data === undefined) {
          return false;
        } else if (data.key == key) {
          return true;
        } else if (data instanceof LinkedList) {
          let current = data.head;
          while (current !== null) {
            if (current.value.key == key) {
              return current.value;
            }
            current = current.nextNode;
          }
        }
      })
      .map(function (data) {
        if (data instanceof LinkedList) {
          let current = data.head;
          while (current !== null) {
            if (current.value.key == key) {
              return true;
            }
            current = current.nextNode;
          }
        } else if (data instanceof Object) {
          return true;
        } else {
          return false;
        }
      })
      .find((data) => data);
    return arr == undefined ? false : arr;
  }

  length() {
    let result = 0;
    this.buckets.forEach(function (data) {
      if (data instanceof LinkedList) {
        let current = data.head;

        while (current !== null) {
          if (current.value.hasOwnProperty("key")) {
            result++;
          }
          current = current.nextNode;
        }
      }
      if (data.hasOwnProperty("key")) {
        result++;
      }
    });

    return result;
  }
  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      delete this.buckets[i];
    }
  }
}

const myHashMap = new HashMap();
myHashMap.set("Rama", "test1");
myHashMap.set("yomas", "test3");
myHashMap.set("Sita", "test");
console.log(myHashMap.clear());
