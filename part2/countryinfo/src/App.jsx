import { useEffect, useState } from "react";
import { getAll } from "./services/countries";
import { Filter } from "./components/Filter";
import { Results } from "./components/Results";
import { filterName } from "./services/filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const result = await getAll();
      setCountries(result);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (filter === "") {
      setFilteredCountries(countries);
      return;
    }
    const newFilteredCountries = filterName(filter, countries);
    setFilteredCountries(newFilteredCountries);
  }, [countries, filter]);

  const handleFilter = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
  };

  const handleSelect = (data) => {
    const selection = [data];
    setFilteredCountries(selection);
  };

  return (
    <div>
      <Filter value={filter} handler={handleFilter} />
      <Results data={filteredCountries} handleSelect={handleSelect} />
    </div>
  );
}

export default App;
