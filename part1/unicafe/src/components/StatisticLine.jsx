export const StatisticLine = (props) => {
  return (
    <p>
      {props.title} {props.value} {props.endDecorator && props.endDecorator}
    </p>
  );
};
