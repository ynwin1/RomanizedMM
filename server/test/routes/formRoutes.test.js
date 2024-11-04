import createApp from "../../src/app.js";
import { agent as request } from 'supertest';
import {expect} from "chai";
import sinon from "sinon";
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import {SongNameMissingError, WebhookSendError} from "../../src/utils/Exceptions.js";
import SongRequest from "../../src/model/SongRequest.js";

describe('Form TestSuite', () => {
    let mongoServer;
    let app;
    let formData;
    let fetchStub;

    const song_request_api = "/api/submitForm"
    const song_report_api = "/api/submitReport"
    const successfulSubmissionMsg = "Song requested successfully ✅. It may take 1-2 days, so stay tuned! 🤩"
    const failedSubmissionMsg = "Oops! there was an error 😩. Please try again! 🙏🏻"

    before(async () => {
        app = createApp();

        // Mongo setup
        mongoServer = await MongoMemoryServer.create();
        const mongoURI = (await mongoServer).getUri();
        await mongoose.connect(mongoURI);

        try {
            await SongRequest.create([
                { songName: "song1", artist: "artist1", youtubeLink: "youtubeLink1", details: "details1"},
                { songName: "song2", artist: "artist2", youtubeLink: "youtubeLink2", details: "details2"}
            ]);
        } catch (e) {
            console.error("Error setting up song request test data");
        }
    })

    beforeEach(() => {
        fetchStub = sinon.stub(global, 'fetch');
    })

    afterEach(() => {
        fetchStub.restore();
    })

    after(async () => {
        await mongoose.connection.close();
        await mongoServer.stop();
    })

    it ('should return 201 upon successful form submission with all fields filled', async () => {
        formData = {
            songName: "newSong",
            artist: "newArtist",
            youtubeLink: "newYoutubeLink",
            details: "newDetails"
        }
        fetchStub.resolves({ok: true});
        const resp = await request(app)
            .post(song_request_api)
            .send({formData})
            .set('Accept', 'application/json');

        // check if formData is in the database
        const songRequest = await SongRequest.findOne({ songName: "newSong" });
        expect(songRequest).to.not.be.null;

        expect(resp.status).to.equal(201);
        expect(resp.body).to.include({ message: successfulSubmissionMsg });
    });

    it ('should return 201 upon successful form submission with only songName & artist filled', async () => {
        fetchStub.resolves({ok: true});
        formData = {
            songName: "anotherSong",
            artist: "anotherArtist"
        }
        const resp = await request(app)
            .post(song_request_api)
            .send({formData})
            .set('Accept', 'application/json');

        // check if formData is in the database
        const songRequest = await SongRequest.findOne({ songName: "anotherSong" });
        expect(songRequest).to.not.be.null;

        expect(resp.status).to.equal(201);
        expect(resp.body).to.include({ message: successfulSubmissionMsg });
    });

    it ('should return 201 upon successful form submission with only some fields filled', async () => {
        fetchStub.resolves({ok: true});
        formData = {
            songName: "anotherSong1",
            artist: "anotherArtist1",
            details: "can't find on Youtube!"
        }
        const resp = await request(app)
            .post(song_request_api)
            .send({formData})
            .set('Accept', 'application/json');

        // check if formData is in the database
        const songRequest = await SongRequest.findOne({ songName: "anotherSong1" });
        expect(songRequest).to.not.be.null;

        expect(resp.status).to.equal(201);
        expect(resp.body).to.include({ message: successfulSubmissionMsg });
    });

    it ('should return 400 on a failed form submission with missing required fields', async () => {
        fetchStub.rejects(new SongNameMissingError("Something went wrong while submitting form!"));

        formData = {
            details: "I forgot the song name!"
        }

        const resp = await request(app)
            .post(song_request_api)
            .send({formData})
            .set('Accept', 'application/json');

        const songRequest = await SongRequest.findOne({ details: "I forgot the song name!" });
        expect(songRequest).to.be.null;

        expect(resp.status).to.equal(400);
        expect(resp.body).to.include({ message: failedSubmissionMsg });
    });

    it ('should return 500 on a failed form submission', async () => {
        fetchStub.rejects(new Error("Something went wrong while submitting form!"));

        formData = {
            songName: "newDay",
            details: "I forgot the song name!"
        }

        const resp = await request(app)
            .post(song_request_api)
            .send({formData})
            .set('Accept', 'application/json');

        const songRequest = await SongRequest.findOne({ songName: "newDay" });
        expect(songRequest).to.be.null;

        expect(resp.status).to.equal(500);
        expect(resp.body).to.include({ message: failedSubmissionMsg });
    });

    it ('should return 500 on a failed form submission with webhook failure', async () => {
        fetchStub.rejects(new WebhookSendError("Something went wrong while submitting form!"));

        formData = {
            songName: "discordSong"
        }

        const resp = await request(app)
            .post(song_request_api)
            .send({formData})
            .set('Accept', 'application/json');

        const songRequest = await SongRequest.findOne({ songName: "discordSong" });
        expect(songRequest).to.be.null;

        expect(resp.status).to.equal(500);
        expect(resp.body).to.include({ message: failedSubmissionMsg });
    });

    // REPORT TESTS

    it ('should return 200 upon successful report submission with all fields filled', async () => {
        fetchStub.resolves({ok: true});
        formData = {
            songName: "newSong",
            artist: "newArtist",
            report: "newReport"
        }
        const resp = await request(app)
            .post(song_report_api)
            .send({formData})
            .set('Accept', 'application/json');

        expect(resp.status).to.equal(200);
        expect(resp.body).to.include({ message: "Report/Suggestion submitted successfully ✅. Thank you!" });
    });

    it ('should not send a report with missing report field', async () => {
        fetchStub.rejects(new Error("Something went wrong while submitting form!"));

        formData = {
            songName: "newSong",
            artist: "newArtist",
            report: "",
        }

        const resp = await request(app)
            .post(song_report_api)
            .send({formData})
            .set('Accept', 'application/json');

        expect(resp.status).to.equal(400);
        expect(resp.body).to.include({ message: failedSubmissionMsg });
    });
})