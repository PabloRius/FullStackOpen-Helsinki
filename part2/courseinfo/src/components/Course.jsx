import { Header } from "./Header";
import { Content } from "./Content";

export const Course = (props) => {
  const { course } = props;
  const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <div>
      <Header course={course.title} />
      <Content parts={course.parts} />
      {/* <Total total={total} /> */}
    </div>
  );
};
