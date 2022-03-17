const fs = require("fs")
const nodemailer = require("nodemailer")
require("dotenv").config()
//txt path
const pathFile = './files/file.txt'

fs.readFile(pathFile, 'utf-8', (err, data) => {
    if(err){
        console.log("No existe el archivo")
    }else{
        //change receiver email
        sendEmail(
            process.env.EMAIL,
            "feartmp+rfqqh@gmail.com",
            "Hello World", 
            "It's a file", 
            pathFile
        ).catch(console.error)
    }
})

const sendEmail = async (senderEmail, receiverEmail, suject, content, pathFile) => {
    //cuenta de prueba
    //const testAccount = await nodemailer.createTestAccount()

    //config
    let transporter = nodemailer.createTransport({
        //default config
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        // auth: {
        //   user: testAccount.user, // generated ethereal user
        //   pass: testAccount.pass, // generated ethereal password
        // },
        //gmail config
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    let info = await transporter.sendMail({
        from: senderEmail, // sender address
        to: receiverEmail, // list of receivers
        subject: suject, // Subject line
        text: content, // plain text body
        //html: "<b>Hello world?</b>", // html body
        attachments: [
            {
                path: pathFile,
            }
        ]
    });
    
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    //Default test
    // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//Vazquez Iván - Grupo 3