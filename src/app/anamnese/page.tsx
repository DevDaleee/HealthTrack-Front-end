'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Check } from 'lucide-react';
import DemographicStep from './components/DemographicStep';
import NutritionalHistoryStep from './components/NutritionalHistoryStep';
import ClinicalHistoryStep from './components/ClinicalHistoryStep';
import BottomWave from '../components/bottom_wave';
import CircularProgressIndicator from './components/circularProgressIndicator';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  birthDate: string;
  age: string;
  sex: string;
  contact: string;
  ethnicity: string;
  nationality: string;
  naturalness: string;
  residence: string;
  neighborhood: string;
  city: string;
  state: string;
  maritalStatus: string;
  occupation: string;
  assistanceReason: string;

  foodPreferences: string;
  foodAversions: string;
  dietaryRestrictions: string;
  allergies: string;
  allergiesDetails: string;
  appetite: string;
  supplements: string;
  supplementsDetails: string;
  mealsPerDay: string;
  fruitsVegetables: string;
  waterConsumption: string;
  ultraprocessedFoods: string;

  diagnosedDiseases: string;
  diagnosedDiseasesDetails: string;
  medications: string;
  medicationsDetails: string;
  familyDiseaseHistory: string;
  vaccination: string;
  vaccinationDetails: string;
  previousDiseaseSequelae: string;
  previousDiseaseSequelaeDetails: string;
  accidents: string;
  accidentSequelae: string;
  cognitiveCapacity: string;
  cognitiveCapacityReason: string;
  emotionalState: string;
  emotionalStateReason: string;
  currentTreatment: string;
  treatmentDetails: string;
  autonomy: string;
  autonomyReason: string;
  otherFamilyDiseases?: string; 
}

const NutritionalForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    birthDate: '',
    age: '',
    sex: '',
    contact: '',
    ethnicity: '',
    nationality: '',
    naturalness: '',
    residence: '',
    neighborhood: '',
    city: '',
    state: '',
    maritalStatus: '',
    occupation: '',
    assistanceReason: '',

    foodPreferences: '',
    foodAversions: '',
    dietaryRestrictions: '',
    allergies: '',
    allergiesDetails: '',
    appetite: '',
    supplements: '',
    supplementsDetails: '',
    mealsPerDay: '',
    fruitsVegetables: '',
    waterConsumption: '',
    ultraprocessedFoods: '',

    diagnosedDiseases: '',
    diagnosedDiseasesDetails: '',
    medications: '',
    medicationsDetails: '',
    familyDiseaseHistory: '',
    vaccination: '',
    vaccinationDetails: '',
    previousDiseaseSequelae: '',
    previousDiseaseSequelaeDetails: '',
    accidents: '',
    accidentSequelae: '',
    cognitiveCapacity: '',
    cognitiveCapacityReason: '',
    emotionalState: '',
    emotionalStateReason: '',
    currentTreatment: '',
    treatmentDetails: '',
    autonomy: '',
    autonomyReason: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';


    if (isCheckbox) {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checkbox.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setCurrentStep(4);
    setTimeout(() => router.push('/profile'), 5000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      birthDate: '',
      age: '',
      sex: '',
      contact: '',
      ethnicity: '',
      nationality: '',
      naturalness: '',
      residence: '',
      neighborhood: '',
      city: '',
      state: '',
      maritalStatus: '',
      occupation: '',
      assistanceReason: '',
      foodPreferences: '',
      foodAversions: '',
      dietaryRestrictions: '',
      allergies: '',
      allergiesDetails: '',
      appetite: '',
      supplements: '',
      supplementsDetails: '',
      mealsPerDay: '',
      fruitsVegetables: '',
      waterConsumption: '',
      ultraprocessedFoods: '',
      diagnosedDiseases: '',
      diagnosedDiseasesDetails: '',
      medications: '',
      medicationsDetails: '',
      familyDiseaseHistory: '',
      vaccination: '',
      vaccinationDetails: '',
      previousDiseaseSequelae: '',
      previousDiseaseSequelaeDetails: '',
      accidents: '',
      accidentSequelae: '',
      cognitiveCapacity: '',
      cognitiveCapacityReason: '',
      emotionalState: '',
      emotionalStateReason: '',
      currentTreatment: '',
      treatmentDetails: '',
      autonomy: '',
      autonomyReason: '',
    });
    setCurrentStep(1);
  };

  const progressPercentage = ((currentStep - 1) / 3) * 100;

  return (
    <div className="relative w-screen h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <BottomWave />

      <div className="relative bg-white flex rounded-lg shadow-lg overflow-hidden w-[90%] max-w-9xl h-[700px]">
        {currentStep !== 4 && (
          <CircularProgressIndicator progressPercentage={progressPercentage} />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Demographic Information Step */}
          {currentStep === 1 && (
            <DemographicStep
              formData={formData}
              onChange={handleInputChange}
              onNext={nextStep}
            />
          )}

          {/* Nutritional History Step */}
          {currentStep === 2 && (
            <NutritionalHistoryStep
              formData={formData}
              onChange={handleInputChange}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {/* Clinical History Step */}
          {currentStep === 3 && (
            <ClinicalHistoryStep
              formData={formData}
              onChange={handleInputChange}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 4 && (
            <div className="justify-center p-10 w-[1500px] h-[500px] pt-50 pl-50">
              <div className=" text-center py-8">
                <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Check className="text-green-500" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Formulário Enviado com Sucesso!
                </h2>
                <p className="text-gray-600">
                  Obrigado por preencher o formulário de anamnese nutricional.
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NutritionalForm;
