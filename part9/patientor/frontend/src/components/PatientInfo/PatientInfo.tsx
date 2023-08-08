import { Diagnosis, Entry, Patient, HealthCheckEntry } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import React, { useEffect, useState } from "react";
import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import { useParams } from "react-router-dom";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";

type PatientParams = {
  id: string;
}

const PatientInfo = () => {
  const { id } = useParams<PatientParams>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPatient = async () => {
      const foundPatient = await patientService.getPatient(id);
      setPatient(foundPatient);
    };
    void fetchPatient();
  }, [id]);

  const icon = () => {
    if (patient) {
      switch(patient.gender) {
      case "male":
        return <MaleIcon />
      case "female":
        return <FemaleIcon />
      case "other":
        return <TransgenderIcon />
      }
    }
  }

  if (!patient) {
    return <div>loading...</div>
  }

  const entryStyle = {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "5px",
    marginBottom: "5px"
  }

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const assertNever = (value: Entry): never => {
      throw new Error(
        `Unhandled union member: ${JSON.stringify(value)}`
      )
    };

    switch (entry.type) {
      case "Hospital":
        return <Hospital entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare entry={entry} />;
      case "HealthCheck":
        return <HealthCheck entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return(
    <div>
      <h1>{patient.name} {icon()}</h1>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <div>
        <h3>entries</h3>
        {patient.entries && patient.entries.map(entry => {
          return (
            <div style={entryStyle} key={entry.id}>
              <p>{entry.date} <i>{entry.description}</i></p>
              <div>type: {entry.type}</div>
              <div>specialist: {entry.specialist}</div>
              <br></br>
              <EntryDetails entry={entry} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PatientInfo;
