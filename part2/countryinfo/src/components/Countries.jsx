import { useState } from "react";
import Message from "./Message";
import CountryDetails from "./CountryDetails";

const Countries = ({ countries = [], filter }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Si el filtro está vacío o solo contiene espacios, muestra un mensaje
  if (!filter.trim()) {
    return <Message type="emptyFilter" />;
  }

  // Si no hay países que coincidan con la búsqueda
  if (countries.length === 0) {
    return <Message type="noResults" />;
  }

  // Si hay demasiados países y el filtro no está vacío
  if (countries.length > 10) {
    return <Message type="tooMany" />;
  }

  // Si solo hay un país, mostrar detalles completos
  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }

  // Si se ha seleccionado un país, mostrar los detalles
  if (selectedCountry) {
    return <CountryDetails country={selectedCountry} />;
  }

  // Si hay entre 2 y 10 países, mostrar la lista
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca2 || country.name.common}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
