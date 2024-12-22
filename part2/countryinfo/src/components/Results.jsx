import { useEffect, useState } from "react";
import { getOne } from "../services/weather";

export const Results = (props) => {
  const { data, handleSelect } = props;

  return (
    <div>
      {data.length >= 10 ? (
        "Too many matches, specify another filter"
      ) : 1 < data.length && data.length < 10 ? (
        <ResultsMany countries={data} handleSelect={handleSelect} />
      ) : data.length === 1 ? (
        <ResultsOne country={data[0]} />
      ) : null}
    </div>
  );
};

const ResultsMany = (props) => {
  const { countries, handleSelect } = props;
  return (
    <>
      {countries.map((country) => {
        const { cca2: id, name: names } = country;
        const { common: name } = names;
        return (
          <div key={id}>
            {name}{" "}
            <button
              onClick={() => {
                handleSelect(country);
              }}
            >
              show
            </button>
          </div>
        );
      })}
    </>
  );
};

const ResultsOne = (props) => {
  const [weatherData, setWeatherData] = useState({
    temp: null,
    wind: null,
    icon_id: null,
  });
  console.log(props);
  const { country } = props;
  const { name: names, capital: capitals, area, languages, flags } = country;
  const { common: name } = names;
  const capital = capitals[0];
  const { png: flag } = flags;

  useEffect(() => {
    getOne(capital, name).then((res) => {
      const { main: temperatures, wind: winds, weather: icon_data } = res;
      const { temp: temperature } = temperatures;
      const { speed: wind } = winds;
      const { icon: icon_id } = icon_data[0];
      setWeatherData({ temp: temperature, wind, icon_id });
    });
  }, [capital]);

  return (
    <>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <br />
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {Object.values(languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img alt={`Country of ${name}`} src={flag} />
      <h2>Weather in {capital}</h2>
      <p>temperature {weatherData.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.icon_id}@2x.png`}
        alt={`Weather in ${capital}`}
      />
      <p>wind {weatherData.wind} m/s</p>
    </>
  );
};
