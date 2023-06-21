import { useState } from "react";
import Feedback from './Feedback';
import Statistics from './Statistics';

function App() {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  return (
    <div className="App">
      <Feedback good={good} bad={bad} neutral={neutral} setGood={setGood} setBad={setBad} setNeutral={setNeutral} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
