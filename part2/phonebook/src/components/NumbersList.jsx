export const NumberList = (props) => {
  const { persons } = props;
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};
