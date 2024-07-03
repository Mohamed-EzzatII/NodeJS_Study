/* 
 * we use destructing MAINLY to access members in complex objects,ex: instead of 
 * writing vehicleOne.registration.city to access Houston we write only city
 */

const vehicleOne = {
    brand: 'Ford',
    model: 'Mustang',
    type: 'car',
    year: 2021, 
    color: 'red',
    registration: {
      city: 'Houston',
      state: 'Texas',
      country: 'USA'
    },
    city : "New Cairo",
    state : "Cairo"
  }

/*
 * Note that variables in {} should be with the same
 * name as defined in vehicleOne.registration, so if there is 
 * a redundancy in name of a member, don't forget to store it
 * in a temporary variable.
 */
var {city,state} = vehicleOne.registration;
console.log(city,state); // Huston , Texas
var {city} = vehicleOne;
console.log(city,state); // New Cairo , Cairo

// same as 
console.log(vehicleOne.registration.city,vehicleOne.registration.state);

/* We can use destructing to access the elements of array, but it is not a common case */
var arr = [10,20,30,40,50];

var [arr1,arr2] = arr;

console.log(arr1); // 10


/* We can use destructing to access the elements of string, but it is not a common case */
var str = "Medo";

var [M,e,d,o] = str;

console.log(M); // M
console.log(d); // d