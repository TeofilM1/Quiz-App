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
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

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
                name={name}
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
