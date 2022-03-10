import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Start from "./components/Start";
import quizDataJSON from "./data/quiz.json";
import End from "./components/End";
import { shuffle } from "lodash";

function App() {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState(15);
  const [quizData, setQuizData] = useState([]);

  const fetchQuizData = () => {
    // fetch from json file
    const data = shuffle(quizDataJSON.data);

    // or fetch data from api (make it async)
    // const data = fetch('http://abc/abc.json')
    // .then(response => response.json())
    // .then(data => console.log(data));

    setQuizData(data);
  };

  const quizStartHandler = () => {
    setStep(2);
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  return (
    <>
      {step === 1 && <Start onQuizStart={quizStartHandler} />}
      {step === 2 && (
        <Question
          data={quizData[activeQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={quizData.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
        />
      )}
      {step === 3 && <End results={answers} data={quizData} time={time} />}
    </>
  );
}

export default App;
