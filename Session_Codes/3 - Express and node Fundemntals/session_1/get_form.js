const http = require("http");
const fs = require("fs");
const q = require("querystring");
http.createServer(
(req,res,next)=>{
    if(req.method == "GET" && req.url == "/"){
        const html = fs.readFileSync("./index.html");
        res.end(html);
    }else if(req.method == "GET" && req.url == "/style.css"){
        const style = fs.readFileSync("./style.css");
        res.end(style);
    }else if(req.method == "GET" && req.url == "/active.js"){
        const active = fs.readFileSync("./active.js");
        res.end(active);
    }else if(req.method == "POST" && req.url == "/html_from"){
        req.on("data",(chunk)=>{
            console.log(q.parse(chunk.toString()));
        }
        );
        res.setHeader("location","/");
        res.statusCode = 302;//لازم تحطه يا هيديك ايرور
        res.end();
    }  
}
).listen( // when connections starts 
3000, // port number
() =>{
    console.log("port 3000");
}
);