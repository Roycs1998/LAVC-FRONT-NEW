"use client";

import { CompanyForm } from "../ui/company-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewCompanyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Nueva empresa</h1>
        <p className="text-sm text-muted-foreground">
          Completa los campos y crea tu empresa.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Registro</CardTitle>
        </CardHeader>
        <CardContent>
          <CompanyForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}
