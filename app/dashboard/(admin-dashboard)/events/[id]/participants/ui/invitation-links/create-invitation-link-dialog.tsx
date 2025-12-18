"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Copy, Check, Infinity, Hash, User } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { SponsorClient } from "@/modules/sponsor";
import { EventSponsor } from "@/modules/sponsor/types";
import { UserRole } from "@/modules/user";

const createInvitationLinkSchema = z.object({
  sponsorId: z.string().min(1, "Selecciona un sponsor"),
  participantType: z.enum([
    "staff",
    "guest",
    "scholarship",
    "regular",
    "operational_staff",
  ]),
  usageType: z.enum(["single", "multiple", "unlimited"]),
  maxUses: z.number().min(1).optional(),
  expiresAt: z.string().optional(),
});

type CreateInvitationLinkFormData = z.infer<typeof createInvitationLinkSchema>;

interface CreateInvitationLinkDialogProps {
  eventId: string;
  sponsors: EventSponsor[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateInvitationLinkDialog({
  eventId,
  sponsors,
  open,
  onOpenChange,
}: CreateInvitationLinkDialogProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isPlatformAdmin = session?.user?.roles.includes(
    UserRole.PLATFORM_ADMIN
  );
  const isCompanyAdmin = session?.user?.roles.includes(UserRole.COMPANY_ADMIN);
  const userCompanyId = session?.user?.company?.id;

  // Filter sponsors based on user role
  const availableSponsors = isPlatformAdmin
    ? sponsors
    : sponsors.filter((s) => s.company.id === userCompanyId);

  const form = useForm<CreateInvitationLinkFormData>({
    resolver: zodResolver(createInvitationLinkSchema),
    defaultValues: {
      sponsorId: availableSponsors.length === 1 ? availableSponsors[0].id : "",
      participantType: "guest",
      usageType: "multiple",
      maxUses: 10,
      expiresAt: undefined,
    },
  });

  const usageType = form.watch("usageType");

  useEffect(() => {
    if (open && availableSponsors.length === 1) {
      form.setValue("sponsorId", availableSponsors[0].id);
    }
  }, [open, availableSponsors, form]);

  const onSubmit = async (data: CreateInvitationLinkFormData) => {
    setIsLoading(true);
    try {
      const payload = {
        participantType: data.participantType,
        usageType: data.usageType,
        maxUses:
          data.usageType === "single"
            ? 1
            : data.usageType === "unlimited"
            ? 999999
            : data.maxUses || 10,
        expiresAt: data.expiresAt,
      };

      const link = await SponsorClient.createInvitationLink(
        eventId,
        data.sponsorId,
        payload
      );
      const fullUrl = `${window.location.origin}/register?code=${link.code}`;
      setGeneratedLink(fullUrl);
      toast.success("Enlace de invitación creado exitosamente");
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al crear enlace de invitación";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (generatedLink) {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      toast.success("Enlace copiado al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setGeneratedLink(null);
    form.reset();
    onOpenChange(false);
  };

  if (availableSponsors.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>No hay sponsors disponibles</DialogTitle>
            <DialogDescription>
              {isCompanyAdmin
                ? "Tu empresa aún no está registrada como sponsor de este evento."
                : "No hay sponsors registrados para este evento."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generar Enlace de Invitación</DialogTitle>
          <DialogDescription>
            {isCompanyAdmin && availableSponsors.length === 1
              ? `Crea un enlace de invitación para ${availableSponsors[0].company.name}`
              : "Crea un enlace de invitación para un sponsor"}
          </DialogDescription>
        </DialogHeader>

        {!generatedLink ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Sponsor Selection - Only show if platform admin or multiple sponsors */}
              {(isPlatformAdmin || availableSponsors.length > 1) && (
                <FormField
                  control={form.control}
                  name="sponsorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sponsor</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un sponsor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableSponsors.map((sponsor) => (
                            <SelectItem key={sponsor.id} value={sponsor.id}>
                              {sponsor.company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Empresa que patrocina este enlace de invitación
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Invitation Type */}
              <FormField
                control={form.control}
                name="participantType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Invitación</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="staff">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Staff del Sponsor</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="guest">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Invitado</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="scholarship">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Beca</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Define qué tipo de participante puede usar este enlace
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Usage Type */}
              <FormField
                control={form.control}
                name="usageType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Límite de Uso</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        className="grid grid-cols-1 gap-4"
                      >
                        <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent cursor-pointer">
                          <RadioGroupItem value="single" id="single" />
                          <Label
                            htmlFor="single"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span className="font-medium">Un solo uso</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              El enlace solo puede ser usado una vez
                            </p>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent cursor-pointer">
                          <RadioGroupItem value="multiple" id="multiple" />
                          <Label
                            htmlFor="multiple"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Hash className="h-4 w-4" />
                              <span className="font-medium">Uso limitado</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Define un número máximo de usos
                            </p>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent cursor-pointer">
                          <RadioGroupItem value="unlimited" id="unlimited" />
                          <Label
                            htmlFor="unlimited"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Infinity className="h-4 w-4" />
                              <span className="font-medium">Uso ilimitado</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Sin límite de usos (hasta que expire o se
                              desactive)
                            </p>
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Max Uses - Only show if multiple */}
              {usageType === "multiple" && (
                <FormField
                  control={form.control}
                  name="maxUses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número Máximo de Usos</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={1000}
                          placeholder="10"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 10)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Cuántas personas pueden usar este enlace (1-1000)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Expiration Date */}
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Expiración (Opcional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP", {
                                locale: es,
                              })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      El enlace dejará de funcionar después de esta fecha
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Generando..." : "Generar Enlace"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted p-4">
              <p className="text-sm font-medium mb-2">
                ✅ Enlace de Invitación Generado:
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-background px-3 py-2 text-sm break-all">
                  {generatedLink}
                </code>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-900">
                <strong>Importante:</strong> Comparte este enlace con las
                personas que deseas invitar.
                {usageType === "single" && " El enlace es válido para 1 uso."}
                {usageType === "multiple" &&
                  ` El enlace es válido para ${form.getValues(
                    "maxUses"
                  )} usos.`}
                {usageType === "unlimited" &&
                  " El enlace tiene usos ilimitados."}
              </p>
            </div>

            <DialogFooter>
              <Button onClick={handleClose}>Cerrar</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
