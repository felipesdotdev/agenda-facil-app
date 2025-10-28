import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Phone,
} from "lucide-react";
import type React from "react";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Serviços",
    links: [
      { name: "Declaração de IR", href: "#servicos" },
      { name: "Abertura de Empresa", href: "#servicos" },
      { name: "Consultoria Fiscal", href: "#servicos" },
      { name: "Contabilidade Geral", href: "#servicos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Sobre Nós", href: "#sobre" },
      { name: "Nossa Equipe", href: "#equipe" },
      { name: "Depoimentos", href: "#depoimentos" },
      { name: "Trabalhe Conosco", href: "#carreiras" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { name: "Central de Ajuda", href: "#ajuda" },
      { name: "Contato", href: "#contato" },
      { name: "Agendar Consulta", href: "/agendar" },
      { name: "Política de Privacidade", href: "#privacidade" },
    ],
  },
];

const defaultSocialLinks = [
  {
    icon: <MessageCircle className="size-5" />,
    href: "https://wa.me/5519999999999",
    label: "WhatsApp",
  },
  {
    icon: <Phone className="size-5" />,
    href: "tel:+5519999999999",
    label: "Telefone",
  },
  {
    icon: <Instagram className="size-5" />,
    href: "https://instagram.com/agendafacil",
    label: "Instagram",
  },
  {
    icon: <Facebook className="size-5" />,
    href: "https://facebook.com/agendafacil",
    label: "Facebook",
  },
  {
    icon: <Linkedin className="size-5" />,
    href: "https://linkedin.com/company/agendafacil",
    label: "LinkedIn",
  },
];

const defaultLegalLinks = [
  { name: "Termos de Uso", href: "#termos" },
  { name: "Política de Privacidade", href: "#privacidade" },
];

const Footer7 = ({
  logo = {
    url: "/",
    src: "/favicon.ico",
    alt: "Agenda Fácil",
    title: "Agenda Fácil",
  },
  sections = defaultSections,
  description = "Sistema de agendamento online para serviços contábeis. Simplifique sua vida contábil com praticidade, segurança e eficiência.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2024 Agenda Fácil. Todos os direitos reservados.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4 py-2">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <img
                  alt={logo.alt}
                  className="h-8"
                  src={logo.src}
                  title={logo.title}
                />
              </a>
              <h2 className="font-semibold text-xl">{logo.title}</h2>
            </div>
            <p className="max-w-[70%] text-muted-foreground text-sm">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li className="font-medium hover:text-primary" key={idx}>
                  <a aria-label={social.label} href={social.href}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li
                      className="font-medium hover:text-primary"
                      key={linkIdx}
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 font-medium text-muted-foreground text-xs md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li className="hover:text-primary" key={idx}>
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Footer7 };
