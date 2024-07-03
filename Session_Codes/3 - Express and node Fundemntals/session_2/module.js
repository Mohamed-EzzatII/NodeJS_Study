/*
// es5
let x = 4;
let y = 5;
let z = 2;
*/
/*
module.exports = {
    x:x,
    y:y,
    z:z
};
*/
// OR 
/*
module.exports.x=x;
module.exports.y=y;
module.exports.z=z;
*/

// OR 
/* // in case of 
module.exports = {x,y,z};
*/



/******************************************************************************
 * es6 : -
 *****************************************************************************/
 let x = 4;
 let y = 5;
 let z = 6;
 let a = 1; 
 export{
    x,y,z
 };

 export default a;


