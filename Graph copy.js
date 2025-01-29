/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
import sqrEdges from './sqrEdges.js';
import Queue from './Queue.js';

const BOARD_SIZE = 8;

class Graph {
  adjList = Graph.init();

  static init() {
    const adjList = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
      adjList[row] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        adjList[row][col] = sqrEdges({ row, col });
      }
    }

    return adjList;
  }

  bfs(src, dest) {
    const srcRowcol = src;
    const destRowcol = dest;

    const queue = new Queue();

    const visited = [...new Array(BOARD_SIZE)]
      .map(() => [...new Array(BOARD_SIZE)]);

    const srcSqr = { index: srcRowcol, parent: null };
    queue.add(srcSqr);
    visited[srcSqr.index[0]][srcSqr.index[1]] = srcSqr;

    while (queue.length()) {
      const validMove = queue.get();

      if (validMove.index === destRowcol) {
        const pathArr = [];
        let tmpSqr = validMove;

        // reconstruct node path backwards from dest to src
        while (tmpSqr.parent !== null) {
          pathArr.unshift([tmpSqr.index[0], tmpSqr.index[1]]);
          tmpSqr = visited[tmpSqr.parent[0]][tmpSqr.parent[1]];
        }

        pathArr.unshift([srcRowcol[0], srcRowcol[1]]);

        return pathArr;
      }

      const sqrValidMoves = this.adjList[validMove.index[0]][validMove.index[1]];

      const sqrChildren = sqrValidMoves
        .map((edge) => `${edge.value.row}${edge.value.col}`)
        .map((sqr) => ({ index: sqr, parent: validMove.index }));

      sqrChildren.forEach((sqr) => {
        if (!visited[sqr.index[0]][sqr.index[1]]) {
          visited[sqr.index[0]][sqr.index[1]] = sqr;
          queue.add(sqr);
        }
      });
    }

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
