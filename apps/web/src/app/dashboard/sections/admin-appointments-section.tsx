"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, Mail, Phone, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/utils/trpc";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pendente", variant: "secondary" as const },
  { value: "confirmed", label: "Confirmado", variant: "default" as const },
  { value: "cancelled", label: "Cancelado", variant: "destructive" as const },
  { value: "completed", label: "Concluído", variant: "outline" as const },
];

function getStatusConfig(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];
}

export function AdminAppointmentsSection() {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [editingStatus, setEditingStatus] = useState<number | null>(null);

  const { data: appointments, isLoading } = useQuery({
    ...trpc.appointment.getAll.queryOptions(),
  });

  const updateMutation = useMutation({
    ...trpc.appointment.updateStatus.mutationOptions({
      onSuccess: () => {
        toast.success("Status atualizado com sucesso!");
        setEditingStatus(null);
        queryClient.invalidateQueries({
          queryKey: [["appointment", "getAll"]],
        });
      },
      onError: (error) => {
        toast.error("Erro ao atualizar status", {
          description: error.message,
        });
      },
    }),
  });

  const filteredAppointments = selectedStatus
    ? appointments?.filter((apt) => apt.status === selectedStatus)
    : appointments;

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    updateMutation.mutate({
      id: appointmentId,
      status: newStatus as "pending" | "confirmed" | "cancelled" | "completed",
    });
    setEditingStatus(null);
  };

  if (isLoading) {
    return <div className="py-8 text-center">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Agendamentos</h3>
        <Select
          onValueChange={(value) =>
            setSelectedStatus(value === "all" ? undefined : value)
          }
          value={selectedStatus}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {STATUS_OPTIONS.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Observações</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments?.length === 0 ? (
              <TableRow>
                <TableCell
                  className="py-8 text-center text-muted-foreground"
                  colSpan={7}
                >
                  Nenhum agendamento encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments?.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    {appointment.name}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {appointment.service?.name}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {appointment.service?.duration} min
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(appointment.scheduledAt),
                      "dd/MM/yyyy HH:mm",
                      {
                        locale: ptBR,
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {appointment.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {appointment.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs text-sm">
                      {appointment.notes || (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {editingStatus === appointment.id ? (
                      <Select
                        defaultValue={appointment.status}
                        onValueChange={(value) =>
                          handleStatusChange(appointment.id, value)
                        }
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge
                        className="cursor-pointer"
                        onClick={() => setEditingStatus(appointment.id)}
                        variant={getStatusConfig(appointment.status).variant}
                      >
                        {getStatusConfig(appointment.status).label}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {editingStatus === appointment.id ? (
                        <Button
                          onClick={() => setEditingStatus(null)}
                          size="icon"
                          variant="ghost"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setEditingStatus(appointment.id)}
                          size="icon"
                          variant="ghost"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
