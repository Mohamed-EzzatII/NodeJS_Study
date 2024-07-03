function arr_sum(arr){
    var sum = 0;
    arr.forEach(element => {
        sum+=element;
    });
    return sum;
}


var arr = [1,2,3,4];

console.log(arr_sum(arr));