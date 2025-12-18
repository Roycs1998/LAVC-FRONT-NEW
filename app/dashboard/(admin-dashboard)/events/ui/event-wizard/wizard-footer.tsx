import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WizardFooterProps {
  activeStep: "basic" | "schedule" | "registration" | "tickets";
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
  isEditing: boolean;
  isSubmitting: boolean;
}

export function WizardFooter({
  activeStep,
  onBack,
  onNext,
  onCancel,
  isEditing,
  isSubmitting,
}: WizardFooterProps) {
  const isFirstStep = activeStep === "basic";
  const isLastStep = activeStep === "tickets";

  return (
    <div className="fixed inset-x-0 bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t z-10 md:left-64">
      <div className="mx-auto max-w-screen-xl px-4 py-3 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {activeStep === "basic" && "Paso 1 de 4: Información básica"}
          {activeStep === "schedule" && "Paso 2 de 4: Fechas y ubicación"}
          {activeStep === "registration" &&
            "Paso 3 de 4: Configuración de registro"}
          {activeStep === "tickets" && "Paso 4 de 4: Tipos de tickets"}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>

          {!isFirstStep && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
          )}

          {isLastStep ? (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Guardando..."
                : isEditing
                ? "Actualizar evento"
                : "Crear evento"}
            </Button>
          ) : (
            <Button type="button" onClick={onNext}>
              Siguiente
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
