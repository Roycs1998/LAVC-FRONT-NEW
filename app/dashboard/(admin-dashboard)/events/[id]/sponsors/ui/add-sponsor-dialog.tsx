"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreateSponsorFormData,
  createSponsorSchema,
  SponsorClient,
} from "@/modules/sponsor";

import { CompaniesClient } from "@/modules/company/client";

interface AddSponsorDialogProps {
  eventId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSponsorDialog({
  eventId,
  open,
  onOpenChange,
}: AddSponsorDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const form = useForm<CreateSponsorFormData>({
    resolver: zodResolver(createSponsorSchema),
    defaultValues: {
      companyId: "",
      staffQuota: 0,
      guestQuota: 0,
      scholarshipQuota: 0,
    },
  });

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await CompaniesClient.list({ limit: 100 });
        setCompanies(data.data);
      } catch (error) {
        toast.error("Error al cargar empresas");
      }
    };
    if (open) {
      loadCompanies();
    }
  }, [open]);

  const onSubmit = async (data: CreateSponsorFormData) => {
    setIsLoading(true);
    try {
      await SponsorClient.addSponsor(eventId, data);
      toast.success("Sponsor agregado exitosamente");
      router.refresh();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al agregar sponsor";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar Sponsor</DialogTitle>
          <DialogDescription>
            Agrega una empresa como sponsor del evento
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una empresa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="staffQuota"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuota de Staff</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guestQuota"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuota de Invitados</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scholarshipQuota"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuota de Becas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Agregar Sponsor"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
