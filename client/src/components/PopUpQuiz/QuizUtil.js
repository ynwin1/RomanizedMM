import React from "react";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from "react-router-dom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {QuizButton, QuizCard} from "./QuizStyling";
import allSongs from "../SearchBar/SongHost";

// Question object
export function Question() {
    this.question = "";
    this.options = [];
    this.correctAnswer = "";
}

// Select random songs of given number
export function selectRandomSongs(number) {
    const songs = allSongs();
    const randomSongs = [];
    for (let i = 0; i < number; i++) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        randomSongs.push(songs[randomIndex]);
    }
    return randomSongs;
}

// Process the question for Guess the Lyrics
export function questionProcessingGTL(song, lyrics) {
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
        while (quizQ.options.some(option => lyrics[option.index].toLowerCase() === lyrics[randomOptionIndex].toLowerCase()) &&
        randomOptionIndex !== quesIndex - 1 && randomOptionIndex !== quesIndex + 1 ||
        lyrics[randomOptionIndex].trim() === "") {
            randomOptionIndex = Math.floor(Math.random() * lyrics.length);
        }
        quizQ.options.push({ index: randomOptionIndex, correct: false });
    }

    // shuffle the options
    quizQ.options.sort(() => Math.random() - 0.5);

    return quizQ;
}

/* QUIZ COMPONENTS */
// Quiz Question component
export function QuizQuestion(props) {
    return (
        <QuizCard>
            <IconButton onClick={() => props.setQuiz(false)} sx={{ marginTop: '1rem' }}>
                <CloseIcon sx={{ fontSize: '30px', color: 'white' }} />
            </IconButton>
            <h2>Guess the Lyrics</h2>
            <h3>{props.question}</h3>
            {props.options.map((option, index) => (
                <QuizButton key={index} onClick={() => props.revealAnswer(option)}>
                    {props.lyrics[option.index]}
                </QuizButton>
            ))}
            <p>* Romanized & Meaning Coming Soon!</p>
        </QuizCard>
    )
}

// Quiz Answer component
export function QuizAnswer(props) {
    const trimmedSongName = props.songName.split('(')[0].trim().split(" ").join("");
    return (
        <QuizCard>
            <IconButton onClick={() => props.setQuiz(false)} sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <CloseIcon sx={{ fontSize: '30px', color: 'white' }} />
            </IconButton>
            <h3>{`${props.songName} by ${props.artistName}`}</h3>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <Link to={`/song/${trimmedSongName}`}>
                    <IconButton onClick={() => props.setQuiz(false)}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    fontSize: '60px',
                                    opacity: '0.8'
                                }}>
                        <PlayCircleIcon sx={{ fontSize: '60px', color: 'white' }} />
                    </IconButton>
                </Link>
                <img src={props.imageLink} alt={props.songName}
                     style={{
                         width: '8rem', height: 'auto',
                         borderRadius: '100px', borderColor: 'white', borderWidth: '2px', borderStyle: 'solid'
                     }} />
            </div>
            <h2>{props.guess ? `Correct ✅` : `Wrong ❎`}</h2>
            <h3>{props.correctAnswer}</h3>
            <p>* Guess the lyrics every 6 hours</p>
        </QuizCard>
    )
}

