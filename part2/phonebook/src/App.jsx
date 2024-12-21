import { useEffect, useState } from "react";
import axios from "axios";
import { PersonForm } from "./components/PersonForm";
import { Filter } from "./components/Filter";
import { NumberList } from "./components/NumbersList";

const API_ENDPOINT = "http://localhost:3001/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const result = await axios.get(API_ENDPOINT);
      setPersons(result.data);
    };
    fetchInitialData();
  }, []);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    if (filter === "") {
      setFilteredPersons(persons);

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (checkIfNameExists(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = { name: newName, number: newPhone };
    const result = await axios.post(API_ENDPOINT, newPerson);
    if (result.status === 201) {
      setPersons((prev) => [...prev, result.data]);
    }
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
