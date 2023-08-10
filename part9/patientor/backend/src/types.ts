export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  "Healthy" = 4,
  "LowRisk" = 3,
  "HighRisk" = 2,
  "CriticalRisk" = 1,
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital"
}

export interface BaseEntry {
  id: string;
  date: string;
  type: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Diagnosis['code'][];
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

type EntryOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = EntryOmit<Entry, 'id'>;

export type NewBaseEntry = Omit<Entry, 'id'>;

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatientInfo = Omit<Patient, 'ssn' | 'entries'>;
