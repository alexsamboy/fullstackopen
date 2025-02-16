import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [strFilter, setStrFilter] = useState("");
  const [message, setMessage] = useState(null); // Estado para notificaciones
  const [messageType, setMessageType] = useState("success"); // Tipo de mensaje

  // Cargar datos del servidor json-server
  useEffect(() => {
    console.log("effect");

    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  console.log("render", persons.length, "persons");

  //Evitar que el formulario recargue la pagina
  const addPerson = (event) => {
    event.preventDefault();

    if (newName.trim() === "" || newNumber.trim() === "") {
      showMessage("El nombre y el número no pueden estar vacíos.", "error");
      alert("El nombre y el número no pueden estar vacíos.");
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      // Si el contacto ya existe, preguntar si desea actualizar el número
      if (
        window.confirm(
          `${newName} is already in the phonebook. Do you want to update the number?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            showMessage(
              `Número actualizado: ${returnedPerson.name} -> ${returnedPerson.number}`,
              "success"
            );
            setNewName("");
            setNewNumber("");
            console.log(`Número de ${newName} actualizado a ${newNumber}`);
          })
          .catch((error) => {
            alert(`Error: ${newName} ya no existe en el servidor.`);
            showMessage(
              `Error: ${newName} ya no existe en el servidor.`,
              "error"
            );
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            ); // Elimina localmente si ya no está en el servidor
          });
      }
    } else {
      // Si la persona no existe, agregarla normalmente
      const personObject = { name: newName, number: newNumber };

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        showMessage(
          `Nueva persona agregada: ${returnedPerson.name}, ${returnedPerson.number}`,
          "success"
        );
        setNewName("");
        setNewNumber("");
        console.log(
          `Nueva persona agregada: ${returnedPerson.name}, ${returnedPerson.number}`
        );
      });
    }
  };

  const handleUpdate = (id, newName, newNumber) => {
    const person = persons.find((p) => p.id === id);
    if (!person) {
      console.error("Error: Persona no encontrada");
      showMessage("Error: Persona no encontrada", "error");
      return;
    }

    const updatedPerson = { ...person, name: newName, number: newNumber };

    if (
      window.confirm(
        `Update ${person.name} to ${newName} with number ${newNumber}?`
      )
    ) {
      personService
        .update(id, updatedPerson)
        .then((returnedPerson) => {
          console.log("Persona actualizada:", returnedPerson);
          setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson))); // Actualiza en el estado
          showMessage(
            `Persona actualizada: ${returnedPerson.name} -> ${returnedPerson.number}`,
            "success"
          );
        })
        .catch((error) => {
          console.error(`Error actualizando a '${person.name}':`, error);
          alert(
            `The person '${person.name}' was already removed from the server`
          );
          showMessage(
            `Error: ${newName} ya no existe en el servidor.`,
            "error"
          );
          setPersons(persons.filter((p) => p.id !== id)); // Elimina localmente si ya no está en el servidor
        });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          console.log(`Persona eliminada del servidor: '${person.name}'`);
          setPersons(persons.filter((p) => p.id !== id)); // Actualiza la lista eliminando el elemento
          showMessage(`Eliminado: ${person.name}`, "success");
        })
        .catch((error) => {
          alert(
            `The person '${person.name}' was already removed from the server`
          );
          showMessage(
            `Error: ${person.name} ya no existe en el servidor`,
            "error"
          );
          setPersons(persons.filter((p) => p.id !== id)); // Remueve localmente si el server ya lo eliminó
        });
    }
  };

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    //console.log(event.target.value)
    // Implementar filtro aquí
    setStrFilter(event.target.value);
  };

  const personsToShow = persons.filter((persons) =>
    persons.name.toLowerCase().includes(strFilter.toLowerCase())
  );

  //console.log('cadena de busqueda ',strFilter)
  //console.log('personas a mostrar ',personsToShow)

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} type={messageType} />
      <Filter filter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleName={handleNameChange}
        handleNumber={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <div>
        debug: {newName} {newNumber}
      </div>
      <Footer />
    </div>
  );
};

export default App;
