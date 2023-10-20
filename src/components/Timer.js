import React, { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(0); // Initial time in milliseconds (e.g., 2 minutes)
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (isActive) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isActive, time]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Handle the key press event here
      // For example, you can check which key was pressed using event.key

      try {
        if (event.key === "Enter") {
          resetTimer();
        } else if (event.key === "Space") {
          pauseTimer();
        } else if (
          event.key === "ArrowUp" ||
          event.key === "ArrowDown" ||
          event.key === "ArrowLeft" ||
          event.key === "ArrowRight"
        ) {
          startTimer();
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(0); // Reset to the initial time in milliseconds
  };

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  return (
    <div className="absolute  left-4 top-4">
      <p className="text-2xl font-medium text-white">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}:
        {String(milliseconds).padStart(2, "0")}
      </p>
    </div>
  );
}

export default Timer;
