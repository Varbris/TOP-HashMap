import { HashMap } from "./HashMap.js";

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("apple", "green");
test.set("banana", "green");
test.set("carrot", "pale orange");
test.set("dog", "chocolate");
test.set("elephant", "brown");
test.set("frog", "blue");
test.set("grape", "green");
test.set("hat", "white");
test.set("ice cream", "pink");
test.set("jacket", "red");
test.set("kite", "yellow");
test.set("lion", "silver");

test.set("moon", "silver");
test.set("star", "white");

console.log(test.capacity);
console.log(test.get("star"));
console.log(test.has("star"));
console.log(test.remove("grape"));
console.log(test.remove("hat"));
test.set("hat", "blue");
console.log(test.length());
// console.log(test.clear());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
