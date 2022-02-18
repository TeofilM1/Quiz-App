import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainHeader from "./components/MainHeader";
import ProfilePage from "./pages/Profile/ProfilePage";
import QuizPage from "./pages/Quiz/QuizPage";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  function fetchQuestionsHandler(cat, dif) {
    setCategory(cat);
    setDifficulty(dif);
  }

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
              error={error}
              setError={setError}
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
                category={category}
                difficulty={difficulty}
                setName={setName}
                name={name}
                score={score}
                setScore={setScore}
                error={error}
                setError={setError}
              />
            }
          />
          <Route
            exact
            path="/profile"
            element={<ProfilePage name={name} setName={setName} score={score} setScore={setScore} />}
          />
          <Route exact path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
