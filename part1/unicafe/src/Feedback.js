import Button from './Button';

const Feedback = (props) => {
    const { good, setGood, bad, setBad, neutral, setNeutral } = props;

    return (
        <div className="Feedback">
            <h1>Give Feedback</h1>
            <div>
                <Button text="good" value={good} set={setGood} />
                <Button text="neutral" value={neutral} set={setNeutral} />
                <Button text="bad" value={bad} set={setBad} />
            </div>
        </div>
    );
}
  
  export default Feedback;
