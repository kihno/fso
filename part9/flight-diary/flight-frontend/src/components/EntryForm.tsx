import axios from 'axios';
import { useEffect, useState } from "react";
import { createEntry } from "../Services/diaryService";
import { Entry } from "../types";

interface FormProps {
  diary: Entry[];
  setDiary: (val: Entry[]) => void;
}

const EntryForm = (props: FormProps) => {
  const { setDiary, diary } = props;

  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const visibilityValues = ['great', 'good', 'ok', 'poor'];
  const weatherValues = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 8000);
  }, [error]);

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const response = await createEntry({ date, visibility, weather, comment });
      setDiary(diary.concat(response));
      
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;
        response && setError(response.data);
      } else {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <p style={{ color: 'red' }}>{error}</p>
      <form onSubmit={entryCreation}>
        <div>
          date<input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)} 
          />
        </div>
        <div>
          visibility
          {visibilityValues.map(value => (
            <span key={value} style={{ marginLeft: 10}}>
              {value}
              <input 
                id={value}
                type="radio"
                name="visibility"
                value={value}
                onChange={(event) => {
                  setVisibility(event.target.value);
                }}
                checked={visibility === value}
              />
            </span>
          ))}
        </div>
        <div>
          weather
          {weatherValues.map(value => (
            <span key={value} style={{ marginLeft: 10}}>
              {value}
              <input 
                id={value}
                type="radio"
                name="weather"
                value={value}
                onChange={(event) => {
                  setWeather(event.target.value);
                }}
                checked={weather === value}
              />
            </span>
          ))}
        </div>
        <div>
          comment<input
            value={comment}
            onChange={(event) => setComment(event.target.value)} 
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default EntryForm;
