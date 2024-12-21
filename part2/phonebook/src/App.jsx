import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const checkIfNameExists = (name) => {
    return persons.some((person) => person.name === name);
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (checkIfNameExists(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons((prev) => [...prev, { name: newName }]);
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input type="text" value={newName} onChange={handleNameInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
