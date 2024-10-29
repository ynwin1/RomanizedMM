import React, {useEffect, useState} from "react";
import {GuessTheLyrics, GuessTheSong} from "./Quiz";

function PopUpQuiz() {
    const [showQuiz, setShowQuiz] = useState(false);
    const timeThreshold = 1000 * 60 * 60 * 6; // 12 hours

    // random number between 0 and 1 - TO BE USED LATER
    // const random = Math.random();

    // Determine if pop up should be shown
    useEffect(() => {
        const lastVisit = Number(localStorage.getItem('lastVisit'));
        // parse the lastVisit string to a number
        const currentTime = new Date().getTime();

        if (!lastVisit || currentTime - lastVisit > timeThreshold) {
            setShowQuiz(true);
            localStorage.setItem('lastVisit', currentTime.toString());
        } else {
            setShowQuiz(false);
        }

        // disable scrolling when pop up is shown
        if (showQuiz) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, []);

    return (
        showQuiz ?
            <GuessTheLyrics setQuiz={setShowQuiz}/>
            :
            null
    );
}

export default PopUpQuiz;