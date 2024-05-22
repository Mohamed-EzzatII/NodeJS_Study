function reverse(str){
    var temp = "";
    for(var j=str.length-1;j>=0;j--){
        temp+=str[j];
    }
    return temp;
}

var str1 = "test";
var str2 = "arra";

console.log(reverse(str1));
console.log(reverse(str2));