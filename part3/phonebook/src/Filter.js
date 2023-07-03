const Filter = (props) => {
    const { search, handleSearchChange } = props

    return (
        <div>
          filter show with <input value={search} onChange={handleSearchChange} />
        </div>
    )
}

export default Filter;
