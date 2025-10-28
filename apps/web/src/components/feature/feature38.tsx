import { Calendar, Clock, Shield, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Feature38 = () => (
  <section className="py-32">
    <div className="container mx-auto max-w-7xl px-4 py-2">
      <div className="flex flex-col-reverse items-center justify-between gap-10 lg:flex-row">
        <div className="lg:max-w-md">
          <span className="flex size-14 items-center justify-center rounded-full bg-accent">
            <Calendar className="size-6 text-primary" />
          </span>
          <h1 className="mt-8 mb-2 text-pretty font-bold text-2xl lg:text-4xl">
            Por que escolher a Agenda Fácil?
          </h1>
          <p className="mb-5 text-muted-foreground">
            Nossa plataforma foi desenvolvida especificamente para simplificar o
            agendamento de serviços contábeis, oferecendo praticidade, segurança
            e eficiência para você e sua empresa.
          </p>
          <Button>Agendar Agora</Button>
          <Separator className="my-7" />
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Calendar className="size-5" />
              <p className="font-bold">Agendamento 24/7 online</p>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-5" />
              <p className="font-bold">Horários flexíveis e disponíveis</p>
            </li>
            <li className="flex items-center gap-3">
              <Shield className="size-5" />
              <p className="font-bold">Dados seguros e protegidos</p>
            </li>
            <li className="flex items-center gap-3">
              <Users className="size-5" />
              <p className="font-bold">Atendimento personalizado</p>
            </li>
          </ul>
        </div>
        <div className="flex max-h-96 w-full items-center justify-center rounded-md bg-linear-to-br from-primary/10 to-primary/5 lg:max-h-none lg:w-1/2">
          <div className="p-8 text-center">
            <Calendar className="mx-auto mb-4 h-24 w-24 text-primary opacity-20" />
            <p className="text-muted-foreground text-sm">
              Serviços contábeis de qualidade
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export { Feature38 };
