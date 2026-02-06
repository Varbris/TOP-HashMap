import { Node, LinkedList } from "./LinkedList.js";

export class HashMap {
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
    let lodPaktor = this.length() / this.capacity;
    if (lodPaktor > this.loadFactor) {
      this.capacity = this.capacity * 2;
    }
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

  remove(key) {
    let isRemoved = false;
    this.buckets.forEach(function (data, index, array) {
      if (data instanceof LinkedList) {
        let current = data.head;
        while (current !== null) {
          if (current.value.key === key) {
            if (current.nextNode == null) {
              delete array[index];
              isRemoved = true;
            } else {
              data.pop();
              isRemoved = true;
            }
          }
          current = current.nextNode;
        }
      } else if (data.hasOwnProperty("key") && data.key == key) {
        delete array[index];
        isRemoved = true;
      }
    });
    return isRemoved;
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
  keys() {
    let resultArr = new Array();
    this.buckets.filter(function (data) {
      if (data instanceof LinkedList) {
        let current = data.head;
        while (current !== null) {
          if (current.value.hasOwnProperty("key")) {
            resultArr.push(current.value.key);
          }
          current = current.nextNode;
        }
      } else if (data.hasOwnProperty("key")) {
        resultArr.push(data.key);
      }
    });
    return resultArr;
  }
  values() {
    let arrResult = new Array();
    let arr = this.buckets.filter(function (data) {
      if (data instanceof Object) {
        return true;
      } else {
        return false;
      }
    });

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof LinkedList) {
        let current = arr[i].head;
        while (current !== null) {
          if (current.value.value !== undefined) {
            arrResult.push(current.value.value);
          }
          current = current.nextNode;
        }
      } else {
        arrResult.push(arr[i].value);
      }
    }
    return arrResult;
  }
  entries() {
    let arrResult = new Array();
    let arr = this.buckets.filter(function (data) {
      if (data instanceof Object) {
        return true;
      } else {
        return false;
      }
    });
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof LinkedList) {
        let current = arr[i].head;
        while (current !== null) {
          if (
            current.value.hasOwnProperty("key") &&
            current.value.hasOwnProperty("value")
          ) {
            let itterArr = new Array();
            itterArr.push(current.value.key);
            itterArr.push(current.value.value);
            arrResult.push(itterArr);
          }
          current = current.nextNode;
        }
      } else if (
        arr[i] instanceof LinkedList == false &&
        arr[i].hasOwnProperty("key") &&
        arr[i].hasOwnProperty("value")
      ) {
        let itterArr = new Array();
        itterArr.push(arr[i].key);
        itterArr.push(arr[i].value);
        arrResult.push(itterArr);
      }
    }
    return arrResult;
  }
}
