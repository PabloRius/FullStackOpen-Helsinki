import { useEffect, useState } from "react";

import {
  create,
  exists,
  getAll,
  deleteOne,
  updateOne,
} from "./services/persons";

import { PersonForm } from "./components/PersonForm";
import { Filter } from "./components/Filter";
import { NumberList } from "./components/NumbersList";
import { Alert } from "./components/Alert";

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

  const [alertMessage, setAlertMessage] = useState({
    active: false,
    content: "",
    status: "",
  });

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
    const existsPerson = exists(newName, persons);
    if (existsPerson) {
      const confirmation = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (!confirmation) return;

      const { id, name } = existsPerson;
      const updatedUser = await updateOne(id, name, newPhone);
      if (!updatedUser) {
        createAlert(
          `Information of ${name} has already been removed from the server`,
          "error"
        );
        setPersons((prev) => {
          return prev.filter((person) => person.id !== id);
        });
        return;
      }
      setPersons((prev) =>
        prev.map((person) => {
          if (person.id === id) {
            return updatedUser;
          } else {
            return person;
          }
        })
      );

      createAlert(`Updated ${updatedUser.name}`, "ok");

      return;
    }
    const newPerson = await create(newName, newPhone);
    setPersons((prev) => [...prev, newPerson]);

    createAlert(`Added ${newPerson.name}`, "ok");

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
    } else {
      createAlert(
        `Information of ${name} has already been removed from the server`,
        "error"
      );
      setPersons((prev) => {
        return prev.filter((person) => person.id !== id);
      });
    }
  };

  const createAlert = (content, status) => {
    setAlertMessage({ active: true, content, status });
    setTimeout(() => {
      setAlertMessage({ active: false, content: "", status: "" });
    }, 2500);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Alert
        active={alertMessage.active}
        content={alertMessage.content}
        status={alertMessage.status}
      />
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
