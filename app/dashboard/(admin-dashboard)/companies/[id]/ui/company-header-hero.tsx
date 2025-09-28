"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit } from "lucide-react";
import { Company } from "@/modules/company";
import { CompanyStatusBadge } from "../../ui/company-status-bagde";
import { CompanyTypeLabels } from "@/modules/company/contants";

interface Props {
  company: Company;
}

export function CompanyHeaderHero({ company }: Props) {
  const router = useRouter();
  const initials = (company.name ?? "??").slice(0, 2).toUpperCase();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/companies">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </Button>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold capitalize">{company.name}</h1>

            <div className="flex flex-wrap items-center gap-2">
              <CompanyStatusBadge status={company.entityStatus} />

              <Badge variant="outline" className="capitalize">
                {CompanyTypeLabels[company.type] ?? ""}
              </Badge>
            </div>
          </div>
        </div>

        <div className="md:ml-auto flex flex-wrap items-center gap-2">
          <Button
            onClick={() =>
              router.push(`/dashboard/companies/${company.id}/edit`)
            }
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar empresa
          </Button>
        </div>
      </div>
    </div>
  );
}
