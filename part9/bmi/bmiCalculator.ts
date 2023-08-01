interface BmiValues {
  mass: number;
  height: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments. Please include mass in LBS and height in IN.');
  if (args.length > 4) throw new Error('Too many arguments. Please include mass in LBS and height in IN.');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      mass: Number(args[2]),
      height: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not number! Please include mass in LBS and height in IN.');
  }
}

const calculateBmi = (mass: number, height: number): string => {
  const bmi: number = (mass / (height * height) * 703);
  
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi > 18.6 && bmi < 25) {
    return "Normal";
  } else if (bmi > 25 && bmi < 30) {
    return "Overweight";
  } else if (bmi > 30) {
    return "Obese";
  }
}

try {
  const { mass, height } = parseArguments(process.argv)
  console.log(calculateBmi(mass, height));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
