import { CompanyForm } from "../../ui/company-form";

async function fetchCompany(id: string) {
  const r = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/companies/${id}`,
    { cache: "no-store" }
  );
  if (!r.ok) throw new Error("No se pudo cargar");
  return r.json();
}

export default async function EditCompany({
  params,
}: {
  params: { id: string };
}) {
  const company = await fetchCompany(params.id);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Editar empresa</h1>
      <CompanyForm mode="edit" id={params.id} defaultValues={company} />
    </div>
  );
}
