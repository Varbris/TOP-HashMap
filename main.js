import { LinkedList } from "./LinkedList.js";

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
    const index = this.hash(key);
    if (this.buckets[index % this.buckets.length] == undefined) {
      this.buckets[index % this.buckets.length] = { key: key, value: value };
    } else if (
      this.buckets[index % this.buckets.length].key !== key &&
      this.buckets[index % this.buckets.length].key !== undefined
    ) {
      const previous_data = this.buckets[index % this.buckets.length];
      const list = new LinkedList();
      list.append(previous_data);
      list.append({ key, value });
      this.buckets[index % this.buckets.length] = list;
    } else {
      console.log("awikwok");
      console.log(this.buckets[index % this.buckets.length].head.value);
      let current = this.buckets[index % this.buckets.length].head;
      while (current !== null) {
        if (current.value.key == key) {
          current.value.value = value;
        }
        current = current.nextNode;
      }
    }
  }
}

const myHashMap = new HashMap();
myHashMap.set("Rama", "awokawok");
myHashMap.set("Sita", "awokawoks");
myHashMap.set("Sita", "awo");
myHashMap.set("Sita", "awos");
