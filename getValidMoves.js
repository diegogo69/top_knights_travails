// eslint-disable-next-line import/extensions
import LinkedList from './LinkedList.js';

const SIZE = 8;

const getValidMoves = function sqrEdges({ row, col }) {
  // Squares are represented as a [row][col] element within a 2d-arr
  // Each square represents a node in the graph
  // Each stores a reference to a linked list containing its edges
  // Edges refere
  const edges = new LinkedList();
  let top;
  let bottom;
  let left;
  let right;

  switch (row) {
    case 0:
    case 1:
      top = row;
      bottom = 2;
      break;
    case 6:
    case 7:
      top = 2;
      bottom = Math.abs(row - (SIZE - 1));
      break;
    default:
      top = 2;
      bottom = 2;
  }

  switch (col) {
    case 0:
    case 1:
      left = col;
      right = 2;
      break;
    case 6:
    case 7:
      left = 2;
      right = Math.abs(col - (SIZE - 1));
      break;
    default:
      left = 2;
      right = 2;
  }

  // console.log(top, bottom, left, right);

  if (top > 1) {
    if (left > 0) {
      edges.prepend({ row: row - 2, col: col - 1 });
    }

    if (right > 0) {
      edges.prepend({ row: row - 2, col: col + 1 });
    }
  }

  // Add edge nodes. Each containing a value of {row, col}
  // Representing the 2d-index of a square wich is a valid move
  if (right > 1) {
    if (top > 0) {
      edges.prepend({ row: row - 1, col: col + 2 });
    }

    if (bottom > 0) {
      edges.prepend({ row: row + 1, col: col + 2 });
    }
  }

  if (bottom > 1) {
    if (right > 0) {
      edges.prepend({ row: row + 2, col: col + 1 });
    }

    if (left > 0) {
      edges.prepend({ row: row + 2, col: col - 1 });
    }
  }

  if (left > 1) {
    if (bottom > 0) {
      edges.prepend({ row: row + 1, col: col - 2 });
    }

    if (top > 0) {
      edges.prepend({ row: row - 1, col: col - 2 });
    }
  }

  return edges;
};

export default getValidMoves;
