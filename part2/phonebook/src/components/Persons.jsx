const Persons = ({name}) => {
    return (
        <div>{name.map(person =>
            <div key={person.id}>{person.name} {person.number}</div>
          )}</div>
    )
}

export default Persons;