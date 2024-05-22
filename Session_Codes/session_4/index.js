const http = require("http");
const os = require("os");
const fs = require("fs");

/* read the html file */
const html_file = fs.readFileSync("./index.html","utf8");

/* our API */
let users = [
    {name: 'ahmed', age: "32", gender: "Male", password: "12345"},
    {name: 'Mohamed', age: "25", gender: "Male", password: "xY3z9Q1w"},
    {name: 'Sara', age: "28", gender: "Female", password: "a1B2c3D4"},
    {name: 'Omar', age: "34", gender: "Male", password: "f6G7h8I9"},
    {name: 'Nour', age: "21", gender: "Female", password: "j0K1l2M3"},
    {name: 'Fatma', age: "27", gender: "Female", password: "n4O5p6Q7"},
    {name: 'Khaled', age: "39", gender: "Male", password: "r8S9t0U1"},
    {name: 'Mina', age: "30", gender: "Female", password: "v2W3x4Y5"},
    {name: 'Hassan', age: "45", gender: "Male", password: "z6A7b8C9"},
    {name: 'Amina', age: "26", gender: "Female", password: "d0E1f2G3"},
    {name: 'Youssef', age: "33", gender: "Male", password: "h4I5j6K7"},
    {name: 'Hana', age: "29", gender: "Female", password: "l8M9n0O1"},
    {name: 'Mariam', age: "24", gender: "Female", password: "p2Q3r4S5"},
    {name: 'Nadia', age: "31", gender: "Female", password: "t6U7v8W9"},
    {name: 'Rania', age: "38", gender: "Female", password: "x0Y1z2A3"},
    {name: 'Samir', age: "36", gender: "Male", password: "b4C5d6E7"},
    {name: 'Tarek', age: "40", gender: "Male", password: "f8G9h0I1"},
    {name: 'Heba', age: "22", gender: "Female", password: "j2K3l4M5"},
    {name: 'Layla', age: "35", gender: "Female", password: "n6O7p8Q9"},
    {name: 'Reem', age: "23", gender: "Female", password: "r0S1t2U3"}
];


/* Create Our Server */
http.createServer( (req,res,next) =>{

    if(req.method == "GET" && req.url == "/users"){
        res.write("users!!!");
        res.write(html_file);
        res.end();
        /* or 
        res.end("users");
        */
    }
    
    else if(req.method == "GET" && req.url == "/ahmed"){
        res.end("ahmed");
    }

    else if(req.method == "GET" && req.url == "/photo"){

        res.setHeader("Content-Type","text/html");// change the type of file sended
        res.write(html_file);//
        res.end;
    }

    else if(req.method == "GET" && req.url == "/users_API"){
        res.write(JSON.stringify(users));
        res.end();
        /* or 
        res.end("users");
        */
    }
    

    else{
        res.end("ERROR 404");
    }
}
).listen( // when connections starts 
    3000, // port number
    () =>{
        console.log("port 3000");
    }
);