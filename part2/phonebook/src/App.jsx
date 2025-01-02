import { useEffect, useState } from "react";

import {
  create,
  getAll,
  deleteOne,
  updateOne,
  getOneName,
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
        return person.name.toLowerCase().includes(filter.toLowerCase());
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
    const exists_username = await getOneName(newName);
    if (!exists_username) {
      create(newName, newPhone).then((newPerson) => {
        setPersons((prev) => [...prev, newPerson]);
        createAlert(`Added ${newPerson.name}`, "ok");
      });
    } else {
      const confirmation = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (!confirmation) return;

      const { id } = exists_username;

      updateOne(id, newPhone)
        .then(() => {
          setPersons((prev) =>
            prev.map((person) => {
              if (person.id === id) {
                return { ...person, number: newPhone };
              } else {
                return person;
              }
            })
          );
          createAlert(`Updated ${newName}`, "ok");
        })
        .catch((err) => console.error(`Error updating the user: ${err}`));
    }
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
