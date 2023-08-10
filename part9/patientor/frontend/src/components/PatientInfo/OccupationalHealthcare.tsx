import { OccupationalHealthcareEntry } from "../../types";
import DiagnosisList from "./Diagnosis";

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {

  return (
    <div>
      <div>employer: {entry.employerName}</div>
      <div>sick leave: {entry.sickLeave ? <span>{entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</span> : "none"}</div>
      {entry.diagnosisCodes &&
        <ul>
          {entry.diagnosisCodes.map(code => <DiagnosisList key={code} code={code} />)}
        </ul>
      }
    </div>
  )
};

export default OccupationalHealthcare;
