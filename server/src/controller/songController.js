// create operation for updating song
export function createUpdateOperation(songUpdate) {
    const operation = { $set: {}, $unset: {} };
    for (let field in songUpdate) {
        // if the field is not in the request body, unset it
        if (songUpdate[field] === "") {
            operation.$unset[field] = "";
        } else {
            operation.$set[field] = songUpdate[field];
        }
    }

    // clean set & unset if empty
    if (Object.keys(operation.$set).length === 0) {
        delete operation.$set;
    }
    if (Object.keys(operation.$unset).length === 0) {
        delete operation.$unset;
    }
    return operation;
}

// check required fields in the request body
export function checkRequiredFields(songUpdate) {
    const requiredFields = ['songName', 'artistName', 'genre', 'about', 'whenToListen', 'lyrics', 'romanized', 'burmese', 'meaning'];
    for (let field of requiredFields) {
        if (!songUpdate[field]) {
            return false;
        }
    }
    return true;
}