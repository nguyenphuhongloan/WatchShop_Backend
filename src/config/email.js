const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { CLIENT_ID } = require("../config/index");
const { CLIENT_SECRET } = require("../config/index");
const { EMAIL } = require("../config/index");
const { REFRESH_TOKEN } = require("../config/index");

const createTransport = async () => {
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, "https://developers.google.com/oauthplayground");
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const myAccessTokenObject = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject("Failed to create access token :(");
            }
            resolve(token);
        });
    });
    const myAccessToken = myAccessTokenObject
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,

        },
    });
    return transporter;
};
const createMailOptionsRegister = (email, link) =>{
    return {
        to: email,
        subject: "Xác nhận đăng nhập",
        html: `<h2>Xác nhận đăng nhập</h2>
                <h3>Chào bạn,</h3>
                <div>Vui lòng nhấn vào nút dưới đây để xác nhận đăng nhập: </div>
                <div style="text-align:center" >
                    <a href='${link}'>
                        <button style="margin: 15px auto; height: 35px; padding: 5px 10px 5px; border-radius: 5px; background-color: cornflowerblue; color: white; font-weight: bold; font-size: 14px; border: none">Xác nhận đăng nhập</button>
                    </a>
                </div>`
    }
};
const createMailOptionsResetPassword = (email, link) => {
    return {
        to: email,
        subject: "Xác nhận đặt lại mật khẩu",
        html: `<h2>Xác nhận đặt lại mật khẩu</h2>
                <h3>Chào bạn,</h3>
                <div>Vui lòng nhấn vào nút dưới đây để xác nhận đặt lại mật khẩu: </div>
                <div style="text-align:center" >
                    <a href='${link}'>
                        <button style="margin: 15px auto; height: 35px; padding: 5px 10px 5px; border-radius: 5px; background-color: cornflowerblue; color: white; font-weight: bold; font-size: 14px; border: none">Xác nhận đặt lại mật khẩu</button>
                    </a>
                </div>`
    }
};
const defaultMailOptionsValues = {
    Register: "REGISTER",
    ResetPassword: "RESET_PASSWORD"
}
module.exports = {
    createTransport,
    createMailOptionsRegister,
    createMailOptionsResetPassword,
    defaultMailOptionsValues,
}