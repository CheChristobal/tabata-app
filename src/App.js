import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const App = () => {
  const [timer, setTimer] = useState(0);
  const [totalTimer, setTotalTimer] = useState(0);
  const [isExercise, setIsExercise] = useState(true);
  const [sessions, setSessions] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  useEffect(() => {
    if (timer === 0) {
      setIsExercise((prevIsExercise) => !prevIsExercise);

      if (isExercise) {
        setSessions((prevSessions) => prevSessions - 1);
      }

      setTimer(isExercise ? 10 : 20);
    }
  }, [timer]);

  useEffect(() => {
    if (sessions === 0) {
      // Aquí puedes hacer algo cuando se hayan completado todas las sesiones
      console.log('Todas las sesiones completadas');
    }
  }, [sessions]);

  useEffect(() => {
    const exerciseTime = isExercise ? 10 : 20;
    setTotalTimer(sessions * exerciseTime);
  }, [sessions, isExercise]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSliderChange = (event) => {
    setSessions(parseInt(event.target.value, 10));
  };

  const resetTimer = () => {
    setTimer(isExercise ? 10 : 20);
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const remainingExercises = isExercise ? sessions : sessions - 1;
  const remainingRests = isExercise ? sessions - 1 : sessions;

  const minutesRemaining = Math.ceil(timer / 60);

  return (
    <div className="container">
      <h1>Aplicación Tabata</h1>
      <div className={`timer ${isExercise ? 'exercise' : 'rest'}`}>
        {formatTime(timer)}
      </div>
      {isExercise ? <h2>Ejercicio</h2> : <h2>Descanso</h2>}
      <div className="slider">
        <input
          type="range"
          min="1"
          max="8"
          step="1"
          value={sessions}
          onChange={handleSliderChange}
        />
      </div>
      <div className="button">
        {!isRunning && (
          <button onClick={startTimer}>Iniciar Tabata</button>
        )}
        {isRunning && (
          <button onClick={() => setIsRunning(false)}>Detener Tabata</button>
        )}
        <button onClick={resetTimer}>Resetear Timer</button>
      </div>
      <div className="remaining">
        Quedan {remainingExercises} ejercicios y {remainingRests} descansos.
      </div>
      <div className="total-timer">
        Timer Total: {formatTime(totalTimer)}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));


export default App;
