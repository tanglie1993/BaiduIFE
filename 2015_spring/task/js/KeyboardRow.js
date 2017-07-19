/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {
    var row = ["qwertyuiopQWERTYUIOP", "ASDFGHJKLasdfghjkl", "ZXCVBNMzxcvbnm"];
    var cache = new Object()
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < row[i].length; j++){
            cache[row[i][j]] = i;
        }
    }
    var result = []
    outer: for(var i = 0; i < words.length; i++){
        var currentRowIndex = null
        for(var j = 0; j < words[i].length; j++){
            if(currentRowIndex == null){
                currentRowIndex = cache[words[i][j]]
            }else if(currentRowIndex != cache[words[i][j]]){
                continue outer
            }
        }
        result.push(words[i])
    }
    return result
};