import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Hero87 = () => (
  <section className="py-32">
    <div className="container mx-auto max-w-7xl px-4 py-2">
      <h1 className="text-5xl lg:text-7xl">
        Agende seus Serviços Contábeis de Forma Simples e Rápida
      </h1>
      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-lg text-muted-foreground lg:text-xl">
            Simplifique sua vida contábil com nosso sistema de agendamento
            online. Agende consultas, declarações de IR, abertura de empresas e
            outros serviços contábeis de forma prática e organizada. Sem
            complicações, sem filas, apenas eficiência para cuidar do seu
            negócio.
          </p>
          <Button asChild className="mt-12" size="lg">
            <Link href="/agendar">
              Agendar Agora
              <ArrowRight className="ml-2 h-auto w-4" />
            </Link>
          </Button>
        </div>
        <div className="relative flex items-center justify-center overflow-hidden">
          <div className="-top-1 -z-10 absolute inset-0 mx-auto h-full w-full max-w-3xl bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:56px_56px] opacity-15 [mask-image:radial-gradient(ellipse_50%_100%_at_50%_50%,#000_60%,transparent_100%)]" />
          <img
            alt="Agendamento de serviços contábeis"
            className="max-h-[400px]"
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
          />
        </div>
      </div>
    </div>
  </section>
);

export { Hero87 };
