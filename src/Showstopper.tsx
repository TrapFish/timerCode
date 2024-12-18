import React, { useState, useEffect } from "react";

export default function Showstopper() {
  const [time, setTime] = useState({
    hour: 0,
    min: 0,
    sec: 0,
  });
  const [stratRunning, setStartRunning] = useState(false);

  const handleStart = () => {
    setStartRunning(true);
  };

  const handleStop = () => {
    setStartRunning(false);
  };

  const handleReset = () => {
    setStartRunning(false);
    setTime({
      hour: 0,
      min: 0,
      sec: 0,
    });
  };

  useEffect(() => {
    let intervalId;

    if (stratRunning) {
      intervalId = setInterval(() => {
        setTime((prevValue) => {
          const newSec = prevValue.sec + 1;
          const newMin = prevValue.min + Math.floor(newSec / 60);
          const newHour = prevValue.hour + Math.floor(newMin / 60);
          return {
            hour: newHour,
            min: newMin % 60,
            sec: newSec % 60,
          };
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [stratRunning]);

  return (
    <>
      <div>Stop Watch</div>
      <h3>
        {" "}
        {time.hour} : {time.min} : {time.sec}{" "}
      </h3>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
