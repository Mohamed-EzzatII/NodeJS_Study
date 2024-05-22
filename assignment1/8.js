function factorial(x){
    var fact = 1;
    while(x >= 1){
        fact *=x;
        x--;
    }
    return fact;
}

console.log(factorial(5));