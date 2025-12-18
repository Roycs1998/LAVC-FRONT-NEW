"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EventWithTicketsFormInput,
  eventWithTicketsSchema,
} from "@/modules/event/schema";
import {
  EventLocationType,
  EventStatus,
  EventType,
  EventsClient,
  Event,
  CreateEventRequest,
} from "@/modules/event";
import { TicketType, TicketTypeClient } from "@/modules/ticket-type";
import { BasicInfoStep } from "./basic-info-step";
import { ScheduleStep } from "./schedule-step";
import { RegistrationStep } from "./registration-step";
import { TicketsStep } from "./tickets-step";
import { WizardFooter } from "./wizard-footer";

type StepType = "basic" | "schedule" | "registration" | "tickets";

async function manageTickets(
  eventId: string,
  newTickets: EventWithTicketsFormInput["tickets"],
  initialTickets: TicketType[]
) {
  const initialTicketIds = new Set(initialTickets.map((t) => t.id));
  const newTicketIds = new Set(
    newTickets.filter((t) => t.id).map((t) => t.id!)
  );

  const ticketsToCreate = newTickets.filter((t) => !t.id);
  for (const ticket of ticketsToCreate) {
    await TicketTypeClient.createTicketType(eventId, {
      name: ticket.name,
      description: ticket.description,
      currency: ticket.currency,
      quantity: ticket.quantity,
      ticketStatus: ticket.ticketStatus,
      saleStartDate: ticket.saleStartDate?.toISOString(),
      saleEndDate: ticket.saleEndDate?.toISOString(),
      price: ticket.price,
      pricingTiers: ticket.pricingTiers?.map((tier) => ({
        name: tier.name,
        price: tier.price,
        startDate: tier.startDate.toISOString(),
        endDate: tier.endDate.toISOString(),
        isActive: tier.isActive,
      })),
      restrictions: ticket.restrictions,
      access: ticket.access,
    });
  }

  // Update existing tickets
  const ticketsToUpdate = newTickets.filter(
    (t) => t.id && initialTicketIds.has(t.id)
  );
  for (const ticket of ticketsToUpdate) {
    await TicketTypeClient.updateTicketType(ticket.id!, {
      name: ticket.name,
      description: ticket.description,
      currency: ticket.currency,
      quantity: ticket.quantity,
      ticketStatus: ticket.ticketStatus,
      saleStartDate: ticket.saleStartDate?.toISOString(),
      saleEndDate: ticket.saleEndDate?.toISOString(),
      price: ticket.price,
      pricingTiers: ticket.pricingTiers?.map((tier) => ({
        name: tier.name,
        price: tier.price,
        startDate: tier.startDate.toISOString(),
        endDate: tier.endDate.toISOString(),
        isActive: tier.isActive,
      })),
      restrictions: ticket.restrictions,
      access: ticket.access,
    });
  }

  // Delete removed tickets
  const ticketsToDelete = initialTickets.filter((t) => !newTicketIds.has(t.id));
  for (const ticket of ticketsToDelete) {
    await TicketTypeClient.deleteTicketType(eventId, ticket.id);
  }
}

interface EventWizardProps {
  eventId?: string;
  initialData?: Event;
  initialTickets?: TicketType[];
}

function eventToFormData(
  event?: Event,
  tickets?: TicketType[]
): EventWithTicketsFormInput {
  if (!event) {
    return {
      event: {
        title: "",
        description: "",
        shortDescription: "",
        companyId: "",
        type: EventType.CONFERENCE,
        eventStatus: EventStatus.DRAFT,
        startDate: new Date(),
        endDate: new Date(),
        timezone: "America/Lima",
        isAllDay: false,
        location: {
          type: EventLocationType.PHYSICAL,
          venue: "",
          address: {
            street: "",
            city: "",
            state: "",
            country: "Perú",
            zipCode: "",
          },
          capacity: undefined,
        },
        registration: {
          isOpen: true,
          requiresApproval: false,
          maxAttendeesPerRegistration: 1,
          waitlistEnabled: false,
        },
        settings: {
          isPrivate: false,
          requiresInvitation: false,
        },
        tags: [],
        categories: [],
        slug: "",
      },
      tickets: [],
    };
  }

  return {
    event: {
      title: event.title,
      description: event.description,
      shortDescription: event.shortDescription,
      companyId: event.company?.id || "",
      type: event.type,
      eventStatus:
        event.eventStatus == EventStatus.REJECTED
          ? EventStatus.PENDING_APPROVAL
          : event.eventStatus,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      timezone: event.timezone,
      isAllDay: event.isAllDay,
      location: event.location,
      registration: {
        ...event.registration,
        opensAt: event.registration.opensAt
          ? new Date(event.registration.opensAt)
          : undefined,
        closesAt: event.registration.closesAt
          ? new Date(event.registration.closesAt)
          : undefined,
      },
      settings: event.settings,
      tags: event.tags || [],
      categories: event.categories || [],
      slug: event.slug,
    },
    tickets:
      tickets?.map((ticket) => ({
        id: ticket.id,
        name: ticket.name,
        description: ticket.description,
        currency: ticket.currency,
        quantity: ticket.quantity,
        ticketStatus: ticket.ticketStatus,
        saleStartDate: ticket.saleStartDate
          ? new Date(ticket.saleStartDate)
          : undefined,
        saleEndDate: ticket.saleEndDate
          ? new Date(ticket.saleEndDate)
          : undefined,
        price: ticket.price,
        pricingTiers: ticket.pricingTiers?.map((tier) => ({
          name: tier.name,
          price: tier.price,
          startDate: new Date(tier.startDate),
          endDate: new Date(tier.endDate),
          isActive: tier.isActive,
        })),
        restrictions: ticket.restrictions,
        access: ticket.access,
      })) || [],
  };
}

