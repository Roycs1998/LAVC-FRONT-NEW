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
import { FormItem, FormLabel } from "@/components/ui/form";

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
    <div className="flex flex-col md:flex-row gap-2 md:items-end">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar empresas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Todo el estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>Todo el estado</SelectItem>
          <SelectItem value="active">Activo</SelectItem>
          <SelectItem value="inactive">Inactivo</SelectItem>
        </SelectContent>
      </Select>

      <Select value={type} onValueChange={setType}>
        <SelectTrigger>
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>Todos</SelectItem>
          <SelectItem value="event_organizer">
            Organizador de eventos
          </SelectItem>
          <SelectItem value="educational">Educativo</SelectItem>
          <SelectItem value="corporate">Corporativo</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Button onClick={apply}>Aplicar</Button>
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-1" /> Reset
        </Button>
      </div>
    </div>
  );
}
