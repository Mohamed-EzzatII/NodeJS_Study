/**************************************************
 * Loops : -
 *************************************************/

var arr = [10,20,30,40];

/*  
 * Normal for loop
 */
console.log("FOR LOOP : -\n");
for(var i=0;i<arr.length;i++){
    console.log("arr["+i+"] : "+arr[i]);
}
console.log("\n*********************************\n");

/*
 * for in : it loops on the index
 */
console.log("FOR IN : -\n");
for (const elemet in arr) {
    console.log("arr["+elemet+"] : "+arr[elemet]);    
}
console.log("\n*********************************\n");

/*
 * for of : it loops on the elements
 */
console.log("FOR OF : -\n");
for (const element of arr) {
 console.log("Element = "+element);   
}
console.log("\n*********************************\n");

/*
 * for each : it takes an arrow function and returns
 * element and index or element only
 */
console.log("FOR EACH : -\n");
arr.forEach((element,index) => {   
     console.log("arr["+index+"] : "+element);    
});

console.log("\n*********************************\n");
