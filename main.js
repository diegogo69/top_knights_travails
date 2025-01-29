import Graph from "./Graph.js";

const g = new Graph();
console.log(g);

// const steps = g.knightMoves([0,0],[3,3]);
// console.log(steps);

// const s2 = g.knightMoves([3,3],[0,0]);
// console.log(s2);

const { pathArr, pathStr } = g.knightMoves([0,0],[7,7]);
console.log('Path array:');
console.log(JSON.stringify(pathArr));
console.log('Path string:');
console.log(pathStr);
