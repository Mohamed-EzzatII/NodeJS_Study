/*
 * Call back function is a technique used to achieve asynchronous
 * execution of functions, when ,as an example, function1 depends on function2
 * that takes much time, so you need to ensure that function2 completes execution
 * before function1 executes.
 * or in an another word, a consumer function and producer function.
 * UNCOMMENT THE NEXT BLOCK
 */
/*
function producer_problem(){
    setTimeout(
        ()=>{
            console.log("Producer_problem Function");
        },
        3000 // wait for 3 seconds
    );
}

function consumer_problem(){

    console.log("Consumer_problem Function");
}

producer_problem();
consumer_problem();
*/

/*
 * In the previous example, producer function will be executed after
 * the consumer function which is not logic, so we will need the callback
 * technique to solve the problem.
 * COMMENT THE PREVIOUS BLOCK,AND DECOMMENT THE NEXT BLOCK
 */

/*
function producer(cons){
    setTimeout(
        ()=>{
            console.log("Producer Function");
            cons();
        },
        3000 // wait for 3 seconds
    );
}

function consumer(){

    console.log("Consumer Function");
}

producer(consumer);
*/