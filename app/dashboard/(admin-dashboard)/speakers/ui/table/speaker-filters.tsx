"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RotateCcw, Search } from "lucide-react";
import { useState } from "react";

export function SpeakerFilters() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(sp.get("search") ?? "");
  const [status, setStatus] = useState(sp.get("status") ?? "");

  const apply = () => {
    const p = new URLSearchParams(sp.toString());
    const setOrDel = (k: string, v?: string) => (v ? p.set(k, v) : p.delete(k));

    setOrDel("search", search || undefined);
    setOrDel("entityStatus", status || undefined);
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
          placeholder="Nombre, empresa, especialidad…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="grid grid-cols-2 md:flex md:items-end md:justify-end gap-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="inactive">Inactivo</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={apply} className="cursor-pointer">
          Aplicar
        </Button>

        <Button variant="outline" onClick={reset} className="cursor-pointer">
          <RotateCcw className="h-4 w-4 mr-1" /> Reset
        </Button>
      </div>
    </div>
  );
}
