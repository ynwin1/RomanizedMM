import createApp from "../../src/app.js";
import { agent as request } from 'supertest';
import {expect} from "chai";
import sinon from "sinon";

describe('POST /submitForm', () => {
    let app;
    let formData;
    let fetchStub;

    const api = "/api/submitForm"
    const successfulSubmissionMsg = "Song requested successfully ✅. Stay tuned! 🤩"
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
            .post(api)
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
            .post(api)
            .send({formData})
            .set('Accept', 'application/json');

        expect(resp.status).to.equal(200);
        expect(resp.body).to.include({ message: successfulSubmissionMsg });
    });

    it ('should return 500 on a failed form submission', async () => {
        fetchStub.rejects(new Error("Something went wrong while submitting form!"));

        formData = {
            songName: "anotherSong"
        }

        const resp = await request(app)
            .post(api)
            .send({formData})
            .set('Accept', 'application/json');

        expect(resp.status).to.equal(500);
        expect(resp.body).to.include({ message: failedSubmissionMsg });
    });
})