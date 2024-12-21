import { useEffect, useState } from "react";

import { create, exists, getAll, deleteOne } from "./services/persons";

import { PersonForm } from "./components/PersonForm";
import { Filter } from "./components/Filter";
import { NumberList } from "./components/NumbersList";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const onLoadFetch = async () => {
      const persons = await getAll();
      setPersons(persons);
    };
    onLoadFetch();
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
    if (exists(newName, persons)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = await create(newName, newPhone);
    setPersons((prev) => [...prev, newPerson]);

    setNewName("");
    setNewPhone("");
  };

  const handleDelete = async (id, name) => {
    const confirmation = window.confirm(`Delete ${name}`);

    if (!confirmation) return;
    const deleted = await deleteOne(id);
    if (deleted) {
      setPersons((prev) => {
        return prev.filter((person) => person.id !== id);
      });
    }
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
      <NumberList persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
