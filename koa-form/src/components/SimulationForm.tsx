import { useState } from "react";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { SimulationStep } from "./steps/SimulationStep";
import { SimulationResults } from "./SimulationResults";

interface PersonalInfoData {
  name: string;
  email: string;
  phone: string;
}

interface SimulationData {
  amount: string;
  term: string;
  frequency: string;
  hasAdvisor: string;
  advisorCode?: string;
}

interface CompleteFormData extends PersonalInfoData, SimulationData {}

interface SimulationFormProps {
  onSubmit?: (data: CompleteFormData) => void;
}

export const SimulationForm = ({ onSubmit }: SimulationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
    name: "",
    email: "",
    phone: ""
  });
  const [simulationData, setSimulationData] = useState<SimulationData>({
    amount: "10000000",
    term: "5",
    frequency: "mensual",
    hasAdvisor: "no"
  });

  const handlePersonalInfoNext = () => {
    setCurrentStep(2);
  };

  const handleSimulationBack = () => {
    setCurrentStep(1);
  };

  const handleFinalSubmit = () => {
    const completeData = {
      ...personalInfo,
      ...simulationData
    };
    
    if (onSubmit) {
      onSubmit(completeData);
    }
    
    setCurrentStep(3);
  };

  const handleResultsBack = () => {
    setCurrentStep(2);
  };

  const handleShare = () => {
    const shareData = {
      title: 'Simulación CDT Koa',
      text: `Mi simulación: ${new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(parseInt(simulationData.amount))} por ${simulationData.term} meses`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.text + ' - ' + shareData.url);
      alert('Información copiada al portapapeles');
    }
  };

  if (currentStep === 1) {
    return (
      <PersonalInfoStep
        data={personalInfo}
        onDataChange={setPersonalInfo}
        onNext={handlePersonalInfoNext}
      />
    );
  }

  if (currentStep === 2) {
    return (
      <SimulationStep
        data={simulationData}
        onDataChange={setSimulationData}
        onSubmit={handleFinalSubmit}
        onBack={handleSimulationBack}
      />
    );
  }

  return (
    <SimulationResults
      investment={parseInt(simulationData.amount)}
      term={parseInt(simulationData.term)}
      frequency={simulationData.frequency}
      onBack={handleResultsBack}
      onShare={handleShare}
    />
  );
};