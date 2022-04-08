import * as nodemailer from 'nodemailer';

export default async (ctx: any) => {
  return new Promise(async(resolve,reject)=>{
    if(!ctx) return reject({success: false, err: "Missing configuration object"});

    const template = {
        from: process.env.EMAIL_SENDER,
        to: "christian.gagliardi@develon.com", //info@pharmaround.it
        subject: "New contract by pharmaBag",
        text: `message: ${ctx.store.code}`,
        html: `<div>
        <br/>
            <b>StoreID</b>: <span>${ctx.store}</span><br/>
            <b>QrID</b>: <span>${ctx.qr}</span><br/>
        </div>`,
    }
    
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
        });

        await transporter.sendMail(template);
        return resolve({success: true, message: 'Good job!'});
      }catch(err){
        return reject({success: false, err: err});
      }
    });

};