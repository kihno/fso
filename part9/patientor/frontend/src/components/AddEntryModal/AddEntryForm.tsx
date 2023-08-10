import { Button, Grid, TextField } from "@mui/material";
import { EntryFormValues, EntryTypes } from "../../types";
import { useState, SyntheticEvent } from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState([""]);

  // const onHealthCheckChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  //   event.preventDefault();
  //   if (typeof event.target.value === 'string' ) {
  //     const rating = parseInt(event.target.value);
  //     if (rating) {
  //       setHealthCheckRating(rating);
  //     }
  //   }
  // }

  const onDiagnosisChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string' ) {
      const diagnosis = event.target.value.split(", ");
      if (diagnosis) {
        setDiagnosisCodes(diagnosis);
      }
    }
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: EntryTypes.HealthCheck,
      date,
      specialist,
      description,
      diagnosisCodes,
      healthCheckRating: parseInt(healthCheckRating)
    });
  }

  return(
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
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
        <TextField
          label="Healthcheck rating"
          fullWidth
          value={healthCheckRating?.toString()}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisChange}
        />
        <Grid>
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
