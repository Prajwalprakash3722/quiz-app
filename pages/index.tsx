import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import MakeData from "../components/MakeData";

const Home: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [questions, setQuestions] = React.useState<any>([
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ]);
  const [showScore, setShowScore] = React.useState(false);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
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
      </div>
      <div className="app">
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
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
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
      </div>
      <button
        className={`${currentQuestion === 0 ? "incorrect" : "correct"} finish`}
        onClick={() => {
          setShowScore(true);
        }}
      >
        {currentQuestion === 0 ? "Reset Quiz" : "Finish Quiz"}
      </button>
    </>
  );
};

export default Home;
