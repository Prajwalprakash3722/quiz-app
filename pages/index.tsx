import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import MakeData from "../components/MakeData";

const Home: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [questions, setQuestions] = React.useState<any>([]);
  const [showScore, setShowScore] = React.useState(false);
  const [score, setScore] = React.useState(0);

  React.useMemo(() => {
    MakeData().then((data) => {
      setQuestions(data);
    });
  }, [showScore]);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      localStorage.setItem("score", score.toString());
    }
  };
  return (
    <>
      <div>
        <Head>
          <title>Quiz App</title>
          <meta name="description" content="Quiz App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className="app-header">Quiz App</h1>
      </div>
      <div style={{ padding: "10px" }}>
        <div className="app">
          {questions.length === 0 ? (
            <div className="loader-parent">
              <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <>
              {showScore ? (
                <div className="score-section">
                  You scored {score} out of {questions.length}
                  <button
                    onClick={() => {
                      setCurrentQuestion(0);
                      setScore(0);
                      setShowScore(false);
                    }}
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <>
                  <div className="question-section">
                    <div className="question-count">
                      <span>Question {currentQuestion + 1}</span>/
                      {questions.length}
                    </div>
                    <div className="question-text">
                      {questions.length > 1 &&
                        questions[currentQuestion].questionText}
                    </div>
                  </div>
                  <div className="answer-section">
                    {questions.length > 1 &&
                      questions[currentQuestion].answerOptions.map(
                        (
                          answerOption: {
                            isCorrect: boolean;
                            answerText: boolean | null | undefined;
                          },
                          index: React.Key | null | undefined
                        ) => (
                          <button
                            onClick={() =>
                              handleAnswerOptionClick(answerOption.isCorrect)
                            }
                            key={index}
                          >
                            {answerOption.answerText}
                          </button>
                        )
                      )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <button
          className={`${
            currentQuestion === 0 ? "incorrect" : "correct"
          } finish`}
          onClick={() => {
            setShowScore(true);
          }}
        >
          {currentQuestion === 0 ? "Refresh Quiz" : "Finish Quiz"}
        </button>
      </div>
    </>
  );
};

export default Home;
