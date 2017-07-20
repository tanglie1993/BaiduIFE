/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    var result = []
    for(var i = 0; i < nums.length; i++){
        nums[Math.abs(nums[i]) - 1] = -nums[Math.abs(nums[i]) - 1]
    }
    for(var i = 0; i < nums.length; i++){
        if(nums[Math.abs(nums[i]) - 1] > 0){
            result.push(Math.abs(nums[i]))
        }
    }
    result.sort()
    var finalResult = []
    for(var i = 0; i < result.length; i += 2){
        finalResult.push(result[i])
    }
    return finalResult
};