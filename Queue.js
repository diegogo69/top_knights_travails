class Queue {
  arr = [];

  add(item) {
   //  if (Array.isArray(item)) {
   //    this.arr.push(...item);
   //    return;
   //  }

    this.arr.push(item);
  }

  get() {
    return this.arr.shift();
  }

  length() {
   return this.arr.length;
  }
}

export default Queue;
