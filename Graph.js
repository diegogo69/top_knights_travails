import sqrEdges from "./sqrEdges.js";
import Queue from "./Queue.js";

const SIZE = 8;

class Graph {
  adjList = Graph.init();

  static init() {
    // Create adjacency list base structure. An array of size SIZE
    // Make each element in adjList and array of size SIZE
    // Iterate over 2d empty matrix and populate with edges
    const adjList = [];

    for (let row = 0; row < SIZE; row++) {
      adjList[row] = [];
      for (let col = 0; col < SIZE; col++) {
        adjList[row][col] = sqrEdges({ row, col });
      }
    }

    return adjList;
  }

  bfs(src, dest) {
    const queue = new Queue();
    const visited = new Array(8).fill(new Array(8).fill(false));
    let steps = 0;

    // Destiny node 2d-index
    // const destRowcol = `${dest.row}${dest.col}`;
    // String representing 2d-index yx / rowcol
    // let srcRowcol = `${src.row}${src.col}`;
    const destRowcol = dest;
    const srcRowcol = src;
    queue.add({ index: srcRowcol, parent: null });

    // Node is a rowcol string
    let nodeStr = queue.get();

    // While queue is not empty
    while (nodeStr !== undefined) {

      if (visited[nodeStr.index[0]][nodeStr.index[1]]) {
        nodeStr = queue.get();
        continue;
      }

      // Compare current node to destination
      if (nodeStr.index === destRowcol) {
        console.log(`Found in ${steps} steps`);

        let strPath = `${nodeStr.index}`;
        let tmp = visited[nodeStr.parent[0]][nodeStr.parent[1]];

        // reconstruct node path using parent prop
        while(tmp.parent !== null) {
          strPath = `${tmp.index} -> ${strPath}`;
          tmp = visited[tmp.parent[0]][tmp.parent[1]];
        }

        console.log('PATH???');
        strPath = `${srcRowcol} -> ${strPath}`;
        console.log(strPath);
        return steps;
      }

      // Add children to queue
      const sqr = this.adjList[nodeStr.index[0]][nodeStr.index[1]];
      sqr.forEach((edge) => {
        const edgeRowcol = `${edge.value.row}${edge.value.col}`;
        queue.add({ index: edgeRowcol, parent: nodeStr.index });
      });

      steps += 1;
      // Visit node
      visited[nodeStr.index[0]][nodeStr.index[1]] = { ...nodeStr };
      nodeStr = queue.get();
    }

    console.log('Not found :(');
    return steps;
  }

  knightMoves(srcIndex, destIndex) {
    const srcRowcol = srcIndex.join().replaceAll(",", "");
    const destRowcol = destIndex.join().replaceAll(",", "");

    const steps = this.bfs(srcRowcol, destRowcol);
    console.log("Steps");
    return steps;
  }
}

export default Graph;
