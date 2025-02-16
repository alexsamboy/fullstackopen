const Persons = ({ persons, onDelete, onUpdate }) => {
    return (
      <div>
        {persons.map(person => (
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => onDelete(person.id)}>Delete</button>
            <button onClick={() => {
              const newName = prompt(`Enter new name for ${person.name}:`, person.name)
              const newNumber = prompt(`Enter new number for ${person.name}:`, person.number)
              if (newName && newNumber) {
                onUpdate(person.id, newName, newNumber)
              }
            }}>
              Edit
            </button>
          </div>
        ))}
      </div>
    )
  }
  
  export default Persons  