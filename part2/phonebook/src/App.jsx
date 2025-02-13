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
    create(newName, newPhone)
      .then((newPerson) => {
        setNewName("");
        setNewPhone("");
        setPersons((prev) => [...prev, newPerson]);
        createAlert(`Added ${newPerson.name}`, "ok");
      })
      .catch((error) => {
        if (error.status === 409) {
          const confirmation = window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          );
          if (!confirmation) return;
          console.log(`RESPONSE`);
          console.log(error.response);
          const { id } = error.response.data;

          updateOne(id, newPhone)
            .then(() => {
              setNewName("");
              setNewPhone("");
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
            .catch((err) => {
              const outMessage = `Error creating the user: ${
                err.response?.data?.error || err.message || ""
              }`;
              console.error(outMessage);
              createAlert(outMessage);
            });
        } else {
          const outMessage = `Error creating the user: ${
            error.response?.data?.error || error.message || ""
          }`;
          console.error(outMessage);
          createAlert(outMessage);
        }
      });
  };

  const handleDelete = async (id, name) => {
    const confirmation = window.confirm(`Delete ${name}`);

    if (!confirmation) return;
    deleteOne(id)
      .then((deleted) => {
        if (deleted) {
          setPersons((prev) => {
            return prev.filter((person) => person.id !== id);
          });
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.status === 404) {
          createAlert(
            `Information of ${name} has already been removed from the server`,
            "error"
          );
          setPersons((prev) => {
            return prev.filter((person) => person.id !== id);
          });
        } else {
          const outMessage = `Error deleting the user: ${
            error.response?.data?.error || error.message || ""
          }`;
          console.error(outMessage);
          createAlert(outMessage);
        }
      });
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
