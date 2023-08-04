import DiaryEntry from "./DiaryEntry";
import { Entry } from "../types";

interface DiaryProps {
  diary: Entry[];
}

const Diary = (props: DiaryProps) => {
  const { diary } = props;
  
  return(
    <div>
      <h2>Diary entries</h2>
      <div>
      {diary.map(entry =>
        <DiaryEntry key={entry.id} entry={entry} />
      )}
      </div>
    </div>
  )
}

export default Diary;
