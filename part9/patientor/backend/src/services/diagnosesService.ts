import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnosis: Diagnosis[] = diagnosesData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnosis;
};

export default {
  getDiagnoses
};
