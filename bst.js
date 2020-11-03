class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        else if (key < this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            } else {
                this.left.insert(key, value);
            }
        } else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            } else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        if (this.key == key) {
            return this.value;
        } else if (key < this.key && this.left) {
            return this.left.find(key);
        } else if (key > this.key && this.right) {
            return this.right.find(key);
        } else {
            throw new Error('Key Error');
        }
    }
    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

function bstHeight(root, max = 0) {
    if (root == null) {
        // on leaf
        return 0;
    } else {
        return Math.max(bstHeight(root.left, max++), bstHeight(root.right, max++)) + 1;
    }
}

function validateBST(root, minVal = -Infinity, maxVal = Infinity) {
    if (root === null) return true;
    if (root.key < minVal || root.key >= maxVal) return false;
    const leftIsValid = validateBST(root.left, minVal, root.key);
    return leftIsValid && validateBST(root.right, root.key, maxVal);
}

function thirdLargest(root, values = []) {
    console.log(values);
    if (!root.left && !root.right) {
        values.push(root.key);
        if (values.length > 3) {
            return values[values.length - 3];
        } else {
            return 'Not enough values';
        }
    } else {
        values.push(root.key);
        if (root.right) {
            return thirdLargest(root.right, values);
        } else if (root.left) {
            return thirdLargest(root.left, values);
        }
    }
}

function main() {
    const BST = new BinarySearchTree();
    BST.insert(5); //           5
    BST.insert(3); //        3  ||   6
    BST.insert(1);//      1    4       9
    BST.insert(4); //       2        7    10
    BST.insert(6); //                  8    11
    BST.insert(9); //                         12
    BST.insert(2);
    BST.insert(7);
    BST.insert(8);
    BST.insert(10);
    BST.insert(11);
    // BST.insert(12);
    console.log(thirdLargest(BST));
    console.log(validateBST(BST));
    console.log(isBalanced(BST));
    return BST;
}

// console.log(main());

function isBalanced(root, depth = 0) {
    if (!root) return 0;

    const leftDepth = depth + isBalanced(root.left, depth++);
    const rightDepth = depth + isBalanced(root.right, depth++);
    // console.log(leftDepth);
    // console.log(rightDepth);
    if (Math.abs(leftDepth - rightDepth) <= 1) {
        return true;
    } else {
        return false;
    }
}

function sameBSTs(arr1, arr2) {
    if (arr1.length !== arr2.length || arr1[0] !== arr2[0]) {
        return false;
    }
    if (arr1.length === 0 && arr2.length === 0) return true;

    /* both arrs same length */
    // get smaller of arr1 AND arr2
    // get bigger of arr1 AND arr2

    let smaller1 = [];
    let smaller2 = [];
    for (let i = 1; i < arr1.length; i++) {
        // arr1 comparison
        if (arr1[i] < arr1[0]) smaller1.push(arr1[i]);
        // arr2 comparison
        if (arr2[i] < arr2[0]) smaller2.push(arr2[i]);
    }

    let greater1 = [];
    let greater2 = [];
    for (let i = 1; i < arr1.length; i++) {
        if (arr1[i] >= arr1[0]) greater1.push(arr1[i]);
        if (arr2[i] >= arr2[0]) greater2.push(arr2[i]);
    }

    return sameBSTs(smaller1, smaller2) && sameBSTs(greater1, greater2);
}

console.log(sameBSTs([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]));


/*

*/
