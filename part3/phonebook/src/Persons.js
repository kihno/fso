const Persons = (props) => {
    const { namesToShow, deletePerson } = props

    return (
        <div>
            {namesToShow.map(person =>
                <div className="person" key={person.id}>
                    {person.name} {person.number}
                    <button onClick={(e) => deletePerson(person.id, e)}>delete</button>
                </div>  
            )}
        </div>
    )
}

export default Persons;
