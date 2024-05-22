function find_index(arr,value){
    for(i in arr){
        if(arr[i] == value)
            return i;
    }
    return -1;
}

var arr = [1,2,3,4];
console.log(find_index(arr,1));
console.log(find_index(arr,10));