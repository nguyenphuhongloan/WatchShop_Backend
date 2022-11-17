const drive = require("../config/upload");
const { PARENT_FOLDER } = require("../config/index")
const stream = require('stream');
const uploadFile = async (file, dir = PARENT_FOLDER) => {
    try {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        const createFile = await drive.files.create({
            requestBody: {
                name: file.originalname + "-" + Date.now() + "-" + Math.round(Math.random() * 1E9),
                mimeType: file.mimeType,
                parents: [dir]
            },
            media: {
                mimeType: file.mimeType,
                body: bufferStream
            }
        });
        if (!createFile) {
            return {
                success: false,
                message: "Upload file failed"
            }
        }
        const isSetPublicFileSuccess = await setPublicFile(createFile.data.id);
        if(!isSetPublicFileSuccess.success) {
            return isSetPublicFileSuccess;
        }
        const url = await getLinkFile(createFile.data.id);
        if(!url.success) {
            return url;
        }
        return {
            success: true,
            message: "Upload file successfully",
            data: {
                file: createFile.data,
                url: url.data
            }
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        }
    }
};
const setPublicFile = async (id) => {
    try {
        const publicFIle = await drive.permissions.create({
            fileId: id,
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        });
        if (!publicFIle) {
            return {
                success: false,
                message: "Set public file failed"
            }
        }
        return {
            success: true,
            message: "Set public file successfully",
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        }
    }
};
const getLinkFile = async (id) => {
    try {
        const getURL = await drive.files.get({
            fileId: id,
            fields: "webContentLink"
        });
        if (!getURL) {
            return {
                success: false,
                message: "Get url file failed"
            }
        }
        const imageURL = getURL.data.webContentLink.replace("download", "view");
        return {
            success: true,
            message: "Get url file successfully",
            data: imageURL,
        }
    } catch (err) {
    
        return {
            success: false,
            message: "An error occurred"
        }
    }
}
module.exports = {
    uploadFile
}