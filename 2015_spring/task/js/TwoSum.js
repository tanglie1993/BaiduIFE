/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var cache = new Object()
    for(var i = 0; i < nums.length; i++){
        cache[nums[i]] = i;
    }
    for(var i = 0; i < nums.length; i++){
        if(cache[target - nums[i]] !== undefined && cache[target - nums[i]] != i){
            return [cache[target - nums[i]], i]
        }
    }
    return []
};