import { HealthCheckEntry } from "../../types";
import HealthRatingBar from "../HealthRatingBar";
import DiagnosisList from "./Diagnosis";

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div>
      {entry.diagnosisCodes &&
        <ul>
          {entry.diagnosisCodes.map(code => <DiagnosisList key={code} code={code} />)}
        </ul>
      }
      <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
    </div>
  )
};

export default HealthCheck;
