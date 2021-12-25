import { LinkedList } from "./index";

const myList = new LinkedList<string>("one");
myList.append("two");
myList.append("three");
myList.append("four");
myList.append("five");
myList.preprend("six");
console.log(myList.get(3));
console.log(myList.insert("inserted", 3))
console.log(myList.pop());
console.log(myList.shift());
console.log(myList.remove(2))


myList.print();