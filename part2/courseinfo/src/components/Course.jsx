import { Header } from "./Header";
import { Content } from "./Content";
import { Total } from "./Total";

export const Course = (props) => {
  const { course } = props;
  const { title, parts } = course;
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <div>
      <Header course={title} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  );
};
