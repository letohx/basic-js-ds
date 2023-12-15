const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.nodeRoot = null;
  }

  root() {
    return this.nodeRoot ? this.nodeRoot : null;
  }

  add(data) {
    const nodeNew = new Node(data);

    if (!this.nodeRoot) {
      this.nodeRoot = nodeNew;
      return;
    }

    const insertNode = (nodeCurrent, nodeNew) => {
      if (nodeNew.data < nodeCurrent.data) {
        if (nodeCurrent.left === null) {
          nodeCurrent.left = nodeNew;
          return;
        }
        insertNode(nodeCurrent.left, nodeNew);
      } else if (nodeNew.data > nodeCurrent.data) {
        if (nodeCurrent.right === null) {
          nodeCurrent.right = nodeNew;
          return;
        }
        insertNode(nodeCurrent.right, nodeNew);
      }
    }
    insertNode(this.nodeRoot, nodeNew);
  }

  has(data) {
    const hasNode = (nodeCurrent, data) => {
      if (!nodeCurrent) return false;
      if (nodeCurrent.data === data) return true;

      return nodeCurrent.data > data ?
        hasNode(nodeCurrent.left, data) :
        hasNode(nodeCurrent.right, data);
    }
    return hasNode(this.nodeRoot, data);
  }


  find(data) {
    const findNode = (nodeCurrent, data) => {
      if (!nodeCurrent) return null;
      if (nodeCurrent.data === data) return nodeCurrent;

      return nodeCurrent.data > data ?
        findNode(nodeCurrent.left, data) :
        findNode(nodeCurrent.right, data);
    }
    return findNode(this.nodeRoot, data);
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node.left && !node.right || !node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      }
      if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      }

      if (!node.right) {
        node = node.left;
        return node;
      }
      if (!node.left) {
        node = node.right;
        return node;
      }

      let maxFromLeft = node.left;

      while (maxFromLeft.right) {
        maxFromLeft = maxFromLeft.right;
      }
      node.data = maxFromLeft.data;
      node.left = removeNode(node.left, maxFromLeft.data);
      return node;
    }

    this.nodeRoot = removeNode(this.nodeRoot, data);
  }

  min() {
    if (!this.nodeRoot) return;
    let minNode = this.nodeRoot;
    while (minNode.left) {
      minNode = minNode.left;
    }
    return minNode.data;
  }

  max() {
    if (!this.nodeRoot) return;
    let maxNode = this.nodeRoot;
    while (maxNode.right) {
      maxNode = maxNode.right;
    }
    return maxNode.data;
  }
}

module.exports = {
  BinarySearchTree
};