/***************************************************
 * Student URLs : 
 * 1 - /addStudent
 * 2 - /get_students
 * 3 - /get_students_dep
 * 4 - /delete_student/email
 * 5 - /update_student/Id
 * 6 - /search_student/Id
 * ==================================================
 * Course URLs :
 * 1 - /addCourse
 * 2 - /delete_course/Id
 * 3 - /delete_course/Id
 * 4 - /get_Courses
 * 5 - /search_course/Id
 * ==================================================
 * Department URLs :
 * 1 - /add_department
 * 2 - /delete_department/Id
 * 3 - /update_department/Id
 * 4 - /get_departments
 * 5 - /search_departments/Id 
 * =================================================
 ***************************************************/
const port_number = 3010;

const http = require("http");
const fs = require("fs");

/* read the files */
students_json = fs.readFileSync("./students_json.json","utf8");
students = JSON.parse(students_json);

courses_json = fs.readFileSync("./courses_json.json","utf8");
courses = JSON.parse(courses_json);

departments_json = fs.readFileSync("./departments_json.json","utf8");
departments = JSON.parse(departments_json);

/* Create Our Server */
http.createServer( (req,res,next) =>{

    /***************************************************************
     * students APIs : -  
     ***************************************************************/
    
    /*1 - Add student */
    if(req.method == "POST" && req.url == "/addStudent"){

        /* get data from user */
        req.on("data", (chunk) => {

            /* The Chunk is returned as string, so we need to parse it to object */
            let JsonChunk = JSON.parse(chunk);

            /* search for the email, if exist don't push */
            for (const element of students) {
                if (element.Id == JsonChunk.Id){
                    res.end("user exists :)");
                    return;
                }
            }

            /* add the chunk to the students array */
            students.push(JsonChunk);

            /*Apply the changes on the json file */
            fs.writeFileSync('./students_json.json',JSON.stringify(students));
            
            /* output the result */
            res.write(JSON.stringify(students));
            
            res.end();            
        });
    }

    /* 2 - GetAll students */
    if(req.method == "GET" && req.url == "/get_students"){
        console.log("GetAll students ");
        res.write(JSON.stringify(students));
        res.end();
    }

    /* 3 - Get all students with their department and courses 
     * related to the department */
    else if(req.method == "GET" && req.url == "/get_students_dep"){
        console.log("GetAll students with their department and courses related to the department ");
       
        /* temporary variable to store the students */
        var temp_students = [];
        for (var index = 0;index<students.length;index++) {

            /* copy name,id,email and password */
            temp_students[index].Id=students[index].Id;
            temp_students[index].Name=students[index].Name;
            temp_students[index].Email=students[index].Email;
            temp_students[index].Password=students[index].Password;
            
            /* find the departments */
            temp_students[index].department = [];
            for(var j = 0;j<departments.length;j++){
                if(departments[j].Id == students[index].DepartmentId){
                    temp_students[index].department.Id = departments[j].Id;
                    temp_students[index].department.Name = departments[j].Name;
                }
            }

            /* find the courses */
            temp_students[index].course = []
            for(var j = 0;j<courses.length;j++){
                if(courses[j].DepartmentId == students[index].DepartmentId){
                    temp_students[index].course.Id = course[j].Id;
                    temp_students[index].course.Name = course[j].Name;
                }
            }
        }
        
        /*display the result*/
        res.write(JSON.stringify(temp_students));
        res.end();
    }

    /* 4 - delete student 
     * http://localhost:3010/delete_student/email
     * url = /delete_student/email */
    else if(req.method == "DELETE" && req.url.startsWith("/delete_student/")){
        
        // url array after split : ['','delete_student','email']
        email_str = req.url.split("/")[2];

        console.log(email_str);
        
        /* search for the user email, if exist don't push */
        var i = students.findIndex((e) =>{
            return e.Email == email_str;
        });

        if(i == -1){
            res.write("not found");
            res.end();
        }
        else{
            res.write("deleting......");
            students.splice(i,1);
            fs.writeFileSync('./students_json.json',JSON.stringify(students));
            res.write("deleted successfully");
            res.write(JSON.stringify(students));
            res.end();
}
    }

    /* 5 - update student by ID
     * http://localhost:3000/update_student/Id
     * url = /update_student/Id */
    else if(req.method == "PUT" && req.url.startsWith("/update_student/")){
        
        // url array after split : ['','update_student','id']
        id_str = req.url.split("/")[2];

        // convert id from string to number if you want to get id
        id_num = Number(id_str);
        
        /* search for the username, if doesn't exist display not found */
        var i = students.findIndex((e) =>{
            return e.Id == id_num;
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
                    oneStudent = JSON.parse(data);
                    // Id Name Email Password DepartmentId
                    if(oneStudent.DepartmentId != undefined){
                        students[i].DepartmentId = oneStudent.DepartmentId; 
                    }

                    if(oneStudent.Name != undefined){
                        students[i].Name = oneStudent.Name; 
                    }

                    if(oneStudent.Email != undefined){
                        students[i].Email = oneStudent.Email; 
                    }

                    if(oneStudent.Password != undefined){
                        students[i].Password = oneStudent.Password; 
                    }
                    fs.writeFileSync('./students_json.json',JSON.stringify(students));
                    console.log(students[i]);
                    res.write("New student data is ");
                    res.write(JSON.stringify(students[i]));
                    res.end();
                }
            ); 
        }
    }

    /* 6 - search student by ID
     * http://localhost:3000/search_student/Id
     * url = /search_student/Id */
    else if(req.method == "GET" && req.url.startsWith("/search_student/")){
        
        // url array after split : ['','search_student','id']
        id_str = req.url.split("/")[2];

        // convert id from string to number if you want to get id
        id_num = Number(id_str);
        
        /* search for the Id */
        for (element of students) {
            if (element.Id == id_num){
                res.write("user exists :)");
                res.end(JSON.stringify(element));
                return;
            }
        }
        res.end("User doesn't exist");
    }

    /***************************************************************
     * Courses APIs : -  
     ***************************************************************/
    
    /*1 - Add Courses */
    if(req.method == "POST" && req.url == "/addCourse"){

        /* get data from user */
        req.on("data", (chunk) => {

            /* The Chunk is returned as string, so we need to parse it to object */
            let JsonChunk = JSON.parse(chunk);

            /* search for the email, if exist don't push */
            for (const element of courses) {
                if (element.Id == JsonChunk.Id){
                    res.end("Course exists :)");
                    return;
                }
            }

            /* add the chunk to the Courses array */
            courses.push(JsonChunk);

            /*Apply the changes on the json file */
            fs.writeFileSync('./courses_json.json',JSON.stringify(courses));
            
            /* output the result */
            res.write(JSON.stringify(courses));
            
            res.end();
            
        });
    }

    /* 2 - delete course 
     * http://localhost:3010/delete_course/Id
     * url = /delete_course/ID */
     else if(req.method == "DELETE" && req.url.startsWith("/delete_course/")){
        
        // url array after split : ['','delete_course','Id']
        id_str = req.url.split("/")[2];

        id_num = Number(id_str);

        /* search for the user Id, if exist don't push */
        var i = courses.findIndex((e) =>{
            return e.Id == Id_str;
        });

        if(i == -1){
            res.write("not found");
            res.end();
        }
        else{
            res.write("deleting......");
            courses.splice(i,1);
            fs.writeFileSync('./courses_json.json',JSON.stringify(courses));
            res.write("deleted successfully");
            res.write(JSON.stringify(courses));
            res.end();
        }
    }
    
    
    /* 3 - update course by ID
     * http://localhost:3000/update_course/Id
     * url = /update_course/Id */
     else if(req.method == "PUT" && req.url.startsWith("/update_course/")){
        
        // url array after split : ['','update_course','id']
        id_str = req.url.split("/")[2];

        // convert id from string to number if you want to get id
        id_num = Number(id_str);
        
        /* search for the username, if doesn't exist display not found */
        var i = courses.findIndex((e) =>{
            return e.Id == id_num;
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
                    var onecourse = JSON.parse(data);
                    // Id Name Id Password DepartmentId
                    if(onecourse.DepartmentId != undefined){
                        courses[i].DepartmentId = onecourse.DepartmentId; 
                    }

                    if(onecourse.Name != undefined){
                        courses[i].Name = onecourse.Name; 
                    }

                    if(onecourse.Content != undefined){
                        courses[i].Content = onecourse.Content; 
                    }

                    fs.writeFileSync('./courses_json.json',JSON.stringify(courses));
                    console.log(courses[i]);
                    res.write("New course data is ");
                    res.write(JSON.stringify(courses[i]));
                    res.end();
                }
            ); 
        }
    }


    /* 4 - GetAll Courses */
    if(req.method == "GET" && req.url == "/get_Courses"){
        console.log("GetAll Courses ");
        res.write(JSON.stringify(courses));
        res.end();
    }

    /* 6 - search course by ID
     * http://localhost:3000/search_course/Id
     * url = /search_course/Id */
     else if(req.method == "GET" && req.url.startsWith("/search_course/")){
        
        // url array after split : ['','update_course','id']
        id_str = req.url.split("/")[2];

        // convert id from string to number if you want to get id
        id_num = Number(id_str);
        
        /* get data from user */
        req.on("data", (chunk) => {

            /* The Chunk is returned as string, so we need to parse it to object */
            let JsonChunk = JSON.parse(chunk);

            /* search for the Id */
            for (const element of courses) {
                if (element.Id == id_num){
                    res.write("course exists :)");
                    res.end(JSON.stringify(element));
                    return;
                }
            }
            res.end("course doesn't exist");
        }
        );
    }


    /***************************************************************
     * departments APIs : -  
     ***************************************************************/
    
    /*1 - Add departments */
    if(req.method == "POST" && req.url == "/add_department"){

        /* get data from user */
        req.on("data", (chunk) => {

            /* The Chunk is returned as string, so we need to parse it to object */
            let JsonChunk = JSON.parse(chunk);

            /* search for the email, if exist don't push */
            for (const element of departments) {
                if (element.Id == JsonChunk.Id){
                    res.end("department exists :)");
                    return;
                }
            }

            /* add the chunk to the departments array */
            departments.push(JsonChunk);

            /*Apply the changes on the json file */
            fs.writeFileSync('./departments_json.json',JSON.stringify(departments));
            
            /* output the result */
            res.write(JSON.stringify(departments));
            
            res.end();
            
        });
    }

    /* 2 - delete department 
     * http://localhost:3010/delete_department/Id
     * url = /delete_department/ID */
     else if(req.method == "DELETE" && req.url.startsWith("/delete_department/")){
        
        // url array after split : ['','delete_department','Id']
        id_str = req.url.split("/")[2];

        id_num = Number(id_str);

        /* search for the user Id, if exist don't push */
        var i = departments.findIndex((e) =>{
            return e.Id == Id_num;
        });

        if(i == -1){
            res.write("not found");
            res.end();
        }
        else{
            res.write("deleting......");
            for(element of courses){
                if(element.DepartmentId == Id_num){
                    element.DepartmentId = -1;
                }
            }
            for(element of students){
                if(element.DepartmentId == Id_num){
                    element.DepartmentId = -1;
                }
            }
            departments.splice(i,1);
            
            fs.writeFileSync('./students_json.json',JSON.stringify(students));
            fs.writeFileSync('./courses_json.json',JSON.stringify(courses));
            fs.writeFileSync('./departments_json.json',JSON.stringify(departments));
            res.write("deleted successfully");
            res.write(JSON.stringify(departments));
            res.end();
        }
    }
    
    
    /* 3 - update department by ID
     * http://localhost:3000/update_department/Id
     * url = /update_department/Id */
     else if(req.method == "PUT" && req.url.startsWith("/update_department/")){
        
        // url array after split : ['','update_department','id']
        id_str = req.url.split("/")[2];

        // convert id from string to number if you want to get id
        id_num = Number(id_str);
        
        /* search for the username, if doesn't exist display not found */
        var i = departments.findIndex((e) =>{
            return e.Id == id_num;
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
                    var onedepartment = JSON.parse(data);
                    // Id Name Id Password DepartmentId
                    if(onedepartment.DepartmentId != undefined){
                        departments[i].DepartmentId = onedepartment.DepartmentId; 
                    }

                    if(onedepartment.Name != undefined){
                        departments[i].Name = onedepartment.Name; 
                    }

                    if(onedepartment.Content != undefined){
                        departments[i].Content = onedepartment.Content; 
                    }

                    fs.writeFileSync('./departments_json.json',JSON.stringify(departments));
                    console.log(departments[i]);
                    res.write("New department data is ");
                    res.write(JSON.stringify(departments[i]));
                    res.end();
                }
            ); 
        }
    }


    /* 4 - GetAll departments */
    if(req.method == "GET" && req.url == "/get_departments"){
        console.log("GetAll departments ");
        res.write(JSON.stringify(departments));
        res.end();
    }

    /* 5 - search department by ID
     * http://localhost:3000/search_department/Id
     * url = /search_department/Id */
     else if(req.method == "GET" && req.url.startsWith("/search_department/")){
        
        // url array after split : ['','update_department','id']
        id_str = req.url.split("/")[2];

        // convert id from string to number if you want to get id
        id_num = Number(id_str);
        
        /* get data from user */
        req.on("data", (chunk) => {

            /* The Chunk is returned as string, so we need to parse it to object */
            let JsonChunk = JSON.parse(chunk);

            /* search for the Id */
            for (const element of departments) {
                if (element.Id == id_num){
                    res.write("department exists :)");
                    res.end(JSON.stringify(element));
                    return;
                }
            }
            res.end("department doesn't exist");
        }
        );
    }
}
).listen( // when connections starts 
port_number, // port number
    () =>{
        console.log("port"+port_number);
    }
);