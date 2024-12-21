import { Part } from "./Part";

export const Content = (props) => {
  const { parts } = props;
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} title={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};
