class Queue {
   arr = [];

   add(item) {
    this.arr.push(item);
   }

   get() {
    return this.arr.shift();
   }
}

export default Queue;