function formDataToEventRequest(
  formData: EventWithTicketsFormInput
): Omit<CreateEventRequest, "ticketTypes"> {
  return {
    title: formData.event.title,
    description: formData.event.description || "",
    shortDescription: formData.event.shortDescription,
    companyId: formData.event.companyId,
    type: formData.event.type,
    eventStatus: formData.event.eventStatus,
    startDate: formData.event.startDate.toISOString(),
    endDate: formData.event.endDate.toISOString(),
    timezone: formData.event.timezone || "America/Lima",
    isAllDay: formData.event.isAllDay,
    location: formData.event.location,
    registration: {
      ...formData.event.registration,
      opensAt: formData.event.registration.opensAt?.toISOString(),
      closesAt: formData.event.registration.closesAt?.toISOString(),
    },
    settings: formData.event.settings || {
      isPrivate: false,
      requiresInvitation: false,
    },
    tags: formData.event.tags,
    categories: formData.event.categories,
    slug: formData.event.slug || "",
  };
}

export function EventWizard({
  eventId,
  initialData,
  initialTickets,
}: EventWizardProps = {}) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepType>("basic");
  const [initialTicketsData] = useState(initialTickets || []);

  const isEditing = !!eventId;

  const form = useForm<EventWithTicketsFormInput>({
    resolver: zodResolver(eventWithTicketsSchema) as unknown as any,
    defaultValues: eventToFormData(initialData, initialTickets),
  });

  const onSubmit = form.handleSubmit(
    async (values: EventWithTicketsFormInput) => {
      try {
        if (isEditing) {
          const eventData = formDataToEventRequest(values);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { companyId, ...eventDataWithoutCompanyId } = eventData;
          await EventsClient.update(eventId!, eventDataWithoutCompanyId);

          await manageTickets(
            eventId!,
            values.tickets || [],
            initialTicketsData
          );

          toast.success("Evento actualizado exitosamente");
        } else {
          const eventData = formDataToEventRequest(values);
          const createdEvent = await EventsClient.create(eventData);

          if (values.tickets && values.tickets.length > 0) {
            await manageTickets(createdEvent.id, values.tickets, []);
          }

          toast.success("Evento creado exitosamente");
        }
        router.push("/dashboard/events");
        router.refresh();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error al guardar el evento";
        toast.error(errorMessage);
      }
    }
  );

  const handleCancel = () => {
    router.push("/dashboard/events");
  };

  const goNext = () => {
    setActiveStep((prev) =>
      prev === "basic"
        ? "schedule"
        : prev === "schedule"
        ? "registration"
        : prev === "registration"
        ? "tickets"
        : "tickets"
    );
  };

  const goBack = () => {
    setActiveStep((prev) =>
      prev === "tickets"
        ? "registration"
        : prev === "registration"
        ? "schedule"
        : prev === "schedule"
        ? "basic"
        : "basic"
    );
  };

  const handleTabChange = (value: string) => {
    setActiveStep(value as StepType);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <PageHeader
          title={isEditing ? "Editar Evento" : "Crear Evento"}
          subtitle={
            isEditing
              ? `Editando: ${initialData?.title || "evento"}`
              : "Crea un nuevo evento y configura sus tipos de tickets"
          }
          actions={
            <Button variant="outline" asChild>
              <Link href="/dashboard/events">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a eventos
              </Link>
            </Button>
          }
        />

        <Tabs
          value={activeStep}
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">1. Información</TabsTrigger>
            <TabsTrigger value="schedule">2. Fechas y lugar</TabsTrigger>
            <TabsTrigger value="registration">3. Registro</TabsTrigger>
            <TabsTrigger value="tickets">4. Tickets</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <BasicInfoStep />
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleStep />
          </TabsContent>

          <TabsContent value="registration">
            <RegistrationStep />
          </TabsContent>

          <TabsContent value="tickets">
            <TicketsStep />
          </TabsContent>
        </Tabs>

        <div className="h-20" />

        <WizardFooter
          activeStep={activeStep}
          onBack={goBack}
          onNext={goNext}
          onCancel={handleCancel}
          isEditing={isEditing}
          isSubmitting={form.formState.isSubmitting}
        />
      </form>
    </FormProvider>
  );
}
