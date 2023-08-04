import { Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useEffect, useState } from "react";
import patientService from '../../services/patients';
import { useParams } from "react-router-dom";

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

  return(
    <div>
      <h1>{patient.name} {icon()}</h1>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  )
}

export default PatientInfo;
