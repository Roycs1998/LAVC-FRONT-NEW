import { PageHeader } from "@/components/layout/page-header";
import { CompanyForm } from "../ui/company-form";

export default function NewCompanyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Nueva empresa"
        subtitle="Completa los campos y crea tu empresa."
      />

      <CompanyForm mode="create" />
    </div>
  );
}
