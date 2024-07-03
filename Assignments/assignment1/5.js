function copy_object(obj){
    
    // if obj is an array 
    if(Array.isArray(obj)){
        var temp = [];
        obj.forEach(element => {
            temp.push(element);
        });
        
    return temp;
    }

    // if obj is an object
    if(typeof obj == "object"){

        /* get the attributes of object */
        var att = Object.getOwnPropertyNames(obj);
        var temp=  {};
        for(var i = 0;i<att.length;i++){
            temp[att[i]] = obj[att[i]];
        }
        
        return temp;
    }
}


var obj = {
    name : "ahmed",
    age : 16
};
var arr = [1,2,3,4];

var new_obj = copy_object(obj);
var new_arr = copy_object(arr);
if(obj != new_obj){
    console.log(new_obj);
}

if(arr != new_arr){
    console.log(new_arr);
}