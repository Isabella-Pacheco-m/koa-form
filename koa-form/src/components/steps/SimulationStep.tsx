import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DollarSign, Calendar, TrendingUp, UserCheck, ArrowLeft, Calculator } from "lucide-react";

interface SimulationData {
  amount: string;
  term: string;
  frequency: string;
  hasAdvisor: string;
  advisorCode?: string;
}

interface SimulationStepProps {
  data: SimulationData;
  onDataChange: (data: SimulationData) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const SimulationStep = ({ data, onDataChange, onSubmit, onBack }: SimulationStepProps) => {
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);
  const [advisorCode, setAdvisorCode] = useState("");

  const handleSubmit = () => {
    if (!data.amount || !data.term || !data.frequency) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    if (data.hasAdvisor === "si" && !advisorCode) {
      setShowAdvisorModal(true);
      return;
    }

    onSubmit();
  };

  const handleAdvisorSubmit = () => {
    if (!advisorCode.trim()) {
      alert("Por favor ingresa el código de tu asesor");
      return;
    }
    setShowAdvisorModal(false);
    onDataChange({ ...data, advisorCode });
    onSubmit();
  };

  const handleAdvisorChange = (value: string) => {
    onDataChange({ ...data, hasAdvisor: value });
    if (value === "si") {
      setShowAdvisorModal(true);
    }
  };

  const formatCurrency = (value: string) => {
    const number = parseInt(value.replace(/\D/g, ''));
    return new Intl.NumberFormat('es-CO').format(number);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 shadow-koa-card border-0 bg-gradient-koa-subtle max-w-md w-full">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-koa-primary rounded-full flex items-center justify-center mx-auto shadow-koa-elegant">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-koa-secondary">SIMULA TU CDT</h1>
                <p className="text-sm text-gray-600 mt-2">100% DIGITAL</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="amount" className="text-koa-secondary font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  ¿Cuánto vas a invertir?
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg font-semibold text-gray-500">$</span>
                  <Input
                    id="amount"
                    value={formatCurrency(data.amount)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      onDataChange({ ...data, amount: value });
                    }}
                    className="text-lg font-semibold h-12 pl-8 border-gray-300 focus:border-koa-primary focus:ring-2 focus:ring-koa-primary/20"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Puedes invertir entre $500.000 y $500.000.000
                </p>
              </div>

              <div className="space-y-3">
                <Label className="text-koa-secondary font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  ¿A qué plazo deseas invertir?
                </Label>
                <Select value={data.term} onValueChange={(value) => onDataChange({ ...data, term: value })}>
                  <SelectTrigger className="h-12 bg-white border-gray-300 focus:border-koa-primary focus:ring-2 focus:ring-koa-primary/20">
                    <SelectValue placeholder="Selecciona el plazo" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1">1 mes</SelectItem>
                    <SelectItem value="3">3 meses</SelectItem>
                    <SelectItem value="5">5 meses</SelectItem>
                    <SelectItem value="6">6 meses</SelectItem>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="18">18 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Puedes invertir entre 1 a 24 meses
                </p>
              </div>

              <div className="space-y-3">
                <Label className="text-koa-secondary font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  ¿Cada cuánto deseas recibir tus rendimientos?
                </Label>
                <Select value={data.frequency} onValueChange={(value) => onDataChange({ ...data, frequency: value })}>
                  <SelectTrigger className="h-12 bg-white border-gray-300 focus:border-koa-primary focus:ring-2 focus:ring-koa-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="mensual">Mensual</SelectItem>
                    <SelectItem value="vencimiento">Al vencimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-koa-secondary font-medium flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  ¿Actualmente estás recibiendo ayuda de un asesor?
                </Label>
                <RadioGroup 
                  value={data.hasAdvisor} 
                  onValueChange={handleAdvisorChange}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="si" className="border-2 border-koa-primary data-[state=checked]:bg-koa-primary" />
                    <Label htmlFor="si" className="text-sm font-normal">SI</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" className="border-2 border-koa-primary data-[state=checked]:bg-koa-primary" />
                    <Label htmlFor="no" className="text-sm font-normal">NO</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="flex-1 h-12 border-koa-primary text-koa-primary hover:bg-koa-primary/10 font-semibold text-base transition-koa-smooth flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  ATRÁS
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 h-12 bg-gradient-koa-primary hover:opacity-90 text-white font-semibold text-base shadow-koa-elegant transition-koa-smooth border-0"
                >
                  SIMULAR
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={showAdvisorModal} onOpenChange={setShowAdvisorModal}>
        <DialogContent className="sm:max-w-md border-0 shadow-koa-elegant bg-white">
          <DialogHeader className="relative pb-4">
            <DialogTitle className="text-center flex flex-col items-center gap-4 pt-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <UserCheck className="w-8 h-8 text-gray-600" />
              </div>
              <span className="text-koa-secondary text-lg font-bold">
                ¿ESTÁ RECIBIENDO LA AYUDA DE UN ASESOR?
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-2">
            <div>
              <Label htmlFor="advisor-code" className="text-sm font-medium text-gray-600">
                CÓDIGO DEL ASESOR
              </Label>
              <Input
                id="advisor-code"
                value={advisorCode}
                onChange={(e) => setAdvisorCode(e.target.value)}
                placeholder="ABC1234"
                className="mt-2 h-12 text-center font-semibold border-gray-300 focus:border-koa-primary focus:ring-2 focus:ring-koa-primary/20"
              />
            </div>
            <Button 
              onClick={handleAdvisorSubmit}
              className="w-full h-12 bg-gradient-koa-primary hover:opacity-90 text-white font-semibold transition-koa-smooth border-0"
            >
              CONFIRMAR
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};