import { useEffect, useState, useRef, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./CountDown.css";

export default function CountDownTimer() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const [name, setName] = useState(() => {
        const saved = localStorage.getItem("cdt_name");
        return saved ? saved : "";
    });

    const timeOptions = [10,20,30];
    const [selectedTime, setSelectedTime] = useState(10);

    const [timeLeft, setTimeLeft] = useState(10);
    const [isRunning, setIsRunning] = useState(false);
    const [done, setIsDone] = useState(false);

    const [runCount, setRunCount] = useState(() => {
        const savedCount = localStorage.getItem("cdt_count");
        return savedCount ? Number(savedCount) : 0;
    });

    const motiv_quotes = [
        "You can do this!",
        "Bro come on, its easy",
        "Better late than never, buddy",
        "You are roocking it",
    ]
    const [currentQuote, setCurrentQuote] = useState("");

    const progressBar = useRef(selectedTime);

    useEffect (() => {
        if (!isRunning) {
            setTimeLeft(selectedTime);
            progressBar.current = selectedTime;
            setIsDone(false);
            setCurrentQuote("");
        }
    }, [selectedTime, isRunning]);


    useEffect (() => {
        let timerId= null;

        if (isRunning && timeLeft > 0) {
            timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        }

        if (timeLeft == 0 && isRunning) {
            setIsRunning(false);
            setIsDone(true);
            setRunCount((prev) => {
                const next = prev + 1;
                localStorage.setItem("cdt_count", String(next));
                return next;
            })

            const random = Math.floor(Math.random() * motiv_quotes.length);
            setCurrentQuote(motiv_quotes[random]);
        }

        return() => {
            if (timerId) clearInterval(timerId);
        };
    }, [isRunning, timeLeft]); 


    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        localStorage.setItem("cdt_name", newName);
    }

    const handleTimeSelect = (e) => {
        const val = Number(e.target.value);
        setSelectedTime(val);
    }

    const startTimer = () => {
        if (!name.trim()) return;
        setTimeLeft(selectedTime);
        progressBar.current = selectedTime;
        setIsDone(false);
        setIsRunning(true);
      };
    
    
    const resetAll = () => {
        setName("");
        localStorage.removeItem("cdt_name");
        setTimeLeft(selectedTime);
        setIsRunning(false);
        setIsDone(false);
        setCurrentQuote("");
    };

    const tryAgain = () => {
        setName(name.trim());
        setTimeLeft(selectedTime);
        setIsRunning(true);
        setIsDone(false);
        setCurrentQuote("");
    }

    const progressPercent = progressBar.current
    ? ((progressBar.current - timeLeft)/progressBar.current) * 100
    : 0;

    return (
        <div className="main-container">

            <button onClick={toggleTheme} className="btn btn-toggle">
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
            <h1 className="timer-title">
                CountDown Timer
            </h1>

            <div>
                <select
                value={selectedTime}
                onChange={handleTimeSelect}
                disabled={isRunning}  
            >
                {timeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt} sec
                    </option>
                ))}  
                </select>
            </div>

            <input
             type="text"
             value={name}
             onChange={handleNameChange}
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
            )}

            {isRunning && (
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              )}
        

            {done && (
                <>
                <p className="finish-text">
                    You did it, {name.trim()}💪
                </p>
                <p>
                    {currentQuote && (
                        "{currentQuote}"
                    )}
                </p>
                </>
            )}

            <p className="run-count">
                Timer finished: {runCount} times 
            </p>

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

