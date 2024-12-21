import { Header } from "./Header";
import { Content } from "./Content";
import { Total } from "./Total";

export const Course = (props) => {
  const { course } = props;
  const { name, parts } = course;
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  );
};
