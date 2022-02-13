import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainHeader from "./components/MainHeader";
import ProfilePage from "./pages/Profile/ProfilePage";
import QuizPage from "./pages/Quiz/QuizPage";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";
import Footer from "./components/Footer";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState("");
  const [score, setScore] = useState(0);

  const fetchQuestionsHandler = async (category ='', difficulty ='') => {
    const { data } = await axios.get(
      `https://quizapi.io/api/v1/questions?apiKey=o5qb6N6CZbDztc3JkjEa1v4JiPkx0QiTQdYv4sWr&category=${category}&difficulty=${difficulty}&limit=10`
    );
    setQuestions(data);
  };

  return (
    <div className="app">
      <MainHeader />
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                name={name}
                setUserName={setName}
                fetchQuestionsHandler={fetchQuestionsHandler}
              />
            }
          />
          <Route
            exact
            path="/quiz"
            element={
              <QuizPage
                name={name}
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
              />
            }
          />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
