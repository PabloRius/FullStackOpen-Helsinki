export const NumberList = (props) => {
  const { persons, handleDelete } = props;

  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => {
        const { name, number, id } = person;
        return (
          <div key={name}>
            {name} {number}{" "}
            <button
              onClick={() => {
                handleDelete(id, name);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
    </>
  );
};
