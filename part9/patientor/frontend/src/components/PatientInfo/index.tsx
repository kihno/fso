import axios from 'axios';
import { Button } from '@mui/material';
import { Entry, Patient, EntryFormValues } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import React, { useEffect, useState } from "react";
import patientService from '../../services/patients';
import { useParams } from "react-router-dom";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";
import AddEntryModal from '../AddEntryModal';

type PatientParams = {
  id: string;
}

const PatientInfo = () => {
  const { id } = useParams<PatientParams>();
  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      // const patient = await patientService.create(values);
      // setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  )
}

export default PatientInfo;
