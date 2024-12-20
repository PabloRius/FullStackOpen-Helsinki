import { useState } from "react";
import { Button } from "./components/Button";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});
  const [topAnecdote, setTopAnecdote] = useState({ anecdote: null, votes: 0 });

  const randomizeAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteAnecdote = () => {
    setVotes((prev) => {
      const newVotes = prev[selected] ? prev[selected] + 1 : 1;
      if (!topAnecdote.anecdote || newVotes >= topAnecdote.votes) {
        setTopAnecdote({ anecdote: selected, votes: newVotes });
      }
      return { ...prev, [selected]: newVotes };
    });
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] ? votes[selected] : 0} votes</p>
      <Button title="vote" handle={voteAnecdote} />
      <Button title="next anecdote" handle={randomizeAnecdote} />
      <h2>Anecdote with most votes</h2>
      {topAnecdote.anecdote !== null ? (
        <>
          <p>{anecdotes[topAnecdote.anecdote]}</p>
          <p>has {topAnecdote.votes} votes</p>
        </>
      ) : (
        <p>No votes</p>
      )}
    </div>
  );
}

export default App;
