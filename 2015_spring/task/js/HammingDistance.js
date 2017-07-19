/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
    var result = 0
    x = Math.abs(x)
    y = Math.abs(y)
    while(x != 0 || y != 0){
        if(x % 2 != y % 2){
            result++
        }
        x = x >> 1
        y = y >> 1
    }
    return result
};