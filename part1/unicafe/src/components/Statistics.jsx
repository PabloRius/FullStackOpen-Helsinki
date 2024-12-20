import { StatisticLine } from "./StatisticLine";

export const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
  return all > 0 ? (
    <div>
      <h2>Statistics</h2>
      <StatisticLine title="good" value={good} />
      <StatisticLine title="neutral" value={neutral} />
      <StatisticLine title="bad" value={bad} />
      <StatisticLine title="average" value={average} />
      <StatisticLine title="positive" value={positive} endDecorator={"%"} />
    </div>
  ) : (
    <p>No feedback given</p>
  );
};
