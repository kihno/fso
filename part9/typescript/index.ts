import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(height) || isNaN(weight)) {
    return res.send({ error: 'malformatted parameters' });
  }

  return res.send({ weight, height, bmi: calculateBmi(weight, height) });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { target, daily_exercises } = req.body;

  if (target === undefined || daily_exercises === undefined) {
    return res.send({ error: "missing paramters"});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some(isNaN)) {
    return res.send({ error: "malformatted parameters"});
  } 

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument 
  const result = calculateExercises(Number(target), daily_exercises);
  return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
