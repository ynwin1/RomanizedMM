import React, {useEffect, useState} from "react";
import {GuessTheLyrics, GuessTheSong} from "./Quiz";

// function PopUpQuiz() {
//     const [showPopUp, setShowPopUp] = useState(false);
//     const timeThreshold = 1000 * 60 * 60 * 12; // 12 hours
//
//     // random number between 0 and 1
//     const random = Math.random();
//
//     // Determine if pop up should be shown
//     useEffect(() => {
//         const lastVisit = Number(localStorage.getItem('lastVisit'));
//         // parse the lastVisit string to a number
//         const currentTime = new Date().getTime();
//
//         if (!lastVisit || currentTime - lastVisit > timeThreshold) {
//             setShowPopUp(true);
//             localStorage.setItem('lastVisit', currentTime.toString());
//         }
//     }, []);
//
//     return (
//         showPopUp ? (
//             {random} > 0.5 ?
//                 <GuessTheLyrics/>
//                 :
//                 <GuessTheSong/>
//         ) : null
//     );
// }

function PopUpQuiz() {
    const [showQuiz, setShowQuiz] = useState(true);
    const timeThreshold = 1000 * 60 * 60 * 12; // 12 hours

    // random number between 0 and 1
    const random = Math.random();

    // Determine if pop up should be shown
    // useEffect(() => {
    //     const lastVisit = Number(localStorage.getItem('lastVisit'));
    //     // parse the lastVisit string to a number
    //     const currentTime = new Date().getTime();
    //
    //     if (!lastVisit || currentTime - lastVisit > timeThreshold) {
    //         setShowQuiz(true);
    //         localStorage.setItem('lastVisit', currentTime.toString());
    //     }
    // }, []);

    return (
        showQuiz ?
            <GuessTheLyrics setQuiz={setShowQuiz}/>
            :
            null
    );
}

export default PopUpQuiz;