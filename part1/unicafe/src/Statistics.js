import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
    const { good, bad, neutral } = props;
    const all = good + neutral + bad;
    const average = () => {
        return (good - bad) / all
    }

    const positive = () => {
        return (good / all)*100 + ' %'
    }

    if (all > 0) {
        return (
            <div className="Statistics">
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <StatisticLine text="Good" value={good} />
                        <StatisticLine text="Neutral" value={neutral} />
                        <StatisticLine text="Bad" value={bad} />
                        <StatisticLine text="All" value={all} />
                        <StatisticLine text="Average" value={average()} />
                        <StatisticLine text="Positive" value={positive()} />
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div>
            <h1>Statistics</h1>
            <p>No Feedback given</p>
        </div>
    )
    
}
  
  export default Statistics;
