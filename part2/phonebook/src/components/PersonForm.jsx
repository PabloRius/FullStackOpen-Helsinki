export const PersonForm = (props) => {
  const {
    handleFormSubmit,
    handleNameInput,
    newName,
    handlePhoneInput,
    newPhone,
  } = props;

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>add a new</h2>
      <div>
        name: <input type="text" value={newName} onChange={handleNameInput} />
      </div>
      <div>
        number:{" "}
        <input type="tel" value={newPhone} onChange={handlePhoneInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
