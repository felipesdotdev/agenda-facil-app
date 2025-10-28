"use client";

import {
  Building2,
  Calculator,
  FileText,
  Phone,
  Shield,
  Users,
} from "lucide-react";

const Service6 = () => {
  const services = [
    {
      icon: FileText,
      title: "Declaração de Imposto de Renda",
    },
    {
      icon: Building2,
      title: "Abertura de Empresa",
    },
    {
      icon: Calculator,
      title: "Consultoria Fiscal",
    },
    {
      icon: Users,
      title: "Contabilidade Geral",
    },
    {
      icon: Shield,
      title: "Compliance e Regularização",
    },
    {
      icon: Phone,
      title: "Atendimento Personalizado",
    },
  ];

  const stats = [
    {
      icon: Users,
      title: "500+",
      description: "Clientes atendidos",
    },
    {
      icon: FileText,
      title: "10+",
      description: "Anos de experiência",
    },
    {
      icon: Shield,
      title: "100%",
      description: "Satisfação garantida",
    },
  ];

  const relatedServices = [
    {
      icon: FileText,
      title: "Declaração de IR",
      description: "Declaração completa do Imposto de Renda",
      link: "#servicos",
    },
    {
      icon: Building2,
      title: "Abertura de Empresa",
      description: "Processo completo de abertura de empresa",
      link: "#servicos",
    },
    {
      icon: Calculator,
      title: "Consultoria Fiscal",
      description: "Consultoria especializada em questões fiscais",
      link: "#servicos",
    },
    {
      icon: Users,
      title: "Contabilidade Geral",
      description: "Serviços contábeis completos",
      link: "#servicos",
    },
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-3xl px-4 py-2">
        {/* Icon and Intro */}
        <div className="mb-12 space-y-8 text-center">
          <div className="flex justify-center">
            <div className="rounded-lg bg-primary/10 p-4">
              <Calculator className="h-12 w-12 text-primary" />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="font-medium text-4xl tracking-tight md:text-5xl lg:text-6xl">
              Nossos Serviços Contábeis
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Oferecemos uma gama completa de serviços contábeis para atender às
              necessidades da sua empresa. Nossa equipe especializada garante
              conformidade fiscal, eficiência operacional e suporte
              personalizado para o crescimento do seu negócio.
            </p>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center font-semibold text-2xl tracking-tight md:text-3xl">
            Nossa Experiência
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  className="rounded-lg bg-muted/50 p-6 text-center"
                  key={index}
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-sm">{stat.title}</div>
                    <div className="text-muted-foreground text-xs">
                      {stat.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-sm dark:prose-invert mx-auto mb-16 max-w-none space-y-6">
          <h2 className="font-medium text-2xl tracking-tight md:text-3xl">
            Serviços Especializados para seu Negócio
          </h2>
          <p>
            Nossa equipe de contadores especializados oferece soluções completas
            para todas as necessidades contábeis e fiscais da sua empresa,
            garantindo conformidade e eficiência operacional.
          </p>

          <p>
            Com anos de experiência no mercado, desenvolvemos processos
            otimizados que reduzem a burocracia e aceleram o crescimento do seu
            negócio. Nossa abordagem personalizada garante que cada cliente
            receba o atendimento adequado às suas necessidades específicas.
          </p>

          <p>
            Utilizamos tecnologia de ponta e ferramentas modernas para garantir
            precisão, segurança e agilidade em todos os nossos serviços. Nossa
            infraestrutura robusta suporta empresas de todos os portes.
          </p>

          <p>
            Mantemos atualização constante com as mudanças na legislação fiscal,
            garantindo que sua empresa esteja sempre em conformidade com as
            obrigações legais e aproveitando todas as oportunidades de economia.
          </p>

          <p>
            Nossa metodologia de trabalho inclui acompanhamento contínuo,
            relatórios detalhados e suporte especializado para tomada de
            decisões estratégicas.
          </p>

          <h2 className="font-medium text-2xl tracking-tight md:text-3xl">
            Nossos Serviços Contábeis
          </h2>
          <div className="space-y-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div className="flex items-center gap-3" key={index}>
                  <Icon className="h-5 w-5 text-primary" />
                  <span>{service.title}</span>
                </div>
              );
            })}
          </div>

          <h2 className="font-medium text-2xl tracking-tight md:text-3xl">
            Excelência Contábil para o Sucesso do seu Negócio
          </h2>
          <p>
            Nossa filosofia de trabalho está centrada em oferecer soluções
            contábeis que impulsionam o crescimento e a sustentabilidade do seu
            negócio. Entendemos que a contabilidade vai além dos números—é sobre
            criar estratégias que geram resultados.
          </p>

          <p>
            Desde a abertura da empresa até a declaração de impostos, garantimos
            que cada serviço contribua para a saúde financeira e o crescimento
            sustentável do seu negócio. Nossos processos são otimizados para
            eficiência, precisão e conformidade em todas as operações.
          </p>
        </div>

        {/* Related Services */}
        <div className="rounded-lg">
          <h2 className="mb-8 text-center font-semibold text-2xl tracking-tight md:text-3xl">
            Serviços Relacionados
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {relatedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div className="group rounded-lg bg-muted/50" key={index}>
                  <a
                    className="block space-y-2 rounded-lg p-6 transition-colors hover:bg-muted"
                    href={service.link}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                      <div className="font-medium text-lg group-hover:text-primary">
                        {service.title}
                      </div>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {service.description}
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Service6 };
