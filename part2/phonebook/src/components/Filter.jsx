export const Filter = (props) => {
  const { handleFilterInput, filter } = props;

  return (
    <div>
      filter shown with:{" "}
      <input type="text" value={filter} onChange={handleFilterInput} />
    </div>
  );
};
