import patientData from '../../data/patients';
import { NonSensitivePatientInfo, Patient } from '../types';

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

export default {
  getPatients,
  getNonSensitivePatients
};
