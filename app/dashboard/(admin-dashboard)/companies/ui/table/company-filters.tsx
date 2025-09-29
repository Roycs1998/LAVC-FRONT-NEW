"use client";

import * as React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCcw, Search } from "lucide-react";
import { CompanyTypeLabels } from "@/modules/company/contants";

const ALL = "all";

export function CompanyFilters() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = React.useState(sp.get("search") ?? "");
  const [status, setStatus] = React.useState(sp.get("entityStatus") ?? ALL);
  const [type, setType] = React.useState(sp.get("type") ?? ALL);

  const apply = () => {
    const p = new URLSearchParams(sp.toString());
    const setOrDel = (k: string, v?: string) => {
      if (v) p.set(k, v);
      else p.delete(k);
    };

    setOrDel("search", search || undefined);
    setOrDel("entityStatus", status !== ALL ? status : undefined);
    setOrDel("type", type !== ALL ? type : undefined);
    p.set("page", "1");

    router.replace(`${pathname}?${p.toString()}`);
  };

  const reset = () => {
    router.replace(`${pathname}`);
  };

  return (
    <div className="flex flex-col xl:flex-row justify-between gap-2">
      <div className="relative w-full xl:max-w-xs">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar empresas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="grid grid-cols-2 md:flex md:items-end md:justify-end gap-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full md:w-fit">
            <SelectValue placeholder="Todo el estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Todo el estado</SelectItem>
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="inactive">Inactivo</SelectItem>
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full md:w-fit">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={ALL}>Todos</SelectItem>
            {Object.entries(CompanyTypeLabels).map(([k, v]) => (
              <SelectItem key={k} value={k}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={apply}>Aplicar</Button>

        <Button variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-1" /> Reset
        </Button>
      </div>
    </div>
  );
}
