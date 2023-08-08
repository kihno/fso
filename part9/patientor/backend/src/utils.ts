import { NewPatient, Diagnosis, Gender, Entry, NewEntry, NewBaseEntry, Discharge, SickLeave, HealthCheckRating } from "./types";

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

// const parseType = (type: unknown): Entry => {
//   if (type !== "Hospital" || type !== "OccupationalHealthcare" || type !== "HealthcareCheck") {
//     throw new Error('Incorrect or missing type: ' + type);
//   }
//   return type;
// };

const parseDate = (date: unknown): string => {
  if (!isString(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseDiagnosesCodes = (object: any[]): string[] => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isString(discharge.date) || !isString(discharge.criteria)) {
    throw new Error(`Incorrent or missing discharge: ` + discharge)
  }
  return {
    date: discharge.date,
    criteria: discharge.criteria
  }
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employerName: ' + employerName);
  }
  return employerName;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isString(sickLeave.startDate) || !isString(sickLeave.endDate)) {
    throw new Error(`Incorrent or missing sickLeave: ` + sickLeave)
  }
  return {
    startDate: sickLeave.startDate,
    endDate: sickLeave.endDate
  }
};

const createBaseEntry = (entry: Entry): NewBaseEntry => {
  const baseEntry: NewBaseEntry = {
    type: entry.type,
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    description: parseDescription(entry.description),
  };
  if (entry.diagnosisCodes)
    baseEntry.diagnosisCodes = parseDiagnosesCodes(entry.diagnosisCodes);
  return baseEntry;
};

export const toNewEntry = (object: any): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data.');
  }

  if ('date' in object && 'type' in object && 'specialist' in object && 'description' in object) {
    const baseEntry = createBaseEntry(object);

    switch(object.type) {
      case "Hospital":
        const hospitalEntry: NewEntry = {
          ...baseEntry,
          type: "Hospital",
          discharge: parseDischarge(object.discharge)
        }
        return hospitalEntry;
      case "OccupationalHealthcare":
        const occupationalEntry: NewEntry = {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName: parseEmployerName(object.employerName)
        }
        if ("sickLeave" in object) {
          occupationalEntry.sickLeave = parseSickLeave(object.sickLeave);
        }
        return occupationalEntry;
      case "HealthCheck":
        const healthCheckEntry: NewEntry = {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        }
        return healthCheckEntry;
      default:
        throw new Error(`Invalide entry type ${object.type}`);
    }
  }
  throw new Error('Incorrect data: some fields are missing.');
};

