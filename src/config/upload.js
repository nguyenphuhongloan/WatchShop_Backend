const { google } = require("googleapis");
const { CLIENT_ID } = require("../config/index");
const { CLIENT_SECRET } = require("../config/index");
const { REDIRECT_URI } = require("../config/index");
const { REFRESH_TOKEN } = require("../config/index");
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});
module.exports = drive;
