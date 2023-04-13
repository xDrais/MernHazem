const optGenerator = require('otp-generator')
const nodemail = require('nodemailer')
const jwt = require('jsonwebtoken')

let otp= ''
/*
exports.generatorOTP = () => {
    const OTP = optGenerator.generate(10,{specialChars: false});
    return OTP
};*/
exports.generatorOTP = () => {
    const otp = optGenerator.generate(10, { specialChars: false });
    const expiration = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now
    //const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  
    // concatenate OTP and expiration details with separator
    const test = `${otp}|${expiration}`;
  
    return test;
  };
exports.getExpirationTimestampFromOTP = (otp) => {
    const parts = otp.split('|');
    const expiration = parseInt(parts[1]);
    if (isNaN(expiration)) {
      throw new Error('Invalid expiration  in OTP');
    }
    return expiration;
  }

exports.mailTransport = ()=>
    nodemail.createTransport({
        service: process.env.service,
        auth:{
            user:process.env.user,
            pass:process.env.pass
        }

    })

exports.generateToken =(id)=>{
    return jwt.sign({id},process.env.jwt_Secret,{
        expiresIn: "1d",
    })
}