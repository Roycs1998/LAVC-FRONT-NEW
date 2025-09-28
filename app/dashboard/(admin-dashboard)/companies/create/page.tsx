"use client";

import { CompanyForm } from "../ui/company-form";

export default function NewCompanyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Nueva empresa</h1>
        <p className="text-sm text-muted-foreground">
          Completa los campos y crea tu empresa.
        </p>
      </div>
      <CompanyForm mode="create" />
    </div>
  );
}
