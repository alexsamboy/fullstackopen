import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [strFilter, setStrFilter] = useState('')

  // Cargar datos del servidor json-server
  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  },[])
  console.log('render', persons.length, 'persons')

  //Evitar que el formulario recargue la pagina
  const addPerson = (event) => {
    event.preventDefault()
    //console.log('nueva persona', event.target)

    // Verificar si el nombre está vacío
    if (newName.trim() === '') {
      alert('El campo no puede estar vacío');
      return; // No continuar si el campo está vacío
    }

    // Verificar si el nombre ya existe
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName(''); // Limpiar el input
      setNewNumber('')
      return; // Evitar agregar la persona si ya existe
    }

    // Si no existe, agregar la persona
  const personObject = {
    name: newName,
    number: newNumber
  }

  personService.create(personObject)
  .then((returnedPerson) =>{
    setPersons(persons.concat(returnedPerson)); // Usar el objeto con ID del backend
    console.log(returnedPerson)
    setNewName('')
    setNewNumber('')
  })

    
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    //console.log(event.target.value)
    // Implementar filtro aquí
    setStrFilter(event.target.value)

  }

  const personsToShow =  persons.filter( persons => persons.name.includes(strFilter))
  
  //console.log('cadena de busqueda ',strFilter)
  //console.log('personas a mostrar ',personsToShow)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleName={handleNameChange}
        handleNumber={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
      <div>debug: {newName} {newNumber}</div>
    </div>
  )
}

export default App
