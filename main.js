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
      console.log(index, key);
      this.buckets[index] = { key: key, value: value };
    } else if (
      this.buckets[index].key !== key &&
      this.buckets[index].key !== undefined
    ) {
      console.log(index, key);
      const previous_data = this.buckets[index];
      const list = new LinkedList();
      list.append(previous_data);
      list.append({ key, value });
      this.buckets[index] = list;
    } else {
      console.log(index, key);
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
    let arr = this.buckets.find(function (data) {
      if (data == undefined) {
        return false;
      } else if (data.key == key) {
        return true;
      }
    });
    console.log(arr);
  }
}

const myHashMap = new HashMap();
myHashMap.set("Rama", "awokawok");
myHashMap.set("yomas", "awokawok");
myHashMap.set("Sita", "awokawo");
