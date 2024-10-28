import React, {useEffect} from "react";
import {QuizButton, QuizCard} from "./QuizStyling";
import allSongs from "../SearchBar/SongHost";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

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

export function AnswerCard(props) {
    return (
        <QuizCard>
            <IconButton onClick={() => props.setQuiz(false)} sx={{marginTop: '1rem'}}>
                <CloseIcon sx={{fontSize: '30px', color: 'white'}}/>
            </IconButton>
            <img src={props.song.image} alt={props.song.songName} style={{width: '30%', height: 'auto'}}/>
            <h2>{props.guess ? `Correct ✅` : `Wrong ❎`}</h2>
            {!props.guess && <h3>{`You selected ${props.song.burmese[props.guess.index]}`}</h3>}
            <h3>{`The correct lyrics is ${props.correctAnswer}`}</h3>
            <h3>{`Listen to ${props.song.songName} by ${props.song.artistName} now!`}</h3>
            <Link to={`/song/${props.trimmedSongName}`}
                  style={{ fontSize: '20px', color: 'inherit', textDecoration: 'inherit' }}
            >
                <PlayCircleIcon sx={{fontSize: '20px', color: 'white'}}/>
            </Link>
        </QuizCard>
    );
}

export function GuessTheLyrics(props) {
    const [showAnswer, setShowAnswer] = React.useState(false);
    const [guess, setGuess] = React.useState(false);

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
    // remove spaces and join them
    const trimmedSongName = songName.split('(')[0].trim().split(" ").join("");
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

    const correctRomAnswer = `${romanizedLyrics[randomRomIndex - 1]}\n${romanizedLyrics[randomRomIndex]}\n${romanizedLyrics[randomRomIndex + 1]}`;
    const correctBurAnswer = `${burmeseLyrics[randomBurIndex - 1]}\n${burmeseLyrics[randomBurIndex]}\n${burmeseLyrics[randomBurIndex + 1]}`;

    function revealAnswer(option) {
        console.log("Setting answer");
        setShowAnswer(true);
        setGuess(option.correct);
    }

    // NOTE: Only burmese options for now
    return (
        <div className="quiz-container">
            {showAnswer ?
                <QuizCard>
                    <IconButton onClick={() => props.setQuiz(false)} sx={{marginTop: '1rem'}}>
                        <CloseIcon sx={{fontSize: '30px', color: 'white'}}/>
                    </IconButton>
                    <img src={chosenSong.imageLink} alt={songName}
                         style={{width: '30%', height: 'auto',
                             borderRadius: '80px', borderColor: 'white', borderWidth: '2px', borderStyle: 'solid'}}/>
                    <h2>{guess ? `Correct ✅` : `Wrong ❎`}</h2>
                    {!guess && <h3>{`You selected ${burmeseLyrics[guess.index]}`}</h3>}
                    <h3>{correctBurAnswer}</h3>
                    <h3>{`Listen to ${songName} by ${artistName}`}</h3>
                    <Link to={`/song/${trimmedSongName}`}
                          >
                        <IconButton>
                            <PlayCircleIcon sx={{fontSize: '40px', color: 'white'}} />
                        </IconButton>
                    </Link>
                </QuizCard>
                :
                <QuizCard>
                    <IconButton onClick={() => props.setQuiz(false)} sx={{marginTop: '1rem'}}>
                        <CloseIcon sx={{fontSize: '30px', color: 'white'}}/>
                    </IconButton>
                    <h2>Guess the Lyrics</h2>
                    <h3>{BurLyricsQuestion}</h3>
                    {BurOptions.map((option, index) => (
                        <QuizButton key={index} onClick={() => revealAnswer(option)}>
                            {burmeseLyrics[option.index]}
                        </QuizButton>
                    ))}
                </QuizCard>
            }
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