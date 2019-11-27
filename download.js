const lineReader = require('line-reader');
const config = require('./config');
const Axios = require('axios');
const colors = require('colors');
const Path = require('path');
const fs = require('fs');

let loadedPictures = [];
let addPicture = url => loadedPictures.push(url);

console.log('Loading the list of images ...'.yellow);

const downloadFile = async url => {
    const urlParts = url.split('/');
    let path = Path.resolve(__dirname, config.folder);

    if (!fs.existsSync(path))
        fs.mkdirSync(path);

    let fileName = `${path}/${urlParts[urlParts.length - 1]}`;

    if (fs.existsSync(fileName)) {
        const fileNameParts = fileName.split(".");
        fileName = `${fileName.replace('.' + fileNameParts[fileNameParts.length - 1], '').trim()}_${Math.floor(Math.random() * 999)}.${fileNameParts[fileNameParts.length - 1]}`;
    }

    path = Path.join(fileName);
    
    const writer = fs.createWriteStream(path);
    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};

const download = async url => {
    console.log(`Downloading: ${url}`.yellow);

    return await downloadFile(url)
        .then(() => {
            console.log(`Successfully downloaded: ${url}`.green);
            return new Promise((resolve, reject) => resolve());
        })
        .catch(error => {
            console.log(`Failed to download: ${url}\n${error}`.red);
            return new Promise((resolve, reject) => reject());
        });
};

const downloadFromList = async () => {
    let i = 0;

    while(i < loadedPictures.length) {
        await download(loadedPictures[i]);
        i ++;
    }
};

lineReader.eachLine(config.file, (line, last) => {
	addPicture(line);

	// If we finished with the reading of the file, let us download the images (3 s delay)
	if(last) {
        console.log(`Succesfully loaded ${loadedPictures.length} images!`.green);
        setTimeout(downloadFromList, 1000);
    }
});