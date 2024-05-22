/**************************************************
 * Functions : -
 *************************************************/

/* Declaration Function */
function add(x,y){

    return x+y;
}

/* Declaration Function with default value parameter : -
 * the default value of y is 4, so if you don't pass
 * an argument to sub for y, y will be assigned as 4
 * else , y will be assigned to the passed value
 */ 
function sub(x,y = 4){

    return x-y;
}

function print_numbers(x,y){
    console.log(x,y);
}

print_numbers(2,3);

/* extra arguments(eg : 4 and 5) will be ignored */
print_numbers(2,3,4,5);

/* positional arguments */
console.log(add(2,3));

/* named arguments */
console.log(add(y=2,x=3));

/* valid */
var x = add(sub(3,2),3);
console.log(x); // add( (3-2) = 1, 3) = 4

/* VALIED */
function test(x = add(2,3),y){
    return x+y;
}

// ERROR
/* function test2(add(7,3),y){
    return x+y;
   }
*/

/* expression(anonymous) function */
var mult = function(x,y){
    return x*y;
}

console.log(mult(2,4)); //8


/* Arrow Function */
var func = x=>{
    return 5;
}
console.log(func(1)); //5

var func2 = x=> x+4;
console.log(func(1)); //5
