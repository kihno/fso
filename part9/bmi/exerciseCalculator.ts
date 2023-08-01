interface ExcerciseValues {
  target: number;
  daily: number[];
}

interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): ExcerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments.');

  const hours = args.slice(3);
  const isNumber = (currentValue: string): boolean => !isNaN(Number(currentValue));

  if (!isNaN(Number(args[2])) && hours.every(isNumber)) {
    return {
      target: Number(args[2]),
      daily: hours.map((hour) => Number(hour))
    }
  } else {
    throw new Error('Provided values were not number!');
  }
}

const calculateExercises = (target: number, daily: number[]): Results => {
  const periodLength = daily.length;

  const trainingDays = daily.reduce((total, current) => {
    return current === 0 ? total : total + 1;
  }, 0)

  const average = daily.reduce((partial, a) => partial + a, 0) / periodLength;

  let success = false;

  let rating = 1;

  let ratingDescription = "mission failed, we'll get em next time.";

  if (average >= target) {
    success = true;
    rating = 3;
    ratingDescription = "mission accomplished";
  } else if (average >= target - 1) {
    rating = 2;
    ratingDescription = "close but no cigar";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { target, daily } = parseArguments(process.argv);
  console.log(calculateExercises(target, daily));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
