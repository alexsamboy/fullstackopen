const EventFilter = ({ filters, setFilters, events }) => {
    // Obtener listas únicas de categorías, organizadores y campus
    const categories = [...new Set(events.map(event => event.category_name))];
    const organizers = [...new Set(events.map(event => event.organizer_name))];
    const campuses = [...new Set(events.map(event => event.acf.detcampus))];
  
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
      <div className="py-4 bg-gray-100 rounded-lg mb-4">
        <input
          type="text"
          name="search"
          placeholder="Buscar evento..."
          value={filters.search}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-2 form-control"
        />
  
        <select name="category" value={filters.category} onChange={handleChange} className="p-2 border rounded w-full mb-2 form-control">
          <option value="">Filtrar por Categoría</option>
          {categories.map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
        </select>
  
        <select name="organizer" value={filters.organizer} onChange={handleChange} className="p-2 border rounded w-full mb-2 form-control">
          <option value="">Filtrar por Organizador</option>
          {organizers.map((org, index) => <option key={index} value={org}>{org}</option>)}
        </select>
  
        <select name="campus" value={filters.campus} onChange={handleChange} className="p-2 border rounded w-full mb-2 form-control">
          <option value="">Filtrar por Campus</option>
          {campuses.map((camp, index) => <option key={index} value={camp}>{camp}</option>)}
        </select>
  
        <div className="flex gap-2 mt-3">
          <button className="btn p-2 btn-secondary text-white rounded w-full" onClick={handleChange}>
            Aplicar
          </button>
          <button className="btn p-2 btn-secondary text-white rounded w-full" onClick={handleReset}>
            Limpiar
          </button>
        </div>
      </div>
      </div>
    );
  };
  
  export default EventFilter;
  
