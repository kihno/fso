const Total = (props) => {
    const { parts } = props

    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <b>total of {total} exercises</b>
    )
}

export default Total;
