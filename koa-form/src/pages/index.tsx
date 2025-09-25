import { useState } from "react";
import { SimulationForm } from "@/components/SimulationForm";
import { SimulationResults } from "@/components/SimulationResults";
import { toast } from "@/hooks/use-toast";


interface CompleteFormData {
  name: string;
  email: string;
  phone: string;
  amount: string;
  term: string;
  frequency: string;
  hasAdvisor: string;
  advisorCode?: string;
}

const Index = () => {
  const [simulationData, setSimulationData] = useState<CompleteFormData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSimulation = (data: CompleteFormData) => {
    setSimulationData(data);
    setShowResults(true);
    toast({
      title: "✅ Simulación completada",
      description: `¡Hola ${data.name}! Aquí tienes los resultados de tu inversión`,
      className: "bg-white",
    });
  };


  const handleBack = () => {
    setShowResults(false);
  };

  const handleShare = () => {
    if (navigator.share && simulationData) {
      navigator.share({
        title: "Mi simulación CDT - Koa",
        text: `Simulé una inversión de $${parseInt(simulationData.amount).toLocaleString()} por ${simulationData.term} meses con Koa`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Enlace copiado",
        description: "El enlace de tu simulación ha sido copiado al portapapeles",
        className: "bg-white",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">


      <main className="container mx-auto">
        <div className="max-w-2xl mx-auto">
          {!showResults ? (
            <SimulationForm onSubmit={handleSimulation} />
          ) : (
            simulationData && (
              <SimulationResults
                investment={parseInt(simulationData.amount)}
                term={parseInt(simulationData.term)}
                frequency={simulationData.frequency}
                onBack={handleBack}
                onShare={handleShare}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;