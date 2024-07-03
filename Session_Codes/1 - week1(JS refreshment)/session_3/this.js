
console.log(this); // this is now an object of the console


var test4 = {
    name : "ahmed",
    func : function(){
        console.log("func");
        console.log(this); // this now is an object of test4
    }

};

test4.func(); // this will be test4


var test3 = {
    name : "ahmed",
    func : function(){
        console.log("func");
        console.log(this); // this now is an object of test3
        
        function f(){
            
        console.log("F");
            console.log(this); // this now is an object of console
        }
        f();
    }

};

test3.func();

/* How to access the test object in function f ?
 * Method 1 : -
 * 1 - create a variable outside its scope in func scope(that)
 * 2 - assign the test object to that variable
 * 3 - Done 
 */
var test1 = {
    name : "ahmed",
    func : function(){
        console.log("this in func");
        console.log(this); // this now is an object of test1
        var that = this;
        function f(){
            console.log("that in f");
            console.log(that); // this now is an object of console        
            console.log("this in f");
            console.log(this); // this now is an object of console
        }
        f();
    }

};

test1.func();


/* How to access the test object in function f ?
 * Method 2 : -
 * Just convert f to an arrow function
 */
var test2 = {
    name : "ahmed",
    func : function(){
        console.log("this in func");
        console.log(this); // this now is an object of test2
        var that = this;
        var f = ()=>{
            console.log("that in f");
            console.log(that); // this now is an object of console        
            console.log("this in f");
            console.log(this); // this now is an object of console
        }
        f();
    }

};

test2.func();