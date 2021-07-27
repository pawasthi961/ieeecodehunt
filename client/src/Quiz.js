import React, { useCallback, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";

function Quiz() {
  const questions = [
    {
      questionText: "Who is Prime Minister of India?",
      answerOptions: [
        { answerText: "Vijay Rupani", isCorrect: false },
        { answerText: "Manmohan singh", isCorrect: false },
        { answerText: "Narendra Modi", isCorrect: true },
        { answerText: "Deep Patel", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tata?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Ratan Tata", isCorrect: true },
        { answerText: "Mukesh Ambani", isCorrect: false },
        { answerText: "Gautam Adani", isCorrect: false },
      ],
    },
    {
      questionText: "who is richest person in the world?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Mukesh Ambani", isCorrect: false },
        { answerText: "Warren Buffett", isCorrect: false },
      ],
    },
    {
      questionText: "how many countries in the world?",
      answerOptions: [
        { answerText: "120", isCorrect: false },
        { answerText: "183", isCorrect: false },
        { answerText: "170", isCorrect: false },
        { answerText: "195", isCorrect: true },
      ],
    },
  ];

  const initialCounter = () =>
    Number(window.localStorage.getItem("counter")) || 20;
  const [istrue, setistrue] = useState("false");
  const [counter, setCounter] = useState(initialCounter);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect === true) {
      setScore(score + 1);
    }

    const nextQuetions = currentQuestion + 1;
    if (nextQuetions < questions.length) {
      setCurrentQuestion(nextQuetions);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    localStorage.setItem("counter", counter);
  }, [counter]);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      const nextQuetions = currentQuestion + 1;
      if (nextQuetions < questions.length) {
        setCurrentQuestion(nextQuetions);
      } else {
        setShowScore(true);
      }
      setCounter(20);
    }
  }, [counter]); 

  const handler = () => {
    setistrue("true");
  };

  if (istrue === "false") {
    // return (
    //   <div>
    //     <h1>Quiz</h1>
    //     <Button onClick={handler}>Condition</Button>
    //     <div>{counter}</div>
    //   </div>
    // );
    return (
      <>
        <h1 className="header">Quiz</h1>
        <div>
          <Button onClick={handler}>Condition</Button>
          <div>{counter}</div>
        </div>
        <div className="app">
          {showScore ? (
            <div className="score-section">
              You scored {score} out of {questions.length}
            </div>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>
                  {questions.length}
                </div>
                <div className="question-text">
                  {questions[currentQuestion].questionText}
                </div>
              </div>

              <div className="answer-section">
                {questions[currentQuestion].answerOptions.map(
                  (answerOptions) => (
                    <button
                      onClick={() =>{
                        handleAnswerButtonClick(answerOptions.isCorrect)
                      }}
                    >
                      {answerOptions.answerText}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </>
    );
  } else {
    window.localStorage.clear();
    const currentdate = new Date();
    var date = [
      currentdate.getHours(),
      currentdate.getMinutes(),
      currentdate.getSeconds(),
    ];
    const data = { date };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("/api/3", options);
    return <Redirect to="/Dashboard" />;
  }
}

export default Quiz;
