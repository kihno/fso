import { NewPatient, Gender, Entry, NewEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data.');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing.');
};

const parseType = (type: unknown): string => {

};

const parseDate = (date: unknown): string => {

};

const parseDiagnosesCodes = (diagnosisCodes: unknown): string[] => {

};

const parseSpecialist = (specialist: unknown): string => {

};

const parseDescription = (description: unknown): string => {

};

const createBaseEntry = (entry: Entry): NewEntry => {
  const newEntry: NewEntry = {
    type: parseType(entry.type),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    description: parseDescription(entry.description),
  };
  if (entry.diagnosisCodes)
    newEntry.diagnosisCodes = parseDiagnosesCodes(entry.diagnosisCodes);
  return newEntry;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data.');
  }

  if ('date' in object && 'type' in object && 'specialist' in object && 'description' in object) {
    switch(object.type) {
      case "Hospital":
        const newEntry: NewEntry = {
          ...createBaseEntry(object)
        }
        return newEntry;
      case "OccupationalHealthcare":

      case "HealthCheck":
    }

  }
};

