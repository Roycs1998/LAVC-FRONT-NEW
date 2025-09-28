"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { Company } from "@/modules/company";
import {
  formatAddress,
  hasAddress,
} from "@/modules/company/utils/capabilities";

interface Props {
  company: Company;
}

export function CompanyTabOverview({ company }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información sobre la empresa</CardTitle>
        <CardDescription>Información básica sobre esta empresa</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {company.contactEmail && (
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{company.contactEmail}</span>
            </div>
          )}
          {company.contactPhone && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{company.contactPhone}</span>
            </div>
          )}
          {hasAddress(company) && (
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{formatAddress(company)}</span>
            </div>
          )}
        </div>

        {company.description && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Acerca de</h4>
            <p className="text-sm text-muted-foreground">
              {company.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
