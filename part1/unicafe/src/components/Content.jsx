import { Selector } from "./Selector";
import { Statistics } from "./Statistics";

export const Content = (props) => {
  return (
    <div>
      <Selector options={props.options} />
      <Statistics good={props.good} neutral={props.neutral} bad={props.bad} />
    </div>
  );
};
