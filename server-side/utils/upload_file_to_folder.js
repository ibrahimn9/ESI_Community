const axios = require('axios');
const { google } = require('googleapis');




const authenticateGoogle = () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: `./googlekey1.json`,
        scopes: "https://www.googleapis.com/auth/drive",
    });
    return auth;
};

async function uploadFileToDrive(url, folderId) {
    const auth = authenticateGoogle();
    const drive = google.drive({ version: 'v3', auth });

    const fileId = url.match(/[-\w]{25,}/)?.[0];
    if (!fileId) {
        throw new Error('Invalid URL format');
    }

    const { data: fileMetadata } = await drive.files.get({
        fileId,
        fields: 'name,mimeType',
    });

    const file = await axios({
        method: 'get',
        url: `https://drive.google.com/uc?id=${fileId}&export=download`,
        responseType: 'stream',
    });

    const media = {
        mimeType: fileMetadata.mimeType,
        body: file.data,
    };

    const fileMetadataWithParents = {
        ...fileMetadata,
        parents: [folderId],
    };

    const { data: uploadedFile } = await drive.files.create({
        resource: fileMetadataWithParents,
        media,
        fields: 'id',
    });

    console.log(`File ${fileMetadata.name} uploaded to ${uploadedFile.id}`);
}


async function find_folder_by_name(Class, Semester, Module, Type, auth) {
    const drive = google.drive({ version: 'v3', auth });

    // Search for the Class folder and get its ID
    const classQuery = `mimeType='application/vnd.google-apps.folder' and name='${Class}'`;
    const classResponse = await drive.files.list({
        q: classQuery,
        fields: 'files(id)',
        spaces: 'drive',
        auth: auth,
    });

    if (classResponse.data.files.length === 0) {
        throw new Error(`No folder found for ${Class}`);
    }

    const classId = classResponse.data.files[0].id;
    console.log(classId)

    // Search for the Semester folder within the Class folder and get its ID
    const semesterQuery = `mimeType='application/vnd.google-apps.folder' and name='${Semester}' and '${classId}' in parents`;
    const semesterResponse = await drive.files.list({
        q: semesterQuery,
        fields: 'files(id)',
        spaces: 'drive',
        auth: auth,
    });

    if (semesterResponse.data.files.length === 0) {
        throw new Error(`No folder found for ${Class}/${Semester}`);
    }

    const semesterId = semesterResponse.data.files[0].id;
    console.log(semesterId)

    // Search for the Module folder within the Semester folder and get its ID
    const moduleQuery = `mimeType='application/vnd.google-apps.folder' and name='${Module}' and '${semesterId}' in parents`;
    const moduleResponse = await drive.files.list({
        q: moduleQuery,
        fields: 'files(id)',
        spaces: 'drive',
        auth: auth,
    });

    if (moduleResponse.data.files.length === 0) {
        throw new Error(`No folder found for ${Class}/${Semester}/${Module}`);
    }

    const moduleId = moduleResponse.data.files[0].id;

    // Search for the Type folder within the Module folder and get its ID
    const typeQuery = `mimeType='application/vnd.google-apps.folder' and name='${Type}' and '${moduleId}' in parents`;
    const typeResponse = await drive.files.list({
        q: typeQuery,
        fields: 'files(id)',
        spaces: 'drive',
        auth: auth,
    });

    if (typeResponse.data.files.length === 0) {
        throw new Error(`No folder found for ${Class}/${Semester}/${Module}/${Type}`);
    }
    console.log(typeResponse.data.files[0].id)

    return typeResponse.data.files[0].id;
}



module.exports = {
    uploadFileToDrive,
    find_folder_by_name,
    authenticateGoogle,
}