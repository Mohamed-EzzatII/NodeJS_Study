function average(arr){
    var sum = 0;
    arr.forEach(element => {
        sum+=element;
    });
    if(sum != 0){
        return sum/arr.length;
    }
    return 0;
}

var arr = [1,2,3,4];

console.log(average(arr));
