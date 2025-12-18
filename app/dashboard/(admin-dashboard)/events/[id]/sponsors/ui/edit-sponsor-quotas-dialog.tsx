"use client";

import { useState } from "react";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  UpdateSponsorFormData,
  updateSponsorSchema,
  SponsorClient,
} from "@/modules/sponsor";
import { EventSponsor } from "@/modules/sponsor/types";

interface EditSponsorQuotasDialogProps {
  sponsor: EventSponsor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditSponsorQuotasDialog({
  sponsor,
  open,
  onOpenChange,
}: EditSponsorQuotasDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateSponsorFormData>({
    resolver: zodResolver(updateSponsorSchema),
    defaultValues: {
      staffQuota: sponsor.staffQuota,
      guestQuota: sponsor.guestQuota,
      scholarshipQuota: sponsor.scholarshipQuota,
      isActive: sponsor.isActive,
    },
  });

  const onSubmit = async (data: UpdateSponsorFormData) => {
    setIsLoading(true);
    try {
      await SponsorClient.updateSponsor(sponsor.eventId, sponsor.id, data);
      toast.success("Cuotas actualizadas exitosamente");
      router.refresh();
      onOpenChange(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al actualizar cuotas";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Cuotas</DialogTitle>
          <DialogDescription>
            Actualiza las cuotas de participación para{" "}
            <strong>{sponsor.company.name}</strong>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="staffQuota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuota de Staff</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={sponsor.staffUsed}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Usados: {sponsor.staffUsed} / {sponsor.staffQuota}
                  </FormDescription>
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
                      min={sponsor.guestUsed}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Usados: {sponsor.guestUsed} / {sponsor.guestQuota}
                  </FormDescription>
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
                      min={sponsor.scholarshipUsed}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Usados: {sponsor.scholarshipUsed} /{" "}
                    {sponsor.scholarshipQuota}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Estado Activo</FormLabel>
                    <FormDescription>
                      Desactiva el sponsor para evitar nuevos registros
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

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
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
