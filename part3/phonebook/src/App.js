import { useEffect, useState } from 'react';
import personService from './services/persons'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  useEffect(() => {
    setTimeout(function(){
      setMessage(null)
      setType(null)
    }, 10000)
  }, [message])

  const namesToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLocaleLowerCase()))

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    event.preventDefault()
    setSearch(event.target.value)

    if (search !== '') {
      setShowAll(false)
    }
  }

  const notify = (method, name) => {
    setType('notice')
    setMessage(method + name)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const duplicate = persons.find(person => person.name === newName)

    if (duplicate) {
      if (duplicate.number === personObject.number) {
        alert(`${newName} is already added to the phonebook`)
      } else {
        if (window.confirm(`${duplicate.name} is already added to phonebook, replace the old number with new one?`)) {
          personService
            .update(duplicate.id, personObject)
            .then(response => {
              setPersons(persons.map(person => person.id !== duplicate.id ? person : response.data))
              notify("Updated ", response.data.name)
            })
            .catch(error => {
              setType('error')
              setMessage(`Information of ${duplicate.name} has already been removed from server`)
            })
        }
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          notify("Added ", response.data.name)
        })
        .catch(error => {
          setType('error')
          setMessage(error.response.data.error)
        })
    }
  }

  const deletePerson = (id, e) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      personService
        .deletePerson(id)
        .then(response => {
          const updatedPersons = persons.filter(person => person.id !== id)
          setPersons(updatedPersons)
          notify("Deleted ", persons.find(person => person.id === id).name)
        })
        .catch(error => {
          setType('error')
          setMessage(`Information of ${persons.find(person => person.id === id).name} has already been removed from server`)
        })
    }
  }

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
      <Filter search={search} handleSearchChange={handleSearchChange} setShowAll={setShowAll} />

      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} deletePerson={deletePerson} />
      
    </div>
  );
}

export default App;
