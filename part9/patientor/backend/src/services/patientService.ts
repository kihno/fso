import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients-full';
import { NonSensitivePatientInfo, Patient, NewPatient, Entry, NewEntry } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const id: string = uuid();

const getPatients = (): Patient[] => {
  return patientData;
};

const getById = (id: string): Patient | undefined => {
  const patient = patientData.find(p => p.id === id);
  return patient;
}

const getNonSensitivePatients = (): NonSensitivePatientInfo[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
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

const addEntry = (entry: NewEntry): Entry => {
  const newEntry = {
    id: id,
    ...entry
  };

  return newEntry;
};

export default {
  getPatients,
  getById,
  getNonSensitivePatients,
  addPatient,
  addEntry
};
