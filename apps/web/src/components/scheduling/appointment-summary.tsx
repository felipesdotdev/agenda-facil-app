"use client";

import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAppointmentDate } from "@/lib/date-utils";
import { formatPhoneDisplay } from "@/lib/phone-mask";

interface AppointmentSummaryProps {
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  serviceDuration: number;
  scheduledAt: Date;
  notes?: string;
  status?: "pending" | "confirmed" | "cancelled" | "completed";
  showStatus?: boolean;
}

export function AppointmentSummary({
  name,
  email,
  phone,
  serviceName,
  serviceDuration,
  scheduledAt,
  notes,
  status = "pending",
  showStatus = true,
}: AppointmentSummaryProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      case "completed":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado";
      case "pending":
        return "Pendente";
      case "cancelled":
        return "Cancelado";
      case "completed":
        return "Concluído";
      default:
        return "Pendente";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Resumo do Agendamento
          </CardTitle>
          {showStatus && (
            <Badge variant={getStatusVariant(status)}>
              {getStatusText(status)}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Data e Hora */}
        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Data e Horário</p>
            <p className="text-muted-foreground text-sm">
              {formatAppointmentDate(scheduledAt)}
            </p>
          </div>
        </div>

        {/* Serviço */}
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Serviço</p>
            <p className="text-muted-foreground text-sm">
              {serviceName} ({serviceDuration} minutos)
            </p>
          </div>
        </div>

        {/* Dados do Cliente */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Nome</p>
              <p className="text-muted-foreground text-sm">{name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground text-sm">{email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Telefone</p>
              <p className="text-muted-foreground text-sm">
                {formatPhoneDisplay(phone)}
              </p>
            </div>
          </div>
        </div>

        {/* Observações */}
        {notes && (
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Observações</p>
              <p className="text-muted-foreground text-sm">{notes}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
