import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, ArrowRight } from "lucide-react";

interface PersonalInfoData {
  name: string;
  email: string;
  phone: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onDataChange: (data: PersonalInfoData) => void;
  onNext: () => void;
}

export const PersonalInfoStep = ({ data, onDataChange, onNext }: PersonalInfoStepProps) => {
  const handleSubmit = () => {
    if (!data.name || !data.email || !data.phone) {
      alert("Por favor completa todos los campos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Por favor ingresa un email válido");
      return;
    }

    onNext();
  };

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <Card className="p-8 shadow-koa-card border-0 bg-gradient-koa-subtle max-w-md w-full">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-koa-primary rounded-full flex items-center justify-center mx-auto shadow-koa-elegant">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-koa-secondary">INFORMACIÓN PERSONAL</h1>
              <p className="text-sm text-gray-600 mt-2">Cuéntanos un poco sobre ti</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-koa-secondary font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Nombre completo
              </Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => onDataChange({ ...data, name: e.target.value })}
                placeholder="Ingresa tu nombre completo"
                className="h-12 border-gray-300 focus:border-koa-primary focus:ring-2 focus:ring-koa-primary/20"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-koa-secondary font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => onDataChange({ ...data, email: e.target.value })}
                placeholder="correo@ejemplo.com"
                className="h-12 border-gray-300 focus:border-koa-primary focus:ring-2 focus:ring-koa-primary/20"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone" className="text-koa-secondary font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Teléfono
              </Label>
              <Input
                id="phone"
                value={data.phone}
                onChange={(e) => onDataChange({ ...data, phone: e.target.value })}
                placeholder="3001234567"
                className="h-12 border-gray-300 focus:border-koa-primary focus:ring-2 focus:ring-koa-primary/20"
              />
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full h-12 bg-gradient-koa-primary hover:opacity-90 text-white font-semibold text-base shadow-koa-elegant transition-koa-smooth flex items-center justify-center gap-2 border-0"
            >
              CONTINUAR
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};