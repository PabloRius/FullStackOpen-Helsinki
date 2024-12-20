import { Button } from "./Button";

export const Selector = (props) => {
  return (
    <div>
      {props.options.map((option) => {
        return (
          <Button
            key={option.name}
            handleClick={option.handler}
            title={option.name}
          />
        );
      })}
    </div>
  );
};
