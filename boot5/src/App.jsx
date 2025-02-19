import { useState, useEffect } from "react";
import eventService from "./services/events";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Events from "./components/Events";

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("effect");

    eventService.getAll().then((initialEvents) => {
      console.log("promise fulfilled");
      setEvents(initialEvents);
    });
  }, []);

  console.log("eventos", events);

  return (
    <>
      <Header />
      <Events events={events} />
      <Footer />
    </>
  );
};

export default App;
