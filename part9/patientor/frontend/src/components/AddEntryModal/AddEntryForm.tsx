import { Button, Grid, TextField, InputLabel, Select, MenuItem, SelectChangeEvent, Input, FormControl } from "@mui/material";
import { EntryFormValues, EntryType, Diagnosis, HealthCheckRating } from "../../types";
import { useState, useEffect, SyntheticEvent } from "react";
import diagnosisService from "../../services/diagnoses"

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface TypeOption {
  value: EntryType;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

interface RatingOption {
  value: string | HealthCheckRating;
  label: string;
}


const ratingOptions: RatingOption[] = Object.values(HealthCheckRating).filter(v =>
  isNaN(Number(v)),
).map((v, index) => ({
  value: index+1, label: v.toString()
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState("HealthCheck");
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('4');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  
  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      setType(value)
    }
  }

  const onDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;
    if (typeof value === 'string') {
      setDiagnosisCodes((prevArr) => [...prevArr, value]);
    } else {
      setDiagnosisCodes(value);
    }
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    if (type === 'HealthCheck') {
      onSubmit({
        type: "HealthCheck",
        date,
        specialist,
        description,
        diagnosisCodes,
        healthCheckRating: parseInt(healthCheckRating)
      });
    } else if (type === "Hospital") {
      onSubmit({
        type: "Hospital",
        date,
        specialist,
        description,
        diagnosisCodes,
        discharge: { date: dischargeDate, criteria }
      });
    } else if (type === "OccupationalHealthcare") {
      onSubmit({
        type: "OccupationalHealthcare",
        date,
        specialist,
        description,
        diagnosisCodes,
        employerName,
        sickLeave: { startDate, endDate }
      });
    }
  }

  return(
    <div>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={type}
          onChange={onTypeChange}
          style={{ marginBottom: 20 }}
        >
        {typeOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>

        <TextField
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
        <Select
          label="Diagnosis codes"
          fullWidth
          multiple
          value={diagnosisCodes}
          onChange={onDiagnosisChange}
        >
        {diagnoses?.map(option =>
          <MenuItem
            key={option.code}
            value={option.code}
          >
            {option.code}
          </MenuItem>
        )}
        </Select>
        {type === "HealthCheck" &&
          <div>
            <InputLabel style={{ marginTop: 20 }}>HealthCheck rating</InputLabel>
            <Select
              label="HealthCheck rating"
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value)}
            >
            {ratingOptions.map(option =>
              <MenuItem
                key={option.label}
                value={option.value}
              >
                {option.label
              }</MenuItem>
            )}
            </Select>
          </div>
        }
        {type === "Hospital" &&
          <div>
          <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
          <TextField
            type="date"
            name="dischargeDate" 
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
            label="Criteria"
            fullWidth
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
          />
        </div>
        }
        {type === "OccupationalHealthcare" &&
          <div>
            <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Sick Leave</InputLabel>
              <Grid style={{ marginBottom: 100 }}>
                <Grid item style={{ float: "left", marginLeft: 40 }}>
              <InputLabel htmlFor="date">Start date </InputLabel>
              <TextField
                type="date"
                id="startDate"
                name="startDate" 
                value={startDate}
                onChange={({ target }) => setStartDate(target.value)}
              />
              </Grid>
              <Grid item style={{ float: "right", marginRight: 40 }}>
              <InputLabel htmlFor="date">End date </InputLabel>
              <TextField
                type="date"
                id="endDate"
                name="endDate" 
                value={endDate}
                onChange={({ target }) => setEndDate(target.value)}
              />
              </Grid>
              </Grid>
          </div>
        }
        <Grid style={{ marginTop: 20 }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
};

export default AddEntryForm;
