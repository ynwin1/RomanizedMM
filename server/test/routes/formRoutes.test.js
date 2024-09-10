import createApp from "../../src/app.js";
import { agent as request } from 'supertest';
import {expect} from "chai";
import sinon from "sinon";
import {SongNameMissingError, WebhookSendError} from "../../src/utils/Exceptions.js";

describe('POST Form Test', () => {
    let app;
    let formData;
    let fetchStub;

    const song_request_api = "/api/submitForm"
    const song_report_api = "/api/submitReport"
    const successfulSubmissionMsg = "Song requested successfully ✅. It may take 1-2 days, so stay tuned! 🤩"
    const failedSubmissionMsg = "Oops! there was an error 😩. Please try again! 🙏🏻"

    before(() => {
        app = createApp();
    })

    beforeEach(() => {
        fetchStub = sinon.stub(global, 'fetch');
    })

    afterEach(() => {
        fetchStub.restore();
    })

    it ('should return 200 upon successful form submission with all fields filled', async () => {
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

        expect(resp.status).to.equal(200);
        expect(resp.body).to.include({ message: successfulSubmissionMsg });
    });

    it ('should return 200 upon successful form submission with only songName filled', async () => {
        fetchStub.resolves({ok: true});
        formData = {
            songName: "anotherSong"
        }
        const resp = await request(app)
            .post(song_request_api)
            .send({formData})
            .set('Accept', 'application/json');

        expect(resp.status).to.equal(200);
        expect(resp.body).to.include({ message: successfulSubmissionMsg });
    });

    it ('should return 200 upon successful form submission with only some fields filled', async () => {
        fetchStub.resolves({ok: true});
        formData = {
            songName: "anotherSong",
            details: "can't find on Youtube!"
        }
        const resp = await request(app)
            .post(song_request_api)
            .send({formData})
            .set('Accept', 'application/json');

        expect(resp.status).to.equal(200);
        expect(resp.body).to.include({ message: successfulSubmissionMsg });
    });

    it ('should return 400 on a failed form submission with missing song name', async () => {
        fetchStub.rejects(new SongNameMissingError("Something went wrong while submitting form!"));

        formData = {
            details: "I forgot the song name!"
        }

        const resp = await request(app)
            .post(song_request_api)
            .send({formData})
            .set('Accept', 'application/json');

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

        expect(resp.status).to.equal(500);
        expect(resp.body).to.include({ message: failedSubmissionMsg });
    });

    it ('should return 503 on a failed form submission with webhook failure', async () => {
        fetchStub.rejects(new WebhookSendError("Something went wrong while submitting form!"));

        formData = {
            songName: "anotherSong"
        }

        const resp = await request(app)
            .post(song_request_api)
            .send({formData})
            .set('Accept', 'application/json');

        expect(resp.status).to.equal(503);
        expect(resp.body).to.include({ message: failedSubmissionMsg });
    });

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