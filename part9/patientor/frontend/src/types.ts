export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRating {
  "Healthy" = 4,
  "LowRisk" = 3,
  "HighRisk" = 2,
  "CriticalRisk" = 1,
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Diagnosis['code'][];
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string, endDate: string };
}
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: { date: string, criteria: string };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

type EntryFormOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryFormValues = EntryFormOmit<Entry, "id">;
