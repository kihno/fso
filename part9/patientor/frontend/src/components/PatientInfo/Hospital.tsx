import { HospitalEntry } from "../../types";
import DiagnosisList from "./Diagnosis";

const Hospital= ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      {entry.diagnosisCodes &&
        <ul>
          {entry.diagnosisCodes.map(code => <DiagnosisList code={code} />)}
        </ul>
      }
      <div>discharged: {entry.discharge.date}, {entry.discharge.criteria}</div>
    </div>
  )
};

export default Hospital;
