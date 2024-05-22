/* Have a Look at the written notes */
/* Uncomment each scope and run it, then comment it again */

/* // block 1
console.log(x); // undefined
var x=4;
*/

// same as

/* // block 2
var x;
console.log(x);
x = 4;
*/


/* // block 3
console.log(x); // error
let x=4;
*/

// same as

/* // block 4
let x;
console.log(x); //error
x = 4;
*/

/* // block 5
sum(1,2); //3
function sum(x,y){
    console.log(x+y);
}
*/

// same as

/* // block 6
function sum(x,y){
    console.log(x+y);
}
sum(1,2); //3
*/

/* // block 7
sum(1,2); //error
var sum  = function (x,y){
    console.log(x+y);
}
*/

// same as

/* // block 8
var sum;
sum(1,2); //error
sum  = function (x,y){
    console.log(x+y);
}
*/

/* // block 9
function print_sum(x,y){ 
    console.log(add(x,y));
    return;
    function add(x,y){
        return x+y;
    }
}

print_sum(1,2); //3
*/

// same as 

/* // block 10
function print_sum(x,y){ 
    function add(x,y){
        return x+y;
    }
    console.log(add(x,y));
    return;
}

print_sum(1,2); //3
*/
 