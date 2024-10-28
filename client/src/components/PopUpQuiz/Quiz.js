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

function Question() {
    this.question = "";
    this.options = [];
    this.correctAnswer = "";
}
function questionProcessingGTL(song, lyrics) {
    const quizQ = new Question();
    let quesIndex = Math.floor(Math.random() * (lyrics.length - 2)) + 1;
    while (lyrics[quesIndex].trim() === "") {
        quesIndex = Math.floor(Math.random() * (lyrics.length - 2)) + 1;
    }
    quizQ.question = `${lyrics[quesIndex - 1]}\n__________\n${lyrics[quesIndex + 1]}`;
    quizQ.correctAnswer = `${lyrics[quesIndex - 1]}\n${lyrics[quesIndex]}\n${lyrics[quesIndex + 1]}`;

    // options
    quizQ.options = [{ index: quesIndex, correct: true }];
    for (let i = 0; i < 3; i++) {
        let randomOptionIndex = Math.floor(Math.random() * lyrics.length);
        // criteria on selecting wrong options
        while (quizQ.options.some(option => option.index === randomOptionIndex) &&
            randomOptionIndex !== quesIndex - 1 && randomOptionIndex !== quesIndex + 1) {
            randomOptionIndex = Math.floor(Math.random() * lyrics.length);
        }
        quizQ.options.push({ index: randomOptionIndex, correct: false });
    }

    // shuffle the options
    quizQ.options.sort(() => Math.random() - 0.5);

    return quizQ;
}

export function GuessTheLyrics(props) {
    // NOTE: Only burmese options for now
    const [showAnswer, setShowAnswer] = React.useState(false);
    const [guess, setGuess] = React.useState(false);

    // select a random song from the database (from lyricsJSON)
    const chosenSong = selectRandomSongs(SONG_COUNT)[0];
    // extract random lyrics from the chosen song
    const burmeseLyrics = chosenSong.burmese.split('\n');

    // process the question
    const question = questionProcessingGTL(chosenSong, burmeseLyrics);

    // extract song name and artist name
    const songName = chosenSong.songName;
    const trimmedSongName = songName.split('(')[0].trim().split(" ").join("");
    const artistName = chosenSong.artistName;

    function revealAnswer(option) {
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
                    <h3>{question.correctAnswer}</h3>
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
                    <h3>{question.question}</h3>
                    {question.options.map((option, index) => (
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