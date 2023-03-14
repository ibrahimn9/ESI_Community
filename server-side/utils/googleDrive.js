const GOOGLE_API_FOLDER_ID = '1bvMHpYgslLLTQ3yVnbKHZ41EElATc5a4'
const { google } = require("googleapis")
const fs = require("fs")

const authenticateGoogle = () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: `./googlekey.json`,
        scopes: "https://www.googleapis.com/auth/drive",
    });
    return auth;
};

const uploadToGoogleDrive = async (file, auth) => {
    if (!file) {
        throw new Error('No file provided');
    }
    const fileMetadata = {
        name: file.originalname,
        parents: [GOOGLE_API_FOLDER_ID], 
    };

    const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
    };

    const driveService = google.drive({ version: "v3", auth });

    const response = await driveService.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: "id, webViewLink, webContentLink",
    });
    const fileId = response.data.id;
    await driveService.permissions.create({
        fileId: fileId,
        requestBody: {
            role: "reader",
            type: "anyone",
        },
    });
    return response.data;
};

module.exports = {
    authenticateGoogle,
    uploadToGoogleDrive,
}