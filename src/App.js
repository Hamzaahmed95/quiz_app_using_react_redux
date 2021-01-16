import "./App.css";
import Answers from "./components/answers/answer";
import CustomizedInputs from "./components/input/input";
import { useState } from "react";

const App = () => {
  const [Login, isLoggedIn] = useState(false);

  const handleSubmit = () => {
    isLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!Login ? <CustomizedInputs handleSubmi={handleSubmit} /> : <Answers />}
      </header>
    </div>
  );
};

export default App;
