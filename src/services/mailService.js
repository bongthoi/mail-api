import nodeMailer from 'nodemailer';
import mail_config from '../../configs/mail_config.json';

class MailService {
    constructor() { };

    /**
     * 
     * @param {*} from 
     * @param {*} to 
     * @param {*} subject 
     * @param {*} content 
     */
    sendMail(from,to,subject,content) {
        let method="mailService/sendMail";
        console.log(method+" -->start");

        let transporter = nodeMailer.createTransport(mail_config);

        let mailOptions = {
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: "", // plain text body
            html: content // html body
        };

        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(method+" -->fail");
                    return reject({"status":"fail"});
                }
                console.log(method+" -->success");
                return resolve({"status":"success","info":info.messageId});            
            });
        });        
    };
    
}

module.exports = MailService;
