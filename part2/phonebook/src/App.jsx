import { useEffect, useState } from "react";
import { PersonForm } from "./components/PersonForm";
import { Filter } from "./components/Filter";
import { NumberList } from "./components/NumbersList";

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

  useEffect(() => {
    if (filter === "") {
      setFilteredPersons(persons);
      console.log("empty");

      return;
    }
    setFilteredPersons(
      persons.filter((person) => {
        return person.name.toLowerCase().includes(filter);
      })
    );
  }, [filter, persons]);

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
      <Filter handleFilterInput={handleFilterInput} filter={filter} />
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        handleNameInput={handleNameInput}
        newName={newName}
        handlePhoneInput={handlePhoneInput}
        newPhone={newPhone}
      />
      <NumberList persons={filteredPersons} />
    </div>
  );
};

export default App;
