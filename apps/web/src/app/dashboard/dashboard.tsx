"use client";
import { Calendar, Clock, Settings, Wrench } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAppointmentsSection } from "./sections/admin-appointments-section";
import { AdminBlockedSlotsSection } from "./sections/admin-blocked-slots-section";
import { AdminServicesSection } from "./sections/admin-services-section";
import { AdminSettingsSection } from "./sections/admin-settings-section";

export default function Dashboard() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-bold text-3xl">Painel Administrativo</h1>
        <p className="mt-2 text-muted-foreground">
          Gerencie serviços, agendamentos e configurações do sistema
        </p>
      </div>

      <Card>
        <Tabs className="w-full" defaultValue="services">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger className="flex items-center gap-2" value="services">
              <Wrench className="h-4 w-4" />
              Serviços
            </TabsTrigger>
            <TabsTrigger
              className="flex items-center gap-2"
              value="appointments"
            >
              <Calendar className="h-4 w-4" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger className="flex items-center gap-2" value="blocked">
              <Clock className="h-4 w-4" />
              Bloqueios
            </TabsTrigger>
            <TabsTrigger className="flex items-center gap-2" value="settings">
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Serviços</CardTitle>
                  <CardDescription>
                    Crie, edite e gerencie os serviços disponíveis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminServicesSection />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Agendamentos</CardTitle>
                  <CardDescription>
                    Visualize e gerencie todos os agendamentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminAppointmentsSection />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blocked">
              <Card>
                <CardHeader>
                  <CardTitle>Horários Bloqueados</CardTitle>
                  <CardDescription>
                    Gerencie horários indisponíveis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminBlockedSlotsSection />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Sistema</CardTitle>
                  <CardDescription>
                    Gerencie as configurações gerais do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminSettingsSection />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
