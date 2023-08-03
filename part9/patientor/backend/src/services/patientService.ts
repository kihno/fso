import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { NonSensitivePatientInfo, Patient, NewPatient } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const id: string = uuid();

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatientInfo[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  })) ;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: id,
    ...patient
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};
