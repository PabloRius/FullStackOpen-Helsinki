import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const checkIfNameExists = (name) => {
    return persons.some((person) => person.name === name);
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneInput = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterInput = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    if (newFilter === "") {
      setFilteredPersons(persons);
      console.log("empty");

      return;
    }
    setFilteredPersons(
      persons.filter((person) => {
        const { name } = person;
        const isFilter = name.includes(newFilter);
        console.log(`name: ${name}, filter: ${newFilter}: ${isFilter}`);

        return person.name.toLowerCase().includes(newFilter);
      })
    );
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (checkIfNameExists(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons((prev) => [...prev, { name: newName, number: newPhone }]);
    setNewName("");
    setNewPhone("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with:{" "}
        <input type="text" value={filter} onChange={handleFilterInput} />
      </div>
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
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
