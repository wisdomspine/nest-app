import * as mailer from "nodemailer";
import * as chalk from "chalk";
import { user } from "./cr";
const service = mailer.createTransport({
    host: user.smtp.host,
    port: user.smtp.port,
    secure: user.smtp.secure,
    auth: {
        user: user.user,
        pass: user.pass
    },
})

const message = {
    from: {
        name: "Spinneret",
        address: "info@gmail.com"
    },
    to: [
        {name: "Anna Sabo", address:"pabsyqueen@gmail.com"},
        {name: "Priest Sabo", address: "sabopriest@gmail.com"}
    ],
    attachments:[
        {
            filename:"Image",
            path: "./public/img.jpg",
            cid: "unique1"
        }
    ],
    subject: "This is a first test",
    text: "Hope you are doing fine my self?",
    html: `
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
                <title> Document </title>
                <style>
                    h1{
                        color: red;
                        font-family: sans-serif
                    }
                </style>
            </head>
            <body>
                    <h1>
                        Hello sammy💎
                    </h1>
                    <img src="cid:unique1">
            </body>
        </html>
    `
}

service.sendMail(message, (error: Error, info)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Mail sent", info)
    }
})