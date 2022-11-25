const Email = require("../config/email");

const sendEmail = async (email, link, option) => {
    try{
        var mailOptions = {};
        if(option == Email.defaultMailOptionsValues.Register)
            mailOptions = Email.createMailOptionsRegister(email, link);
        if (option == Email.defaultMailOptionsValues.ResetPassword)
            mailOptions = Email.createMailOptionsResetPassword(email, link);
        const transport = Email.createTransport();
        await (await transport).sendMail(mailOptions)
        return {
            success: true,
            message: "Email send"
        }
    } catch (err){
        return {
            success: false,
            message: "An error occurred"
        }
    }
}
module.exports = {
    sendEmail
}