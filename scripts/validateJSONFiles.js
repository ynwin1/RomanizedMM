import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname , ".." , "lyricsJSON");

function isValidJSONFile(content) {
    return content.hasOwnProperty('songName') && content.songName.trim() !== '' &&
        content.hasOwnProperty('artistName') && content.artistName.trim() !== '' &&
        content.hasOwnProperty('genre') && content.genre.trim() !== '' &&
        content.hasOwnProperty('about') && content.about.trim() !== '' &&
        content.hasOwnProperty('lyrics') && content.lyrics.trim() !== '' &&
        content.hasOwnProperty('whenToListen') && content.whenToListen.trim() !== '' &&
        content.hasOwnProperty('mmid') && (!isNaN(content.mmid) && typeof content.mmid === 'number')
}

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error(`Error reading directory - ${err.message}`);
        return;
    }

    let incorrectFileCount = 0;

    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(directoryPath, file);
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error(`Error when reading the file ${file} with error - ${err.message}`);
                    return;
                }

                try {
                    const jsonData = JSON.parse(data);
                    if (!isValidJSONFile(jsonData)) {
                        console.error(`JSON file - ${file} is invalid. Please review!`);
                        incorrectFileCount++;
                    }
                } catch (e) {
                    console.error(`Error parsing JSON in file ${file}: ${e.message}`);
                }
            })
        }
    });
    console.log(`${files.length - incorrectFileCount} out of ${files.length} JSON files were valid!`);
});
