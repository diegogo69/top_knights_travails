import Graph from "./Graph.js";

const g = new Graph();
console.log(g);

// const steps = g.knightMoves([0,0],[3,3]);
// console.log(steps);

// const s2 = g.knightMoves([3,3],[0,0]);
// console.log(s2);

const s3 = g.knightMoves([0,0],[7,7]);
console.log(s3);

console.log('// [[0,0],[2,1],[4,2],[6,3],[7,5],[5,6],[7,7]]')
console.log('// [[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]]')
