import { Part } from "./Part";

export const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.name} title={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};
