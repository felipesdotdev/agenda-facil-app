"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Calendar,
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AppointmentSummary } from "@/components/scheduling/appointment-summary";
import { ServiceSelect } from "@/components/scheduling/service-select";
import { TimeSlotCard } from "@/components/scheduling/time-slot-card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  formatDateForAPI,
  formatTimeSlot,
  isFuture,
  isWeekday,
} from "@/lib/date-utils";
import { isValidPhone, maskPhone } from "@/lib/phone-mask";
import { trpc } from "@/utils/trpc";

// Schema de validação
const appointmentSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .refine((phone) => isValidPhone(phone), "Telefone inválido"),
  serviceId: z.number().positive("Selecione um serviço"),
  scheduledAt: z.string().min(1, "Selecione um horário"),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export default function AgendarPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<
    number | undefined
  >();

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceId: undefined,
      scheduledAt: "",
      notes: "",
    },
  });

  const STALE_TIME_MS = 2 * 60 * 1000; // 2 minutos

  // Queries
  const { data: services } = useQuery({
    ...trpc.service.getAll.queryOptions(),
    staleTime: STALE_TIME_MS,
  });

  const { data: availableSlots, isLoading: slotsLoading } = useQuery({
    ...trpc.appointment.getAvailableSlots.queryOptions({
      date: selectedDate?.toISOString() || "",
      serviceId: selectedServiceId || 1,
    }),
    enabled: !!selectedDate && !!selectedServiceId && selectedServiceId > 0,
  });

  // Mutations
  const createAppointmentMutation = useMutation(
    trpc.appointment.create.mutationOptions({
      onSuccess: (data) => {
        toast.success("Agendamento confirmado!", {
          description: "Você receberá um email de confirmação em breve.",
        });
        // A rota retorna o objeto com o ID
        const appointmentId = data?.id;
        if (appointmentId) {
          router.push(`/agendar/sucesso?id=${appointmentId}`);
        }
      },
      onError: (error) => {
        const message = error instanceof Error ? error.message : String(error);
        toast.error("Erro ao agendar", {
          description: message || "Tente novamente em alguns instantes.",
        });
      },
    })
  );

  // Handlers
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    form.setValue("scheduledAt", "");
  };

  const handleTimeSlotSelect = (slot: {
    start: string;
    end: string;
    duration: number;
  }) => {
    setSelectedTimeSlot(slot.start);
    form.setValue("scheduledAt", slot.start);
  };

  const handleServiceChange = (serviceId: string) => {
    const id = Number.parseInt(serviceId, 10);
    setSelectedServiceId(id);
    form.setValue("serviceId", id);
    setSelectedTimeSlot(null);
    form.setValue("scheduledAt", "");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskPhone(e.target.value);
    form.setValue("phone", masked);
  };

  const onSubmit = (data: AppointmentFormData) => {
    if (!selectedTimeSlot) {
      toast.error("Selecione um horário");
      return;
    }

    createAppointmentMutation.mutate({
      ...data,
      scheduledAt: formatDateForAPI(selectedTimeSlot),
    });
  };

  const selectedService = services?.find((s) => s.id === selectedServiceId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="font-bold text-3xl">Agendar Consulta</h1>
            <p className="mt-2 text-muted-foreground">
              Escolha uma data e horário para sua consulta contábil
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Sidebar - Calendário e Informações */}
          <div className="space-y-6 lg:col-span-1">
            {/* Calendário */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Escolha a Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  className="rounded-md border"
                  disabled={(date: Date) =>
                    !(isWeekday(date) && isFuture(date))
                  }
                  mode="single"
                  onSelect={handleDateSelect}
                  selected={selectedDate}
                />
                <p className="mt-4 text-muted-foreground text-sm">
                  Apenas dias úteis (segunda a sexta)
                </p>
              </CardContent>
            </Card>

            {/* Informações do Escritório */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">+55 (19) 95871-1160</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">contato@felipes.dev</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Seg - Sex: 8h às 18h</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo Principal */}
          <div className="space-y-6 lg:col-span-2">
            {/* Seleção de Serviço */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Escolha o Serviço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ServiceSelect
                  onValueChange={handleServiceChange}
                  placeholder="Selecione um serviço para continuar"
                  value={selectedServiceId}
                />
              </CardContent>
            </Card>

            {/* Grid de Horários */}
            {selectedDate && selectedServiceId && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Horários Disponíveis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {slotsLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Spinner className="h-8 w-8" />
                      <p className="mt-2 text-muted-foreground text-sm">
                        Buscando horários...
                      </p>
                    </div>
                  ) : availableSlots && availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {availableSlots.map((slot, index) => (
                        <TimeSlotCard
                          duration={slot.duration}
                          key={index}
                          onClick={() => handleTimeSlotSelect(slot)}
                          selected={selectedTimeSlot === slot.start}
                          time={formatTimeSlot(
                            new Date(slot.start),
                            new Date(slot.end)
                          )}
                        />
                      ))}
                    </div>
                  ) : (
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <Clock className="h-8 w-8 text-muted-foreground" />
                        </EmptyMedia>
                        <EmptyTitle>Nenhum horário disponível</EmptyTitle>
                        <EmptyDescription>
                          Não há horários disponíveis neste dia. Tente escolher
                          outra data.
                        </EmptyDescription>
                      </EmptyHeader>
                      <EmptyContent>
                        <Button
                          onClick={() => setSelectedDate(undefined)}
                          variant="outline"
                        >
                          Escolher outra data
                        </Button>
                      </EmptyContent>
                    </Empty>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Formulário de Agendamento */}
            {selectedTimeSlot && selectedService && (
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Agendamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          {...form.register("name")}
                          placeholder="Seu nome completo"
                        />
                        {form.formState.errors.name && (
                          <p className="mt-1 text-red-600 text-sm">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          placeholder="seu@email.com"
                        />
                        {form.formState.errors.email && (
                          <p className="mt-1 text-red-600 text-sm">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          {...form.register("phone")}
                          onChange={handlePhoneChange}
                          placeholder="+55 (19) 95871-1160"
                        />
                        {form.formState.errors.phone && (
                          <p className="mt-1 text-red-600 text-sm">
                            {form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Serviço Selecionado</Label>
                        <div className="flex h-10 items-center rounded-md border bg-muted px-3 text-sm">
                          {selectedService.name} ({selectedService.duration}min)
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea
                        id="notes"
                        {...form.register("notes")}
                        placeholder="Alguma observação especial..."
                        rows={3}
                      />
                    </div>

                    {/* Resumo do Agendamento */}
                    <AppointmentSummary
                      email={form.watch("email") || ""}
                      name={form.watch("name") || ""}
                      notes={form.watch("notes")}
                      phone={form.watch("phone") || ""}
                      scheduledAt={selectedDate!}
                      serviceDuration={selectedService.duration}
                      serviceName={selectedService.name}
                      showStatus={false}
                    />

                    <Button
                      className="w-full"
                      disabled={createAppointmentMutation.isPending}
                      type="submit"
                    >
                      {createAppointmentMutation.isPending ? (
                        <>
                          <Spinner className="mr-2 h-4 w-4" />
                          Confirmando...
                        </>
                      ) : (
                        "Confirmar Agendamento"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
