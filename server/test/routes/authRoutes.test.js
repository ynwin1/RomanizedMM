import { agent as request } from 'supertest';
import createApp from "../../src/app.js";
import {expect} from "chai";

describe("Auth TestSuite", () => {
    let app;

    const correctUsername = process.env.ADMIN_USERNAME;
    const correctPassword = process.env.ADMIN_PASSWORD;
    const incorrectUsername = process.env.TEST_ADMIN_WRONG_USERNAME;
    const incorrectPassword = process.env.TEST_ADMIN_WRONG_PASSWORD;

    const logInAPI = "/api/login";

    before(() => {
        app = createApp();
    });

    async function login(username, password) {
        try {
            return await request(app)
                .post(logInAPI)
                .send({ username, password });
        } catch (e) {
            console.error("Error while logging in", e);
        }
    };

    it("should return 200 for correct credentials",  async () => {
        try {
            const resp = await login(correctUsername, correctPassword);
            expect(resp.status).to.equal(200);
            expect(resp.body.message).to.equal("Login successful");
        } catch (e) {
            expect.fail("Should not have failed while logging in" + e);
        }
    });

    it("should return 401 for correct username but incorrect password",  async() => {
        try {
            const resp = await login(correctUsername, incorrectPassword);
            expect(resp.status).to.equal(401);
            expect(resp.body.message).to.equal("Invalid password");
        } catch (e) {
            expect.fail("Should not have failed while logging in", e);
        }
    });

    it("should return 401 for correct password but incorrect username",  async() => {
        try {
            const resp = await login(incorrectUsername, correctPassword);
            expect(resp.status).to.equal(401);
            expect(resp.body.message).to.equal("Invalid username");
        } catch (e) {
            expect.fail("Should not have failed while logging in", e);
        }
    });

    it("should return 401 for incorrect username & password",  async() => {
        try {
            const resp = await login(incorrectUsername, incorrectPassword);
            expect(resp.status).to.equal(401);
            expect(resp.body.message).to.equal("Invalid credentials");
        } catch (e) {
            expect.fail("Should not have failed while logging in", e);
        }
    });
});