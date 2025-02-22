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
      console.log("Eventos App ", initialEvents);

      // Separar el evento más próximo para el Hero
      const [nextEvent, ...remainingEvents] = initialEvents;

      setHeroEvent(nextEvent); // Guardar el evento para el Hero
      setEvents(remainingEvents); // Guardar el resto de evento
    });
  }, []);

  const filteredEvents = events.filter((event) => {
    const searchMatch =
      filters.search === "" ||
      event.title.rendered.toLowerCase().includes(filters.search.toLowerCase());
    const categoryMatch =
      filters.category === "" || event.category_name === filters.category;
    const organizerMatch =
      filters.organizer === "" || event.organizer_name === filters.organizer;
    const campusMatch =
      filters.campus === "" || event.acf.detcampus === filters.campus;
    return searchMatch && categoryMatch && organizerMatch && campusMatch;
  });

  // Obtener eventos para la página actual
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const paginatedEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  return (
    <>
      <Header events={events} />
      <Hero events={heroEvent} />

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
