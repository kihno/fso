import { Entry } from "../types";

interface EntryProps {
  entry: Entry;
}

const DiaryEntry = (props: EntryProps) => {
  const { entry } = props;
  
  return(
    <div>
      <h3>{entry.date}</h3>
      <div>visibility: {entry.visibility}</div>
      <div>weather: {entry.weather}</div>
      {entry.comment && <div>comment: {entry.comment}</div>}
    </div>
  )
}

export default DiaryEntry;
