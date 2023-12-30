import mongoose from "mongoose";
import sinon from "sinon";
import connectDB from "../../src/config/dbConnection.js";

describe('Database Connection', () => {
    let connectionStub;
    let loggingStub;

    const totalTries = 5;
    const successfulConnectionString = "MongoDB connected successfully!";

    const originalSetTimeout = global.setTimeout;

    beforeEach(() => {
        // replaces original mongoose.connect function with a stub
        connectionStub = sinon.stub(mongoose, 'connect');
        loggingStub = sinon.stub(console, 'log');
    })

    afterEach(() => {
        connectionStub.restore();
        loggingStub.restore();
    })

    // Testing async with timeouts is hard :( TODO - come back later

    it('should connect to the database successfully', async () => {
        connectionStub.resolves();
        await connectDB();
        sinon.assert.calledOnce(connectionStub);
        sinon.assert.calledWith(loggingStub, successfulConnectionString)
    });

    it ('should connect after a few failures', async () => {
        const totalAttempts = 3;

        try {
            // mock setTimeout to execute immediately in test
            global.setTimeout = (fn, delay) => {
                fn();
            };
            connectionStub.onCall(0).rejects();
            connectionStub.onCall(1).rejects();
            connectionStub.onCall(2).resolves();

            await connectDB();
        } catch (e) {
            sinon.fail(`Should have connected to the database but failed - ${e}`);
        } finally {
            global.setTimeout = originalSetTimeout;
        }

        sinon.assert.callCount(connectionStub, totalAttempts);
    });

    // it ('should fail after exhausting all tries', async() => {
    //     try {
    //         // mock setTimeout to execute immediately in test
    //         global.setTimeout = (fn, delay) => {
    //             fn();
    //         };
    //
    //         for (let i = 0; i < totalTries; i++) {
    //             connectionStub.onCall(i).rejects(new Error('Connection failed'));
    //         }
    //
    //         await connectDB();
    //         sinon.fail(`Should have failed to connect to the database`);
    //     } catch (e) {
    //         sinon.assert.callCount(connectionStub, totalTries);
    //         expect(e).to.be.instanceof(MongoDBConnectionError);
    //     } finally {
    //         global.setTimeout = originalSetTimeout;
    //     }
    // });
})