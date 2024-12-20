import { useState } from "react";
import { Header } from "./components/Header";
import { Content } from "./components/Content";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const addGoodReview = () => {
    setGood((prev) => {
      prev += 1;
      return prev;
    });
  };
  const addNeutralReview = () => {
    setNeutral((prev) => {
      prev += 1;
      return prev;
    });
  };
  const addBadReview = () => {
    setBad((prev) => {
      prev += 1;
      return prev;
    });
  };
  return (
    <div>
      <Header title="Give feedback" />
      <Content
        options={[
          {
            name: "good",
            handler: addGoodReview,
          },
          {
            name: "neutral",
            handler: addNeutralReview,
          },
          {
            name: "bad",
            handler: addBadReview,
          },
        ]}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
}

export default App;
