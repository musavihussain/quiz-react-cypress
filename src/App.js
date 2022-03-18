import React, { useState, useEffect, Suspense, lazy } from "react";
import quizDataJSON from "./data/quiz.json";
import { shuffle } from "lodash";

const Start = lazy(() => import("./components/Start"));
const Question = lazy(() => import("./components/Question"));
const End = lazy(() => import("./components/End"));

function App() {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [showOptionRemoval, setShowOptionRemoval] = useState(true);

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

  const twoOptionRemovalHandler = () => {
    const questions = quizData;
    const currentQuestion = quizData[activeQuestion];
    let i = 0;
    const filteredChoices = quizData[activeQuestion].choices.filter((item) => {
      if (quizData[activeQuestion].answer !== item.value && i < 2) {
        i++;
        return false;
      } else {
        return true;
      }
    });

    currentQuestion.choices = filteredChoices;
    const mergedData = questions.map((item) => {
      if (item.question === currentQuestion.question) {
        return (item = currentQuestion);
      } else {
        return item;
      }
    });
    setQuizData(mergedData);
    setShowOptionRemoval(false);
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {step === 1 && <Start onQuizStart={quizStartHandler} />}
      {step === 2 && (
        <Question
          onRemoveWrongAnswers={twoOptionRemovalHandler}
          showOptionRemoval={showOptionRemoval}
          data={quizData[activeQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={quizData.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
        />
      )}
      {step === 3 && <End results={answers} data={quizData} />}
    </Suspense>
  );
}

export default App;
