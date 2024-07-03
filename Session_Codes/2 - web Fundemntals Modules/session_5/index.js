const http = require("http");
const os = require("os");
const fs = require("fs");

/* read the html file */
const html_file = fs.readFileSync("./index.html","utf8");
json_file = fs.readFileSync("./json_user.json","utf8");
users = JSON.parse(json_file);

/* our API */
var users = [
    {name: "ahmed", age: "32", gender: "Male", password: "12345"},
    {name: "Tarek", age: "40", gender: "Male", password: "f8G9h0I1"},
    {name: "Layla", age: "35", gender: "Female", password: "n6O7p8Q9"},
    {name: "Reem", age: "23", gender: "Female", password: "r0S1t2U3"}, 
];


/* Create Our Server */
http.createServer( (req,res,next) =>{

    if(req.method == "GET" && req.url == "/users"){
        res.write("users!!!");
        res.write(html_file);
        
    res.end();
        
    }
    
    else if(req.method == "GET" && req.url == "/ahmed"){
        res.write("ahmed");
        
    res.end();
    }

    else if(req.method == "GET" && req.url == "/photo"){

        res.setHeader("Content-Type","text/html");// change the type of file sended
        res.write(html_file);//
        
    res.end();
    }

    else if(req.method == "GET" && req.url == "/users_API"){
        res.write(JSON.stringify(users));
        
    res.end();
    }

    else if(req.method == "POST" && req.url == "/add"){

        /* get data from user */
        req.on("data", (chunk) => {

            /* The Chunk is returned as string, so we need to parse it to object */
            let JsonChunk = JSON.parse(chunk);

            /* search for the username, if exist don't push */
            for (const element of users) {
                if (element.name == JsonChunk.name){
                    res.end("user exists :)");
                    return;
                }
            }

            /* add the chunk to the user's back */
            users.push(JsonChunk);

            fs.writeFileSync('./json_user.json',JSON.stringify(users));
            
            /* out the result */
            res.write(JSON.stringify(users));
            
    res.end();
            
        });
    }

    // http://localhost:3000/update/name
    //url = /update/name
    else if(req.method == "PUT" && req.url.startsWith("/update/")){
        
        // url array after split : ['','update','name']
        name_str = req.url.split("/")[2];

        console.log(name_str);

        // convert id from string to number if you want to get id
        // id_num = Number(id_str);
        
        /* search for the username, if exist don't push */
        var i = users.findIndex((e) =>{
            return e.name == name_str;
        });

        if(i == -1){
            res.write("not found");
            res.end();
        }
        else{
            res.write("updating......");
            req.on(
                "data",
                (data)=>{
                    console.log(JSON.parse(data).password);
                    users[i].password = JSON.parse(data).password;
                    
                    fs.writeFileSync('./json_user.json',JSON.stringify(users));
                    console.log(users[i].password);
                    res.write(JSON.stringify(users));
                    
                    res.end();
                }
            ); 
        }
    }
    // http://localhost:3000/delete/name
    //url = /delete/name
    else if(req.method == "DELETE" && req.url.startsWith("/delete/")){
        
        // url array after split : ['','delete','name']
        name_str = req.url.split("/")[2];

        console.log(name_str);

        // convert id from string to number if you want to get id
        // id_num = Number(id_str);
        
        /* search for the username, if exist don't push */
        var i = users.findIndex((e) =>{
            return e.name == name_str;
        });

        if(i == -1){
            res.write("not found");
            res.end();
        }
        else{
            res.write("deleting......");
            req.on(
                "data",
                (data)=>{
                    console.log(JSON.parse(data).password);
                    users.splice(i,1);
                    
            fs.writeFileSync('./json_user.json',JSON.stringify(users));
                    res.write("deleted successfully");
                    res.write(JSON.stringify(users));
                    res.end();
                }
            ); 
        }
    }



    else{
        res.write("ERROR 404");
    res.end();
    }
}
).listen( // when connections starts 
    3000, // port number
    () =>{
        console.log("port 3000");
    }
);