const EventFilter = ({ filters, setFilters, events }) => {
  // Obtener listas únicas de categorías, organizadores y campus
  const categories = [...new Set(events.map((event) => event.category_name))];
  const organizers = [...new Set(events.map((event) => event.organizer_name))];
  const campuses = [...new Set(events.map((event) => event.acf.detcampus))];

  // Manejar cambios en los filtros
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Restablecer filtros
  const handleReset = () => {
    setFilters({ search: "", category: "", organizer: "", campus: "" });
  };

  return (
    <div className="container mx-auto py-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-4">
        <div className="col">
          <input
            type="text"
            name="search"
            placeholder="Buscar evento..."
            value={filters.search}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-2 form-control"
          />
        </div>
        <div className="col-6">
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-2 form-select"
          >
            <option value="">Filtrar por Categoría</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6">
          <select
            name="organizer"
            value={filters.organizer}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-2 form-select"
          >
            <option value="">Filtrar por Organizador</option>
            {organizers.map((org, index) => (
              <option key={index} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6">
          <select
            name="campus"
            value={filters.campus}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-2 form-select"
          >
            <option value="">Filtrar por Campus</option>
            {campuses.map((camp, index) => (
              <option key={index} value={camp}>
                {camp}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6">
          <div className="btn-group" role="group">
            <button type="button"
              className="btn btn-secondary text-white rounded"
              onClick={handleChange}
            >
              Aplicar
            </button>
            <button
              className="btn btn-secondary text-white rounded mx-3"
              onClick={handleReset}
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
