import React from "react";
import {QuizButton, QuizCard} from "./QuizStyling";
import allSongs from "../SearchBar/SongHost";
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";

const SONG_COUNT = 1;
function selectRandomSongs(number) {
    const songs = allSongs();
    const randomSongs = [];
    for (let i = 0; i < number; i++) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        randomSongs.push(songs[randomIndex]);
    }
    return randomSongs;
}

export function GuessTheLyrics(props) {
    // select a random song from the database (from lyricsJSON)
    const randomSongs = selectRandomSongs(SONG_COUNT);
    const chosenSong = randomSongs[0];
    // extract random lyrics from the chosen song
    const romanizedLyrics = chosenSong.romanized.split('\n');
    const burmeseLyrics = chosenSong.burmese.split('\n');

    // lyrics to guess is sandwiched between two adjacent lyrics
    // NOTE: Usually Romanized and Burmese have the same number of lines but older data might not - NEED SYNC LATER
    let randomRomIndex = Math.floor(Math.random() * (romanizedLyrics.length - 2)) + 1;
    while (romanizedLyrics[randomRomIndex].trim() === "") {
        randomRomIndex = Math.floor(Math.random() * (romanizedLyrics.length - 2)) + 1;
    }
    let randomBurIndex = Math.floor(Math.random() * (burmeseLyrics.length - 2)) + 1;
    while (burmeseLyrics[randomBurIndex].trim() === "") {
        randomBurIndex = Math.floor(Math.random() * (burmeseLyrics.length - 2)) + 1;
    }

    // lyrics to be used as question
    const songName = chosenSong.songName;
    const artistName = chosenSong.artistName;
    const RomLyricsQuestion = `${romanizedLyrics[randomRomIndex - 1]}\n__________\n${romanizedLyrics[randomRomIndex + 1]}`;
    const BurLyricsQuestion = `${burmeseLyrics[randomBurIndex - 1]}\n__________\n${burmeseLyrics[randomBurIndex + 1]}`;

    // options
    const RomOptions = [{ index: randomRomIndex, correct: true }];
    const BurOptions = [{ index: randomBurIndex, correct: true }];

    // add 3 random options
    for (let i = 0; i < 3; i++) {
        // random index not contained in the options yet
        let randomRomOptionIndex = Math.floor(Math.random() * romanizedLyrics.length);
        let randomBurOptionIndex = Math.floor(Math.random() * burmeseLyrics.length);
        while (RomOptions.some(option => option.index === randomRomOptionIndex) &&
            randomRomOptionIndex !== randomRomIndex - 1 && randomRomOptionIndex !== randomRomIndex + 1) {
            randomRomOptionIndex = Math.floor(Math.random() * romanizedLyrics.length);
        }
        while (
            burmeseLyrics[randomBurOptionIndex].trim() === "" ||  // First check for empty string
            BurOptions.some(option => option.index === randomBurOptionIndex) ||  // Then other conditions
            randomBurOptionIndex === randomBurIndex - 1 ||
            randomBurOptionIndex === randomBurIndex + 1
            ) {
            randomBurOptionIndex = Math.floor(Math.random() * burmeseLyrics.length);
        }
        RomOptions.push({ index: randomRomOptionIndex, correct: false });
        BurOptions.push({ index: randomBurOptionIndex, correct: false });
    }

    // shuffle the options
    RomOptions.sort(() => Math.random() - 0.5);
    BurOptions.sort(() => Math.random() - 0.5);

    // NOTE: Only burmese options for now
    return (
        <div className="quiz-container">
            <QuizCard>
                <IconButton onClick={() => props.setQuiz(false)} sx={{marginTop: '1rem'}}>
                    <CloseIcon sx={{fontSize: '30px', color: 'white'}}/>
                </IconButton>
                <h2>Guess the Lyrics</h2>
                <h3>{BurLyricsQuestion}</h3>
                {BurOptions.map((option, index) => (
                    <QuizButton key={index}>
                        {burmeseLyrics[option.index]}
                    </QuizButton>
                ))}
            </QuizCard>
        </div>
    );
}

export function GuessTheSong() {
    return (
        <div className="quiz-container">
            <QuizCard>

            </QuizCard>
        </div>
    );
}