import { useEffect, useState } from "react";
import { Entry } from "./types";
import { getDiary, createEntry } from "./Services/diaryService";
import EntryForm from "./components/EntryForm"
import Diary from "./components/Diary";

function App() {
  const [diary, setDiary] = useState<Entry[]>([]);

  useEffect(() => {
    getDiary().then(data => {
      setDiary(data);
    });
  }, []);

  return (
    <div className="App">
      <EntryForm diary={diary} setDiary={setDiary} />
      <Diary diary={diary} />
    </div>
  );
}

export default App;
