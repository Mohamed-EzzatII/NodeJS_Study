/* In case of you are getting data from server for 2 functions and
 * the two functions depends on the data, you should make sure that 
 * the two functions won't execute until you receive the data, this 
 * could be made by using three techniques which are callback - promise - await
 */

/* Example to illustrate the problem */

function one(){
setTimeout(()=>{
    console.log("one");
    },
    3000 //wait for 3 seconds then print three
);

}

function two(){
    setTimeout(()=>{
        console.log("two");
        },
        2000 //wait for 2 seconds then print two
    );
    
}
function three(){
    setTimeout(()=>{
        console.log("three");
        },
        1000 //wait for 1 seconds then print three
    );
    
}

// one();
// two();
// three();

/* if you run the previous program you expect to find the output as
 * the following : 
 * one
 * two
 * three
 * but you found the output as :
 * three
 * two 
 * one
 * 
 * that is because JS is sync, so it will execute the function which takes
 * less time firstly, so how could we solve that problem?
 */
/*****************************************************************
 * Callback : -
 *****************************************************************/

/* You can call function three inside two, and two inside one, so in that case
 * when you call function one, function two won't be called until one finished,
 * and then function 3 won't be called until the 2 seconds passed at function 2,
 * so that is the sequence : -
 * 1 - function one called.
 * 2 - wait for 3 second.
 * 3 - output one and call function two.
 * 4 - wait for 2 seconds.
 * 5 - output two and call function three.
 * 6 - function three will be the only running function and it will take
 *     one second then execute.
 *____________________________________________________________________________
 * |*************************************************************************|
 * |*********************UNCOMMENT THE NEXT BLOCK****************************|
 * |*************************************************************************|
 */

// function one(func){
//     setTimeout(()=>{
//         console.log("one");
//         func(three);
//         },
//         3000 //wait for 3 seconds then print three
//     );
    
//     }
    
//     function two(func){
//         setTimeout(()=>{
//             console.log("two");
//             func();
//             },
//             2000 //wait for 2 seconds then print two
//         );
        
//     }
//     function three(){
//         setTimeout(()=>{
//             console.log("three");
//             },
//             1000 //wait for 1 seconds then print three
//         );
        
//     }
    
//     one(function(){
//         two(function(){
//             three();
//         })
//     });

/*****************************************************************
 * Promise : -
 *****************************************************************/

/* 
 *                      "I Promise a Result!"
 * "Producing code" is code that can take some time
 * "Consuming code" is code that must wait for the result
 * A Promise is an Object that links Producing code and Consuming code
 * 
 * Its done by passing a function to a Promise object, then you call a method
 * inside that object called then, the code will stuck at the function exists
 * inside the Promise object until it finished then it will execute the function 
 * passed as an argument to then
 */

/*******Example 1********/

function one(){
    
    return new Promise((func)=>
    setTimeout(()=>
        {
             console.log("one");
             func(three);
        },
        3000 //wait for 3 seconds then print one
    )
    );
}

function two(){
    
    return new Promise((func)=>
    setTimeout(()=>
        {
             console.log("two");
             func();
        },
        2000 //wait for 2 seconds then print two
    )
);
}

function three(){
    setTimeout(()=>
        {
             console.log("three");
        },
        1000 //wait for 1 seconds then print three
    )
}

// one().then(()=>{
//     two().then(()=>{three();});
// });




/*
 * Async and await
 *
 *  
 */

function one(){
    
    return new Promise((func)=>
    setTimeout(()=>
        {
            console.log("one");
            func(three);
        },
        3000 //wait for 3 seconds then print one
    )
    );
}

function two(){
    
    return new Promise((func)=>
    setTimeout(()=>
        {
             console.log("two");
             func();
        },
        1500 //wait for 1.5 seconds then print two
    )
);
}

function three(){
    setTimeout(()=>
        {
             console.log("three");
        },
        1000 //wait for 1 seconds then print three
    )
}


async function test(){
    await one();
    await two();
    three();
}

test();