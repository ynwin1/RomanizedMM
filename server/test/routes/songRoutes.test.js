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
    const add_song_API = "/api/songs";


    before(async () => {
        app = createApp();

        // Mongo setup
        mongoServer = await MongoMemoryServer.create();
        const mongoURI = (await mongoServer).getUri();
        await mongoose.connect(mongoURI);

        try {
            await Song.create([
                { mmid: '1', songName: 'happySong', artistName: 'Tom', genre: 'Rock', about: 'Happy', whenToListen: 'now', lyrics: 'A', romanized: 'r1', burmese: 'စကား', meaning: 'y1' },
                { mmid: '2', songName: 'Happy Home', artistName: 'Morris', genre: 'Disco', about: 'Happy', whenToListen: 'now', lyrics: 'C', romanized: 'r2', burmese: 'နှင်းတွေ', meaning: 'y2' },
                { mmid: '3', songName: 'new Day $', artistName: 'Tom', genre: 'Jazz', about: 'Mood', whenToListen: 'now', lyrics: 'E', romanized: 'r3', burmese: 'ဘဝ', meaning: 'y3' },
                { mmid: '4', songName: 'old 1 2Day :(', artistName: 'James', genre: 'Blues', about: 'Mood', whenToListen: 'now', lyrics: 'F', romanized: 'r4', burmese: 'မင်းမျက်နှာလေး', meaning: 'y4' }
            ])
        } catch (e) {
            console.error("Error inserting documents:", e);
        }
    });

    after(async () => {
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    async function addSong(body, statusCode, respMsg) {
        try {
            const resp = await request(app)
                .post(add_song_API)
                .send(body)

            expect(resp.status).equals(statusCode);
            expect(resp.text).contains(respMsg);
        } catch (e) {
            console.log(`Error while adding song - ${e}`);
        }
    }

    async function updateSong(body, apiString, statusCode) {
        try {
            const resp = await request(app)
                .put(apiString)
                .send(body)

            expect(resp.status).equals(statusCode);
            return resp.body;
        } catch (e) {
            console.log(`Error while adding song - ${e}`);
        }
    }

    async function deleteSong(mmid, apiString, statusCode, respMsg) {
        try {
            const resp = await request(app)
                .delete(apiString)

            expect(resp.status).equals(statusCode);
            expect(resp.text).contains(respMsg);
        } catch (e) {
            console.log(`Error while adding song - ${e}`);
        }
    }

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

    describe ("POST /songs", () => {
        const songAddSuccessMsg = "Song successfully saved";
        const songAddFailedMsg = "Failed to create song";
        const addSuccessStatus = 201;
        const addFailedStatus = 400;

        it("should create a song with all required fields filled in",  async() => {
            const body =
                {
                    mmid: '5', songName: 'newPopSong', artistName: 'Jey', genre: 'R&B', about: 'Nostalgia', whenToListen: 'now',
                    lyrics: 'E', romanized: 'r5', burmese: 'စကား', meaning: 'y5'
                };
            try {
                await addSong(body, addSuccessStatus, songAddSuccessMsg);
                // verify document is already in the database
                await verifySearch(body.songName, 200, 1);
            } catch (e) {
                expect.fail(`Should not have failed with ${e}`);
            }
        });

        it("should not create a song with missing mmid",  async () => {
            const body =
                {
                    songName: 'newPopSong1', artistName: 'Jey', genre: 'R&B', about: 'Nostalgia', whenToListen: 'now',
                    lyrics: 'E', romanized: 'r5', burmese: 'စကား', meaning: 'y5'
                };
            try {
                await addSong(body, addFailedStatus, songAddFailedMsg);
                // verify document is already in the database
                await verifySearch(body.songName, 200, 0);
            } catch (e) {
                expect.fail(`Should not have failed with ${e}`);
            }
        });

        it("should not create a song with missing songName",  async() => {
            const intendedSongName = "newPopSong1";
            const body =
                {
                    mmid: '5', artistName: 'Jey', genre: 'R&B', about: 'Nostalgia', whenToListen: 'now',
                    lyrics: 'E', romanized: 'r5', burmese: 'စကား', meaning: 'y5'
                };
            try {
                await addSong(body, addFailedStatus, songAddFailedMsg);
                // verify document is already in the database
                await verifySearch(intendedSongName, 200, 0);
            } catch (e) {
                expect.fail(`Should not have failed with ${e}`);
            }
        });

        it("should create a song with optional value",  async() => {
            // optional Youtube link
            const body =
                {
                    mmid: '6', songName: 'newPopSong2', artistName: 'Jey', genre: 'R&B', about: 'Nostalgia', whenToListen: 'now',
                    lyrics: 'E', romanized: 'r5', burmese: 'စကား', meaning: 'y5', youtubeLink: 'https://www.youtube.com/watch?v=uvLOvCNIthE'
                };
            try {
                await addSong(body, addSuccessStatus, songAddSuccessMsg);
                // verify document is already in the database
                await verifySearch(body.songName, 200, 1);
            } catch (e) {
                expect.fail(`Should not have failed with ${e}`);
            }
        });
    });

    describe ("PUT /songs/:mmid", () => {
        const updateSuccessStatus = 200;
        const songReqFieldMissingStatus = 400;
        const songNotFoundStatus = 404;

        it ("should update a song successfully", async () => {
            const body = {
                songName: "happySongUpdated", //updated
                artistName: "Tom",
                albumName: "Happy Album",
                genre: "Rock",
                about: "Happy",
                whenToListen: "now",
                lyrics: "A",
                romanized: "this is romanized", //updated
                burmese: "စကား",
                meaning: "y1"
            };
            try {
                const mmidToUpdate = 1;
                const apiString = `/api/songs/${mmidToUpdate}`;

                const resp = await updateSong(body, apiString, updateSuccessStatus);
                if (resp.isUndefined) {
                    expect.fail("Should have updated a song, but failed");
                }
                expect(resp.songName).equals(body.songName);
                expect(resp.romanized).equals(body.romanized);
            } catch (e) {
                expect.fail("Should have updated a song, but failed");
            }
        });

        it ("should still update with unchanged data", async () => {
            const body = { songName: 'old 1 2Day :(', artistName: 'James', genre: 'Blues', about: 'Mood', whenToListen: 'now', lyrics: 'F', romanized: 'r4', burmese: 'မင်းမျက်နှာလေး', meaning: 'y4' }
            try {
                const mmidToUpdate = 4;
                const apiString = `/api/songs/${mmidToUpdate}`;

                const resp = await updateSong(body, apiString, updateSuccessStatus);
                if (resp.isUndefined) {
                    expect.fail("Should have updated a song, but failed");
                }
                // iterate through all fields to check if they are the same
                for (let field in body) {
                    expect(resp[field]).equals(body[field]);
                }
            } catch (e) {
                expect.fail("Should have updated a song, but failed");
            }
        });

        it ("should update a song with new optional attribute", async () => {
            const body = {
                songName: "Happy Home",
                artistName: "Tom",
                genre: "Rock",
                about: "Happy",
                whenToListen: "now",
                lyrics: "A",
                romanized: "r2",
                burmese: "စကား",
                meaning: "y1",
                youtubeLink: "https://www.youtube.com/watch?v=uvLOvCNIthE" //new
            };
            try {
                const mmidToUpdate = 2;
                const apiString = `/api/songs/${mmidToUpdate}`;

                const resp = await updateSong(body, apiString, updateSuccessStatus);
                if (resp.isUndefined) {
                    expect.fail("Should have updated a song, but failed");
                }
                // youtube link added to doc
                expect(resp.youtubeLink).equals(body.youtubeLink);
            } catch (e) {
                expect.fail("Should have updated a song, but failed");
            }
        });

        it ("should update a song with optional attribute removed", async () => {
            const body = {
                songName: "Happy Home",
                artistName: "Tom",
                genre: "Rock",
                about: "Happy",
                whenToListen: "now",
                lyrics: "A",
                romanized: "r2",
                burmese: "စကား",
                meaning: "y2",
                youtubeLink: "" // youtubeLink removed
            };
            try {
                const mmidToUpdate = 2;
                const apiString = `/api/songs/${mmidToUpdate}`;

                const resp = await updateSong(body, apiString, updateSuccessStatus);
                if (resp.isUndefined) {
                    expect.fail("Should have updated a song, but failed");
                }
                // youtube link removed from doc
                expect(resp.youtubeLink).equals(undefined);
            } catch (e) {
                expect.fail("Should have updated a song, but failed");
            }
        });

        it ("should not update a non-existing song", async () => {
            const body = {
                songName: "Happy Home",
                artistName: "Tom",
                genre: "Rock",
                about: "Happy",
                whenToListen: "now",
                lyrics: "A",
                romanized: "r2",
                burmese: "စကား",
                meaning: "y2"
            };
            try {
                // non-existing mmid
                const mmidToUpdate = 50;
                const apiString = `/api/songs/${mmidToUpdate}`;

                const resp = await updateSong(body, apiString, songNotFoundStatus);
                if (resp.isUndefined) {
                    expect.fail("Should have ret a song, but failed");
                }
                expect(resp.message).equals("Song not found");
            } catch (e) {
                expect.fail("Should have updated a song, but failed");
            }
        });

        it ("should not update a song with missing required field", async () => {
            const body = {
                // missing songName
                songName: "",
                artistName: "Tom",
                genre: "Rock",
                about: "Happy",
                whenToListen: "now",
                lyrics: "A",
                romanized: "r2",
                burmese: "စကား",
                meaning: "y2"
            };
            try {
                const mmidToUpdate = 2;
                const apiString = `/api/songs/${mmidToUpdate}`;

                const resp = await updateSong(body, apiString, songReqFieldMissingStatus);
                if (resp.isUndefined) {
                    expect.fail("Should have ret a song, but failed");
                }
                expect(resp.message).equals("Missing required fields");
            } catch (e) {
                expect.fail("Should have updated a song, but failed");
            }
        });
    });

    describe ("DELETE /songs/:mmid", () => {
        const songDelSuccessMsg = "Song successfully deleted";
        const songNotFoundMsg = "Song not found";

        const delSuccessStatus = 200;
        const songNotFoundStatus = 404;
        const delFailedStatus = 500;
        const songSearchSuccessStatus = 200;

        function formatAPIString(mmid) {
            return `/api/songs/${mmid}`;
        }

        it ("should delete a song successfully", async () => {
            try {
                const mmidToDelete = 2;
                const songNameToDelete = "Happy Home";
                await deleteSong(mmidToDelete, formatAPIString(mmidToDelete), delSuccessStatus, songDelSuccessMsg);
                await verifySearch(songNameToDelete, songSearchSuccessStatus, 0);
            } catch (e) {
                expect.fail("Should have deleted a song, but failed");
            }
        });

        it ("should not delete a non-existing song", async () => {
            try {
                const mmidToDelete = 50;
                const songNameToDelete = "NonExistingSong";
                await deleteSong(mmidToDelete, formatAPIString(mmidToDelete), songNotFoundStatus, songNotFoundMsg);
                await verifySearch(songNameToDelete, songSearchSuccessStatus, 0);
            } catch (e) {
                expect.fail("Should have deleted a song, but failed");
            }
        });

        it ("should not delete twice after first deletion", async() => {
            try {
                const mmidToDelete = 1;
                const songNameToDelete = "happySong";
                await deleteSong(mmidToDelete, formatAPIString(mmidToDelete), delSuccessStatus, songDelSuccessMsg);
                await verifySearch(songNameToDelete, songSearchSuccessStatus, 0);

                // delete again
                await deleteSong(mmidToDelete, formatAPIString(mmidToDelete), songNotFoundStatus, songNotFoundMsg);
                await verifySearch(songNameToDelete, songSearchSuccessStatus, 0);
            } catch (e) {
                expect.fail("Should have deleted a song, but failed");
            }
        })

    });


});
