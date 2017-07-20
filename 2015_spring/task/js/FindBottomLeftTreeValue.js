/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
cache = {}
var findBottomLeftValue = function(root) {
    if(root == null){
        return 0;
    }
    if(root.left == null && root.right == null){
        return root.val
    }
    if(root.left == null){
        return findBottomLeftValue(root.right)
    }
    if(root.right == null){
        return findBottomLeftValue(root.left)
    }
    var leftHeight = getHeight(root.left)
    var rightHeight = getHeight(root.right)
    console.log("leftHeight " + leftHeight)
    console.log("rightHeight " + rightHeight)
    if(leftHeight >= rightHeight){
        return findBottomLeftValue(root.left)
    }else{
        return findBottomLeftValue(root.right)
    }
};

function getHeight(root) {
    if(root == null){
        return 0
    }
    if(cache[JSON.stringify(root)] !== undefined){
        return cache[JSON.stringify(root)]
    }
    cache[JSON.stringify(root)] = Math.max(getHeight(root.left), getHeight(root.right)) + 1
    return cache[JSON.stringify(root)]
}






