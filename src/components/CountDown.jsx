import { useEffect, useState } from "react";
import "./CountDown.css";

export default function CountDownTimer() {
    const [name, setName] = useState("");
    const [timeLeft, setTimeLeft] = useState(10);
    const [isRunning, setIsRunning] = useState(false);
    const [done, setIsDone] = useState(false);


    useEffect (() => {
        let timerId;

        if (isRunning && timeLeft > 0) {
            timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        }

        if (timeLeft == 0 && isRunning) {
            setIsRunning(false);
            setIsDone(true);
        }

        return() => {
            if (timerId) clearInterval(timerId);
        };
    }, [isRunning, timeLeft]); 

    const startTimer = () => {
        if (!name.trim()) return;
        setTimeLeft(10);
        setIsDone(false);
        setIsRunning(true);
      };
    
    
    const resetAll = () => {
        setName("");
        setTimeLeft(10);
        setIsRunning(false);
        setIsDone(false);
    };

    const tryAgain = () => {
        setName(name.trim());
        setTimeLeft(10);
        setIsRunning(true);
        setIsDone(false);
    }

    return (
        <div className="main-container">
            <h1 className="timer-title">
                CountDown Timer
            </h1>

            <input
             type="text"
             value={name}
             onChange={(e) => setName(e.target.value)}
             placeholder="Enter you name: "
             disabled={isRunning}
            />

            {!isRunning && !done && (
                <button
                onClick={startTimer}
                disabled={!name.trim() || isRunning}
                className={`btn btn-start ${!name.trim() ? "btn-start:disabled" : ""}`}
                >
                    Start Timer
                </button>
            )}

            {isRunning && (
                <p className="time-text">
                    {name.trim()}, left: {timeLeft} seconds.
                </p>
            )

            }

            {done && (
                <p className="finish-text">
                    You did it, {name.trim()}💪
                </p>
            )}

            <button
                onClick={resetAll} 
                className="btn btn-reset"
            >
                Reset
            </button>

            <button
                onClick={tryAgain} 
                className="btn btn-reset"
            >
                Try Again
            </button>

        </div>
    )

};

