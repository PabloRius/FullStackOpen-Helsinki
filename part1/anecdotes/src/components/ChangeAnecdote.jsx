export const ChangeAnecdote = (props) => {
  const handleClick = () => {
    const random = Math.floor(Math.random() * props.anecdotes_n);
    props.changeSelected(random);
  };
  return <button onClick={handleClick}>next anecdote</button>;
};
