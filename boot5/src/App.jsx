import { useState, useEffect } from "react";
import eventService from "./services/events";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Events from "./components/Events";
import EventFilter from "./components/EventFilter";
import Hero from "./components/Hero";
import Pagination from "./components/Pagination";

const App = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    organizer: "",
    campus: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [heroEvent, setHeroEvent] = useState(null);
  const itemsPerPage = 12;

  useEffect(() => {
    eventService.getPosts().then((initialEvents) => {
      //console.log("Eventos App ", initialEvents);

      const now = new Date();
      const futureEvents = initialEvents.filter(
        (event) => new Date(event.fecha_inicio) > now
      );

      if (futureEvents.length > 0) {
        setHeroEvent(futureEvents.shift()); // Extrae el primer evento
        setEvents(futureEvents); // Guarda el resto
      }
    });
  }, []);

  const filteredEvents = events.filter((event) => {
    return (
      (filters.search === "" ||
        event.title.rendered.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.category === "" || event.category_name === filters.category) &&
      (filters.organizer === "" || event.organizer_name === filters.organizer) &&
      (filters.campus === "" || event.acf.detcampus === filters.campus)
    );
  });

  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const paginatedEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handleCountdownEnd = () => {
    if (events.length === 0) return; // No actualizar si ya no hay más eventos

    setHeroEvent(events.shift()); // Asigna el siguiente evento
    setEvents([...events]); // Actualiza la lista eliminando el primero
  };

  return (
    <>
      <Header events={events} />
      <Hero events={heroEvent} onCountdownEnd={handleCountdownEnd} />

      <EventFilter filters={filters} setFilters={setFilters} events={events} />

      <Events events={paginatedEvents} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredEvents.length / itemsPerPage)}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </>
  );
};

export default App;
