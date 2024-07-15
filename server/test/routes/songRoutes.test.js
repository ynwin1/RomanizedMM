import createApp from "../../src/app.js";
import { agent as request } from 'supertest';
import {MongoMemoryServer} from "mongodb-memory-server";
import {expect} from "chai";
import mongoose from "mongoose";
import Song from "../../src/model/Song.js";

describe ("Songs TestSuite", () => {
    let mongoServer;
    let app;
    const search_API = "/api/songs/search";
    const add_song_API = "/api/songs/add"

    before(async () => {
        app = createApp();

        // Mongo setup
        mongoServer = await MongoMemoryServer.create();
        const mongoURI = (await mongoServer).getUri();
        await mongoose.connect(mongoURI);

        await Song.create({ mmid: '1', songName: 'happySong', artistName: 'Tom', genre: 'Rock', about: 'Happy', whenToListen: 'now', lyrics: 'A', romanized: 'r1', burmese: 'စကား', meaning: 'y1' });
        await Song.create({ mmid: '2', songName: 'Happy Home', artistName: 'Morris', genre: 'Disco', about: 'Happy', whenToListen: 'now', lyrics: 'C', romanized: 'r2', burmese: 'နှင်းတွေ', meaning: 'y2' });
        await Song.create({ mmid: '3', songName: 'new Day $', artistName: 'Tom', genre: 'Jazz', about: 'Mood', whenToListen: 'now', lyrics: 'E', romanized: 'r3', burmese: 'ဘဝ', meaning: 'y3' });
        await Song.create({ mmid: '4', songName: 'old 1 2Day :(', artistName: 'James', genre: 'Blues', about: 'Mood', whenToListen: 'now', lyrics: 'F', romanized: 'r4', burmese: 'မင်းမျက်နှာလေး', meaning: 'y4' });
    });

    after(async () => {
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    async function addSong(body, statusCode, respMsg) {
        const resp = await request(app)
            .post(add_song_API)
            .send(body)

        expect(resp.status).equals(statusCode);
        expect(resp.text).contains(respMsg);
    };

    async function verifySearch(searchTerm, statusCode, expectedNumOfSongs) {
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

    describe("GET /songs/search", () => {
        it ('should return one song only matching search term', async() => {
            const searchTerm = "new";
            await verifySearch(searchTerm, 200, 1);
        });

        it ('should return one song with search term containing non-alphabetical characters', async() => {
            const searchTerm = "$";
            await verifySearch(searchTerm, 200, 1);
        });

        it ('should return one song with search term containing number', async() => {
            const searchTerm = "2Day";
            await verifySearch(searchTerm, 200, 1);
        });

        it ('should return a list of songs matching search term', async() => {
            const searchTerm = "happy";
            await verifySearch(searchTerm, 200, 2);
        });

        // successful search but did not find any matching songs
        it ('should still return 200 if no matching songs found', async() => {
            const searchTerm = "nonExisting";
            await verifySearch(searchTerm, 200, 0);
        })
    })

    describe ("POST /songs/add", () => {
        const songAddSuccess = "Song successfully saved";
        const songAddFailed = "Failed to create song";

        const addSuccessStatus = 201;
        const addFailedStatus = 400;

        it("should create a song with all required fields filled in", () => {
            const body =
                {
                    mmid: '5', songName: 'newPopSong', artistName: 'Jey', genre: 'R&B', about: 'Nostalgia', whenToListen: 'now',
                    lyrics: 'E', romanized: 'r5', burmese: 'စကား', meaning: 'y5'
                };
            addSong(body, addSuccessStatus, songAddSuccess);
            verifySearch(body.songName, 200, 1);
        })
    });
});
