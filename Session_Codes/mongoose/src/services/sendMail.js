import nodemailer from "nodemailer";

export const sendMail = async (to,subject,html) =>{
    try{
        const transporter = nodemailer.createTransport({
            host: "localhost",
            port: 587,
            secure: false,
            service : "gmail",
            auth: {
                user: "ezzatmohamed683@gmail.com",   
                pass: "fdzeexlntrtbsrli",
            },
        });
    
        const info = await transporter.sendMail({
            from: '"Mohamed Ezzat" <ezzatmohamed683@gmail.com>', // sender address  
            to : to?to:"mohamedezzatcse@gmail.com", // list of receivers
            subject : subject?subject:"testing purpose", // Subject line
            html : html?html:"test test test ", // html body
        });
        
        console.log("Message sent: %s", info);       
    }catch(error){
        console.log(error);
    }
}