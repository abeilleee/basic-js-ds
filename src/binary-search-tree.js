const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null; 
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }
    this.insertNode(this.rootNode, newNode);
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) {                               //если слева нет узла добавляю новый туда, если есть запускаю ф-ию рекурсивно
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }


  find(data) {
    return this.searchNode(this.rootNode, data);
  }

  searchNode(node, data) {
    if (!node) {
      return null;
    }
    if (data < node.data) {
      return this.searchNode(node.left, data);
    } else if (data > node.data) {
      return this.searchNode(node.right, data);
    } else {
      return node; 
    }
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (!node) {
      return null;
    }
    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;                                          //найденный узел
    } else {
      if (!node.left && !node.right) {
        return null;                                      //узел не имеющий children
      }
      if (!node.left) {
        return node.right;                                //у узла только right child
      }
      if (!node.right) {                                  //у узла только left child
        return node.left; 
      }
      node.data = this.minNode(node.right).data;            //если у узла two children нахожу минимальный справа
      node.right = this.removeNode(node.right, node.data);
      return node;
    }
  }

  minNode(node) {
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }

  min() {
    return this.minNode(this.rootNode) ? this.minNode(this.rootNode).data : null;
  }

  max() {
    return this.maxNode(this.rootNode) ? this.maxNode(this.rootNode).data : null;
  }

  maxNode(node) {
    while (node && node.right) {
      node = node.right;
    }
    return node;
  }
}


module.exports = {
  BinarySearchTree
};