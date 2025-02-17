import { useState, useEffect } from "react";
import countryService from "./services/countries"; // Asegúrate de que el servicio esté correcto
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [strFilter, setStrFilter] = useState("");

  useEffect(() => {
    // Solo se ejecutará una vez al cargar el componente
    console.log("effect");
    countryService.getAll().then((initialCountries) => {
      console.log(initialCountries);
      setCountries(initialCountries); // Actualiza el estado de los países
    });
  }, []); // El array vacío asegura que solo se ejecute una vez

  console.log("render", countries.length, "countries");

  const handleFilter = (event) => {
    setStrFilter(event.target.value); // Actualiza el filtro
  };

  // Asegúrate de que la propiedad `name` y `official` existen en cada objeto `country`
  const countriesToShow = countries.filter((country) =>
    country.name?.official?.toLowerCase().includes(strFilter.toLowerCase())
  );

  return (
    <div>
      <h1>Find Countries</h1>
      <Filter filter={handleFilter} />
      <Countries countries={countriesToShow} filter={strFilter} />
    </div>
  );
};

export default App;
