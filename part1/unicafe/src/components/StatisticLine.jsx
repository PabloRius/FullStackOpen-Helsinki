export const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.title}</td>
      <td>
        {`${props.value} ${props.endDecorator ? props.endDecorator : ""}`}
      </td>
    </tr>
  );
};
