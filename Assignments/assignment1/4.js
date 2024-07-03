function only_even(arr){
    var temp = [];
    arr.forEach(element => {
        if(element %2 == 0){
        temp.push(element);
        }
    });
    return temp;
}

var arr1 = [1,2,3,4,5,6,7,8,9,10];

console.log(only_even(arr1));