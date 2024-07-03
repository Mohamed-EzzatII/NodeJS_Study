/***********************************************************************
 * Express : -
 ***********************************************************************/

/* Import express, NOTE THAT IT IS A THIRD PART MODULE */
const express = require("express"); // function returned from require which should be called
const exp = express();

// used to get the path
const path=require("path");

// exp.use is called every time a request is done
exp.use(
    // new_folder is the folder at which we search in for
    // the required files
    express.static("new_folder")
);

// parse all the coming data to JSON format, by the middleware
// function express.json
exp.use(
    express.json()
)

exp.get("/",(req,res,next)=>{
    res.sendFile(path.join(path.resolve(),"/index.html"));
});

// how to sen
exp.put("/:name",(req,res,next)=>{
    console.log(req.params.name);
});

exp.listen(3000,()=>{
    console.log("Express Server");
});