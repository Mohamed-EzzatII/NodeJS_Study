function palindrome(str){
    
    for(var i=0,j=str.length-1;i<str.length / 2;i++,j--){
        if(str.charAt(i) != str.charAt(j)){
            return false;
        } 
    }

    // loop completed which means that the first half of the string 
    // equals to the second half
    return true;
}

var str1 = "test";
var str2 = "arra";

console.log(palindrome(str1));
console.log(palindrome(str2));