const PersonForm = (props) => {
    const { newName, newNumber, handleNameChange, handleNumberChange, addPerson } = props

    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={addPerson}>add</button>
            </div>
        </form>
    )
}

export default PersonForm;
