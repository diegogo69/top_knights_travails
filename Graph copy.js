/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
import sqrEdges from './getValidMoves.js';
import Queue from './Queue.js';
import LinkedList from './LinkedList.js';

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

    const visited = [...Array(BOARD_SIZE)]
      .map(() => [...Array(BOARD_SIZE)]);

    const srcSqr = { rowcol: srcRowcol, parent: null };
    queue.add(srcSqr);
    visited[srcSqr.rowcol[0]][srcSqr.rowcol[1]] = srcSqr;

    while (queue.length()) {
      const validMove = queue.get();

      if (validMove.rowcol === destRowcol) {
        const pathList = new LinkedList();
        let tmpSqr = validMove;

        while (tmpSqr.parent !== null) {
          pathList.prepend([tmpSqr.rowcol[0], tmpSqr.rowcol[1]]);
          tmpSqr = visited[tmpSqr.parent[0]][tmpSqr.parent[1]];
        }

        pathList.prepend([srcRowcol[0], srcRowcol[1]]);

        return pathList.map((node) => node.value);
      }

      const sqrValidMoves = this.adjList[validMove.rowcol[0]][validMove.rowcol[1]];

      const sqrChildren = sqrValidMoves
        .map((edge) => `${edge.value.row}${edge.value.col}`)
        .map((sqr) => ({ rowcol: sqr, parent: validMove.rowcol }));

      sqrChildren.forEach((sqrChild) => {
        if (visited[sqrChild.rowcol[0]][sqrChild.rowcol[1]]) return;

        visited[sqrChild.rowcol[0]][sqrChild.rowcol[1]] = sqrChild;
        queue.add(sqrChild);
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
