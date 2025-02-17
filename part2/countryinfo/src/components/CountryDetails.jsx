const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        <strong>Capital:</strong> {country.capital?.[0] || "No disponible"}
      </p>
      <p>
        <strong>Área:</strong> {country.area} km²
      </p>
      <p>
        <strong>Idiomas:</strong>
      </p>
      <ul>
        {Object.values(country.languages || {}).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`Bandera de ${country.name.common}`}
        style={{ width: "150px", border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default CountryDetails;
