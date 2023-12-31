import createApp from "../../src/app.js";
import { agent as request } from 'supertest';
import {MongoMemoryServer} from "mongodb-memory-server";
import {expect} from "chai";
import mongoose from "mongoose";
import Song from "../../src/model/Song.js";

describe("GET /songs/search", () => {
    let mongoServer;
    let app;
    const search_API = "/api/songs/search"

    before(async () => {
        app = createApp();

        // Mongo setup
        mongoServer = await MongoMemoryServer.create();
        const mongoURI = (await mongoServer).getUri();
        await mongoose.connect(mongoURI);

        await Song.create({ songName: 'happySong', artistName: 'Tom', genre: 'Rock', about: 'Happy', lyrics: 'A' });
        await Song.create({ songName: 'Happy Home', artistName: 'Morris', genre: 'Disco', about: 'Happy', lyrics: 'C' });
        await Song.create({ songName: 'new Day $', artistName: 'Tom', genre: 'Jazz', about: 'Mood', lyrics: 'E' });
        await Song.create({ songName: 'old 1 2Day :(', artistName: 'James', genre: 'Blues', about: 'Mood', lyrics: 'F' });
    });

    after(async () => {
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    async function checkAPIRequest(searchTerm, statusCode, expectedNumOfSongs) {
        const resp = await request(app)
            .get(search_API)
            .query({ term: searchTerm })

        expect(resp.status).to.equal(statusCode);
        expect(resp.body).to.be.an("array");
        expect(resp.body).to.have.lengthOf(expectedNumOfSongs);
        for (let i = 0; i < resp.body.length; i++) {
            expect(resp.body[i].songName.toLowerCase().includes(searchTerm));
        }
    }

    it ('should return one song only matching search term', async() => {
        const searchTerm = "new";
        await checkAPIRequest(searchTerm, 200, 1);
    });

    it ('should return one song with search term containing non-alphabetical characters', async() => {
        const searchTerm = "$";
        await checkAPIRequest(searchTerm, 200, 1);
    });

    it ('should return one song with search term containing number', async() => {
        const searchTerm = "2Day";
        await checkAPIRequest(searchTerm, 200, 1);
    });

    it ('should return a list of songs matching search term', async() => {
        const searchTerm = "happy";
        await checkAPIRequest(searchTerm, 200, 2);
    });

    // successful search but did not find any matching songs
    it ('should still return 200 if no matching songs found', async() => {
        const searchTerm = "nonExisting";
        await checkAPIRequest(searchTerm, 200, 0);
    })
})