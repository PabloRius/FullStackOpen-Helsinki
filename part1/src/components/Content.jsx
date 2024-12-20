import { Part } from "./Part";

export const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.title} title={part.title} exercises={part.exercises} />
      ))}
    </>
  );
};
