import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Props {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

const FormSection = ({ title, description, icon, children }: Props) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-5">
        <div className="flex items-start gap-3">
          {icon && <div className="mt-0.5 text-muted-foreground">{icon}</div>}
          <div>
            <h2 className="text-base font-semibold leading-none">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormSection;
