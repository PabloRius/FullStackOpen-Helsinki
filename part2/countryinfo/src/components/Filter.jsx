export const Filter = (props) => {
  const { value, handler } = props;
  return (
    <div>
      find countries <input type="text" onChange={handler} value={value} />
    </div>
  );
};
