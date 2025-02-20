import { useState, useEffect } from "react";
import eventService from "./services/events";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Events from "./components/Events";
import EventFilter from "./components/EventFilter";

const App = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    organizer: "",
    campus: "",
  });

  useEffect(() => {
    eventService.getPosts().then((initialEvents) => {
      // Obtener la fecha actual
      const now = new Date();
      
      // Filtrar los eventos para que solo se muestren aquellos con fecha de inicio mayor o igual al día actual
      const validEvents = initialEvents.filter((event) => {
        const eventDate = new Date(`${event.fecha_inicio}`);
        return eventDate >= now;
      });

      setEvents(validEvents);
    });
  }, []);

  // Función para filtrar y ordenar eventos
  const filteredEvents = events
    .filter((event) => {
      // Aplica filtro de búsqueda
      const searchMatch = filters.search === "" || event.title.rendered.toLowerCase().includes(filters.search.toLowerCase());
      // Aplica filtro de categoría
      const categoryMatch = filters.category === "" || event.category_name === filters.category;
      // Aplica filtro de organizador
      const organizerMatch = filters.organizer === "" || event.organizer_name === filters.organizer;
      // Aplica filtro de campus
      const campusMatch = filters.campus === "" || event.acf.detcampus === filters.campus;
      return searchMatch && categoryMatch && organizerMatch && campusMatch;
    })
    .sort((a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio)); // Orden ascendente por fecha

  return (
    <>
      <Header />
      <div className="container mx-auto py-4">
        <EventFilter filters={filters} setFilters={setFilters} events={events} /></div>
        <Events events={filteredEvents} />
      
      <Footer />
    </>
  );
};

export default App;
