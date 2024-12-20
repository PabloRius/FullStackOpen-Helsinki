export const Selector = (props) => {
  return (
    <div>
      {props.options.map((option) => {
        return (
          <button key={option.name} onClick={option.handler}>
            {option.name}
          </button>
        );
      })}
    </div>
  );
};
