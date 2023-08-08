import { useEffect, useState } from "react";
import { Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";

interface DiagnosisProps {
  code: string;
}

const DiagnosisList = ({ code }: DiagnosisProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  
  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);

  const getDescription = (code: string) => {
    let description = ''

    diagnoses?.forEach(diag => {
      if (code === diag.code) {
        description = diag.name;
      }
    });

    return description;
  };

  return(
    <li key={code}>{code} {getDescription(code)}</li>
  )
};

export default DiagnosisList;
