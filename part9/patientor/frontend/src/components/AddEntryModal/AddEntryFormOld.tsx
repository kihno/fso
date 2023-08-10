// import { useState, SyntheticEvent } from "react";

// import {  FormControl, TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

// import { Entry, EntryFormValues, EntryTypes, HealthCheckRating } from "../../types";

// interface Props {
//   onCancel: () => void;
//   onSubmit: (values: EntryFormValues) => void;
// }

// // interface GenderOption{
// //   value: Gender;
// //   label: string;
// // }

// // const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
// //   value: v, label: v.toString()
// // }));

// interface EntryOption {
//   value: EntryTypes;
//   label: string;
// }

// const entryOptions : EntryOption[] = [
//   { value: EntryTypes.HealthCheck, label: "HealthCheck" },
//   { value: EntryTypes.OccupationalHealthcare, label: "OccupationalHealthcare" },
//   { value: EntryTypes.Hospital, label: "Hospital" }
// ];

// interface RatingOption {
//   value: HealthCheckRating;
//   label: string;
// }

// const ratingOptions: RatingOption[] = [
//   { value: HealthCheckRating.Healthy, label: "Healthy" },
//   { value: HealthCheckRating.LowRisk, label: "LowRisk" },
//   { value: HealthCheckRating.HighRisk, label: "HighRisk" },
//   { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
// ]

// const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
//   const [type, setType] = useState<EntryTypes>(EntryTypes.Hospital);
//   const [date, setDate] = useState('');
//   const [description, setDescription] = useState('');
//   const [specialist, setSpecialist] = useState('');
//   const [rating, setRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
//   //const [gender, setGender] = useState(Gender.Other);

//   // const onGenderChange = (event: SelectChangeEvent<string>) => {
//   //   event.preventDefault();
//   //   if ( typeof event.target.value === "string") {
//   //     const value = event.target.value;
//   //     const gender = Object.values(Gender).find(g => g.toString() === value);
//   //     if (gender) {
//   //       setGender(gender);
//   //     }
//   //   }
//   // };

//   const onTypeChange = (event: SelectChangeEvent<string>) => {
//     event.preventDefault();
//     if (typeof event.target.value === 'string') {
//       const value = event.target.value;
//       const type = Object.values(EntryTypes).find(t => t.toString() === value);
//       if (type) {
//         setType(type);
//       }
//     }
//   }

//   const onRatingChange = (event: SelectChangeEvent<string>) => {
//     event.preventDefault();
//     if (typeof event.target.value === 'number') {
//       const value = event.target.value;
//       const rating = ratingOptions.find(rating => rating.value === value);
//       if (rating) {
//         setRating(rating.value);
//       }
//     }
//   }

//   const addEntry = (event: SyntheticEvent) => {
//     event.preventDefault();
//     onSubmit({
//       type,
//       date, 
//       description,
//       specialist,
//       healthCheckRating
//     });
//   };

//   const HealthCheckForm = () => {
//     return (
//       // <FormControl fullWidth>
//       //     <InputLabel id="select-label-rating">Rating</InputLabel>
//       //     <Select
//       //       labelId="rating"
//       //       id="rating"
//       //       value={rating}
//       //       label="Rating"
//       //       onChange={onRatingChange}
//       //     >
//       //       {ratingOptions.map(rating => 
//       //          <MenuItem key={rating.label} value={rating.value}>{rating.label}</MenuItem>  
//       //       )}
//       //     </Select>
//       //   </FormControl>
//       <div>
//         <TextField
//           type="number"
//           label="Healthcheck rating"
//           fullWidth 
//           value={rating}
//           onChange={({ target }) => setRating(target.value)}
//         />
//       </div>
//     )
//   }

//   return (
//     <div>
//       <form onSubmit={addEntry}>
//         <FormControl fullWidth>
//           <InputLabel id="select-label-type">Type</InputLabel>
//           <Select
//             labelId="type"
//             id="type"
//             value={type}
//             label="Type"
//             onChange={onTypeChange}
//           >
//             {entryOptions.map(type => 
//                <MenuItem key={type.label} value={type.value}>{type.label}</MenuItem>  
//             )}
//           </Select>
//         </FormControl>
//         <TextField
//           label="Date"
//           fullWidth 
//           value={date}
//           onChange={({ target }) => setDate(target.value)}
//         />
//         <TextField
//           label="Specialist"
//           fullWidth
//           value={specialist}
//           onChange={({ target }) => setSpecialist(target.value)}
//         />
//         <TextField
//           label="Description"
//           placeholder="YYYY-MM-DD"
//           fullWidth
//           value={description}
//           onChange={({ target }) => setDescription(target.value)}
//         />

//         {/* <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
//         <Select
//           label="Gender"
//           fullWidth
//           value={gender}
//           onChange={onGenderChange}
//         >
//         {genderOptions.map(option =>
//           <MenuItem
//             key={option.label}
//             value={option.value}
//           >
//             {option.label
//           }</MenuItem>
//         )}
//         </Select> */}

//         <Grid>
//           <Grid item>
//             <Button
//               color="secondary"
//               variant="contained"
//               style={{ float: "left" }}
//               type="button"
//               onClick={onCancel}
//             >
//               Cancel
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               style={{
//                 float: "right",
//               }}
//               type="submit"
//               variant="contained"
//             >
//               Add
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </div>
//   );
// };

// export default AddEntryForm;
export {}
