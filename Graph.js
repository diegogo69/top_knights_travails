/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
import sqrEdges from './sqrEdges.js';
import Queue from './Queue.js';

const BOARD_SIZE = 8;

class Graph {
  adjList = Graph.init();

  // Initialize chessboard graph representation as an adjacency list
  static init() {
    // Test initialization using built-in iterative methods instead of a for loop
    // const adjList = [...new Array(BOARD_SIZE)].map(() => [...new Array(BOARD_SIZE)]);
    // adjList.forEach((rowEl, row) => {
    //   adjList[row].forEach((colEl, col) => {
    //     adjList[row][col] = sqrEdges({ row, col });
    //   });
    // });

    // Declare adjacency list wich will represent a chessboard
    // It is a two dimensional array of size BOARD_SIZE x BOARD_SIZE
    // Each of its elements wich represent a chessboard square
    // Is populated with a linked list of nodes
    // Each containing the valid knight moves from that square
    const adjList = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
      adjList[row] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        adjList[row][col] = sqrEdges({ row, col });
      }
    }

    return adjList;
  }

  // Breadth First Search traversal algorithm applied to find a shortest path
  // It traveses the graph by continuely dequeuen nodes from a queue
  // Queue starts with the given source, and for each dequeued node add its children into the queue
  // Nodes are enqueued only if the hasn't been added to queue before
  // visited two dimensional array is used to check if the nodes have already been enqueued
  bfs(src, dest) {
    // src and dest are strings of format 'yx', each represent a row and column index respectively
    // Assigned to constant variables for semantic meaning
    const srcRowcol = src;
    const destRowcol = dest;

    const queue = new Queue();

    // Initialize non-sparsed 2 dimensional array
    const visited = [...new Array(BOARD_SIZE)]
      .map(() => [...new Array(BOARD_SIZE)]);

    // Use objects that store the square index and the square from wich it was enqueued
    // This will be used to recreate the shortest path in reverse order, from dest to src
    // They are added to visited array, to set them as visited and retrieve its parent later
    const srcSqr = { index: srcRowcol, parent: null };
    queue.add(srcSqr);
    visited[srcSqr.index[0]][srcSqr.index[1]] = srcSqr;

    let steps = 0;
    // While queue is not empty
    while (queue.length()) {
      const validMove = queue.get();

      // Check if current square match destination
      if (validMove.index === destRowcol) {
        console.log(`Found in ${steps} steps`);

        // Recreate the path backwards from dest to src
        // Use a string that will later be
        const pathArr = [];
        let tmpSqr = validMove;

        // reconstruct node path backwards from dest to src
        while (tmpSqr.parent !== null) {
          pathArr.unshift([tmpSqr.index[0], tmpSqr.index[1]]);
          tmpSqr = visited[tmpSqr.parent[0]][tmpSqr.parent[1]];
        }

        pathArr.unshift([srcRowcol[0], srcRowcol[1]]);

        console.log(`Steps: ${steps}`);

        return pathArr;
      }

      // Get valid moves from current square
      const sqrValidMoves = this.adjList[validMove.index[0]][validMove.index[1]];

      // Array of children valid move square objects from current valid sqr
      // Each storing its index, and the square from wich it was added to queue
      const sqrChildren = sqrValidMoves
        .map((edge) => `${edge.value.row}${edge.value.col}`)
        .map((sqr) => ({ index: sqr, parent: validMove.index }));

      // Add valid move to queue if it hasn't been added before (as a valid move of another square)
      sqrChildren.forEach((sqr) => {
        if (!visited[sqr.index[0]][sqr.index[1]]) {
          visited[sqr.index[0]][sqr.index[1]] = sqr;
          queue.add(sqr);
        }
      });

      steps += 1;
    }

    console.log('Not found :(');
    console.log(`Steps: ${steps}`);

    return null;
  }

  knightMoves(srcIndex, destIndex) {
    const srcRowcol = srcIndex.join().replaceAll(',', '');
    const destRowcol = destIndex.join().replaceAll(',', '');

    const pathArr = this.bfs(srcRowcol, destRowcol);

    const pathStr = pathArr.map((yx) => yx.join('')).join(' -> ');

    return { pathArr, pathStr };
  }
}

export default Graph;
