export const Results = (props) => {
  const { data } = props;
  console.log(data);
  console.log(data.length);
  return (
    <div>
      {data.length >= 10 ? (
        "Too many matches, specify another filter"
      ) : 1 < data.length && data.length < 10 ? (
        <>
          {data.map((country) => (
            <div key={country.cca2}>{country.name.common}</div>
          ))}
        </>
      ) : data.length === 1 ? (
        <>
          <h1>{data[0].name.common}</h1>
          <p>capital {data[0].capital[0]}</p>
          <p>area {data[0].area}</p>
          <br />
          <p>
            <b>languages:</b>
          </p>
          <ul>
            {Object.values(data[0].languages).map((lang) => (
              <li>{lang}</li>
            ))}
          </ul>
          <img
            alt={`Country of ${data[0].name.common}`}
            src={data[0].flags.png}
          />
        </>
      ) : null}
    </div>
  );
};
