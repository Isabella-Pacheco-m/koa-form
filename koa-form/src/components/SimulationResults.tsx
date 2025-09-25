import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, ExternalLink, HelpCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SimulationResultsProps {
  investment: number;
  term: number;
  frequency: string;
  onBack: () => void;
  onShare: () => void;
}

export const SimulationResults = ({ 
  investment, 
  term, 
  onBack, 
  onShare 
}: SimulationResultsProps) => {
  // Calculate returns based on term (simplified calculation for demo)
  const getAnnualRate = (months: number) => {
    if (months <= 3) return 0.085;
    if (months <= 6) return 0.093;
    if (months <= 12) return 0.096;
    return 0.098;
  };

  const annualRate = getAnnualRate(term);
  const grossReturns = (investment * annualRate * term) / 12;
  const retention = grossReturns * 0.04; // 4% retention
  const netReturns = grossReturns - retention;
  const totalAmount = investment + netReturns;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return (rate * 100).toFixed(2) + ' %';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="p-8 shadow-koa-card border-0 bg-gradient-koa-subtle max-w-lg w-full">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground font-medium">INVERSIÓN</p>
              <h1 className="text-3xl font-bold text-koa-secondary">
                {formatCurrency(investment)}
              </h1>
            </div>
            
            <Badge className="bg-gradient-koa-primary text-white px-4 py-1 text-sm font-medium">
              AHORRO CON PROPÓSITO
            </Badge>
          </div>

          {/* Rate and Term */}
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-medium mb-1">TASA E.A</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-koa-secondary">
                  {formatPercentage(annualRate)}
                </span>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Tasa vigente a la fecha 23/09/2025
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground font-medium mb-1">PLAZO</p>
              <span className="text-xl font-bold text-koa-secondary">
                {term} {term === 1 ? 'Mes' : 'Meses'}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Desde 23/09/2025 al 23/{String(((new Date().getMonth() + term) % 12) + 1).padStart(2, '0')}/2026
              </p>
            </div>
          </div>

          <Separator className="my-6" />


          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  TOTAL RENDIMIENTOS FINANCIEROS BRUTOS
                </span>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-lg font-bold text-koa-secondary">
                {formatCurrency(grossReturns)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                RETENCIÓN SOBRE RENDIMIENTOS
              </span>
              <span className="text-lg font-bold text-red-500">
                -{formatCurrency(retention)}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                INVERSIÓN + TOTAL RENDIMIENTOS FINANCIEROS NETOS
              </span>
              <span className="text-2xl font-bold text-koa-primary">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="text-center">
            <button className="text-koa-primary text-sm underline hover:no-underline transition-koa-smooth">
              Términos y condiciones CDT Digital
            </button>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Las tasas y valores descritos por KOA Compañía de Financiamiento S.A son datos aproximados y no representan una oferta de producto definitiva.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              className="w-full h-12 bg-gradient-koa-primary hover:opacity-90 text-white font-semibold text-base shadow-koa-elegant transition-koa-smooth"
            >
              <span>ABRIR CDT</span>
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>

            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-4">
                ¿QUIERES COMPARTIR ESTA SIMULACIÓN?
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 h-12 border-2 border-muted bg-background hover:bg-muted/50 transition-koa-smooth"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  VOLVER
                </Button>
                <Button 
                  onClick={onShare}
                  className="flex-1 h-12 bg-gradient-koa-secondary hover:opacity-90 text-white font-semibold transition-koa-smooth"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  COMPARTIR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
