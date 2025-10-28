"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AppointmentSummary } from "@/components/scheduling/appointment-summary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";

import { trpc } from "@/utils/trpc";

function SucessoPageContent() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("id");

  const {
    data: appointment,
    isLoading,
    error,
  } = useQuery({
    ...trpc.appointment.getById.queryOptions({
      id: Number.parseInt(appointmentId || "0", 10),
    }),
    enabled: !!appointmentId,
  });

  if (!appointmentId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>Agendamento não encontrado</EmptyTitle>
            <EmptyDescription>
              Não foi possível encontrar o agendamento. Verifique o link ou
              tente novamente.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href="/agendar">Fazer novo agendamento</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="pt-4">
                  <Skeleton className="h-10 w-32" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>Erro ao carregar agendamento</EmptyTitle>
            <EmptyDescription>
              Não foi possível carregar os dados do agendamento. Tente
              novamente.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button onClick={() => window.location.reload()}>
                Tentar novamente
              </Button>
              <Button asChild variant="outline">
                <Link href="/agendar">Fazer novo agendamento</Link>
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  const whatsappMessage = `Olá! Gostaria de confirmar meu agendamento para ${appointment.service?.name} em ${new Date(appointment.scheduledAt).toLocaleDateString("pt-BR")} às ${new Date(appointment.scheduledAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}.`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header de Sucesso */}
      <div className="border-green-200 border-b bg-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="font-bold text-3xl text-green-900">
              Agendamento Confirmado!
            </h1>
            <p className="mt-2 text-green-700">
              Sua consulta foi agendada com sucesso. Você receberá um email de
              confirmação em breve.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Resumo do Agendamento */}
          <AppointmentSummary
            email={appointment.email}
            name={appointment.name}
            notes={appointment.notes ?? undefined}
            phone={appointment.phone}
            scheduledAt={new Date(appointment.scheduledAt)}
            serviceDuration={appointment.service?.duration || 0}
            serviceName={appointment.service?.name || ""}
            showStatus={true}
            status={
              appointment.status as
                | "pending"
                | "confirmed"
                | "cancelled"
                | "completed"
            }
          />

          {/* Informações Importantes */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <h4 className="font-medium text-blue-900">Próximos Passos</h4>
                <ul className="mt-2 space-y-1 text-blue-800 text-sm">
                  <li>• Você receberá um email de confirmação em breve</li>
                  <li>• Chegue com 10 minutos de antecedência</li>
                  <li>• Traga documentos necessários para o serviço</li>
                  <li>• Em caso de dúvidas, entre em contato conosco</li>
                </ul>
              </div>

              <div className="rounded-lg bg-yellow-50 p-4">
                <h4 className="font-medium text-yellow-900">Cancelamento</h4>
                <p className="mt-1 text-sm text-yellow-800">
                  Se precisar cancelar ou remarcar, entre em contato conosco com
                  pelo menos 24h de antecedência.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para início
              </Link>
            </Button>

            <Button
              className="flex-1"
              onClick={() => {
                const whatsappUrl = `https://wa.me/5519999999999?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, "_blank");
              }}
              variant="outline"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </div>

          {/* Link para novo agendamento */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Precisa de outro serviço?{" "}
              <Link className="text-primary hover:underline" href="/agendar">
                Faça um novo agendamento
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SucessoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-2xl">
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="pt-4">
                    <Skeleton className="h-10 w-32" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      }
    >
      <SucessoPageContent />
    </Suspense>
  );
}
