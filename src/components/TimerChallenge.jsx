import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    
    dialog.current.open();
  }

  function handleReset(){
    setTimeRemaining(targetTime * 1000);
  }  

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
      
    }, 10);
  }

  function hanldeStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal onReset={handleReset} ref={dialog} remainigTime={timeRemaining} targetTime={targetTime} />
      <section className="challenge">
        <h1>{title}</h1>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? hanldeStop : handleStart}>
            {timerIsActive ? "stop" : "start"}
          </button>
        </p>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? 'Time is running...' : 'TImer inactive'}
        </p>
      </section>
    </>
  );
}
