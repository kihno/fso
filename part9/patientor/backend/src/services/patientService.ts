import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients-full';
import { NonSensitivePatientInfo, Patient, NewPatient, Entry, NewEntry } from '../types';

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
    id: uuid(),
    ...patient
  };

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const patient = getById(id);
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient?.entries?.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getById,
  getNonSensitivePatients,
  addPatient,
  addEntry
};
