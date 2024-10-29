import React, { useState, useRef } from "react";
import { QuizCard } from "./QuizStyling";
import {questionProcessingGTL, QuizAnswer, QuizQuestion, selectRandomSongs} from "./QuizUtil";

const SONG_COUNT = 1;

export function GuessTheLyrics(props) {
    // NOTE: Only burmese options for now
    const [showAnswer, setShowAnswer] = useState(false);
    const [guess, setGuess] = useState(false);

    // useRef to store the selected song and question
    const chosenSongRef = useRef(selectRandomSongs(SONG_COUNT)[0]);
    const burmeseLyricsRef = useRef(chosenSongRef.current.burmese.split('\n'));
    const questionRef = useRef(questionProcessingGTL(chosenSongRef.current, burmeseLyricsRef.current));

    // extract song name and artist name
    const songName = chosenSongRef.current.songName;
    const artistName = chosenSongRef.current.artistName;

    function revealAnswer(option) {
        setShowAnswer(true);
        setGuess(option.correct);
    }

    // NOTE: Only burmese options for now
    return (
        <div className="quiz-container">
            {showAnswer ?
                <QuizAnswer
                    songName={songName}
                    artistName={artistName}
                    imageLink={chosenSongRef.current.imageLink}
                    guess={guess}
                    correctAnswer={questionRef.current.correctAnswer}
                    setQuiz={props.setQuiz}
                />
                :
                <QuizQuestion
                    question={questionRef.current.question}
                    options={questionRef.current.options}
                    lyrics={burmeseLyricsRef.current}
                    revealAnswer={revealAnswer}
                    setQuiz={props.setQuiz}
                />
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