export const Button = (props) => {
  const handleClick = () => {
    const random = Math.floor(Math.random() * props.anecdotes_n);
    props.changeSelected(random);
  };
  return <button onClick={props.handle}>{props.title}</button>;
};
