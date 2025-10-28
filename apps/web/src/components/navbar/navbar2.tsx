"use client";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import {
  Building2,
  Calculator,
  Calendar,
  FileText,
  Menu,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar2 = ({
  logo = {
    url: "/",
    src: "/favicon.ico",
    alt: "Agenda Fácil",
    title: "Agenda Fácil",
  },
  menu = [
    { title: "Início", url: "/" },
    {
      title: "Serviços",
      url: "#servicos",
      items: [
        {
          title: "Declaração de IR",
          description: "Declaração completa do Imposto de Renda",
          icon: <FileText className="size-5 shrink-0" />,
          url: "#servicos",
        },
        {
          title: "Abertura de Empresa",
          description: "Processo completo de abertura de empresa",
          icon: <Building2 className="size-5 shrink-0" />,
          url: "#servicos",
        },
        {
          title: "Consultoria Fiscal",
          description: "Consultoria especializada em questões fiscais",
          icon: <Calculator className="size-5 shrink-0" />,
          url: "#servicos",
        },
        {
          title: "Contabilidade Geral",
          description: "Serviços contábeis completos para sua empresa",
          icon: <User className="size-5 shrink-0" />,
          url: "#servicos",
        },
      ],
    },
    {
      title: "Contato",
      url: "#contato",
      items: [
        {
          title: "WhatsApp",
          description: "Fale conosco pelo WhatsApp",
          icon: <MessageCircle className="size-5 shrink-0" />,
          url: "https://wa.me/5519999999999",
        },
        {
          title: "Telefone",
          description: "Ligue para (19) 99999-9999",
          icon: <Phone className="size-5 shrink-0" />,
          url: "tel:+5519999999999",
        },
        {
          title: "Endereço",
          description: "Rua das Flores, 123 - Piracicaba/SP",
          icon: <Building2 className="size-5 shrink-0" />,
          url: "#contato",
        },
        {
          title: "Horário",
          description: "Seg-Sex, 8h-18h",
          icon: <Calendar className="size-5 shrink-0" />,
          url: "#contato",
        },
      ],
    },
    { title: "Sobre", url: "#sobre" },
  ],
  auth = {
    login: { title: "Entrar", url: "/login" },
    signup: { title: "Agendar", url: "/agendar" },
  },
}: Navbar2Props) => {
  return (
    <section className="py-4">
      <div className="container mx-auto max-w-9xl px-4 py-2">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          {/* Logo */}
          <Link className="flex items-center gap-2" href={logo.url as any}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg tracking-tighter">
              {logo.title}
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <NavigationMenuWithoutViewport>
                <NavigationMenuList className="relative">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenuWithoutViewport>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href={auth.login.url as any}>{auth.login.title}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url as any}>{auth.signup.title}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link className="flex items-center gap-2" href={logo.url as any}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Calendar className="h-5 w-5" />
              </div>
              <span className="font-semibold text-lg tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      className="flex items-center gap-2"
                      href={logo.url as any}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <span className="font-semibold text-lg tracking-tighter">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    className="flex w-full flex-col gap-4"
                    collapsible
                    type="single"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link href={auth.login.url as any}>
                        {auth.login.title}
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url as any}>
                        {auth.signup.title}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:-translate-x-1/2 relative top-11 w-full origin-top-center overflow-hidden rounded-md border bg-background shadow data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[state=closed]:animate-out data-[state=open]:animate-in md:absolute md:left-1/2 md:w-80">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild className="w-full" key={subItem.title}>
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-muted hover:text-accent-foreground"
          href={item.url as any}
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem className="border-b-0" key={item.title} value={item.title}>
        <AccordionTrigger className="py-0 font-semibold text-md hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink item={subItem} key={subItem.title} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      className="font-semibold text-md"
      href={item.url as any}
      key={item.title}
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => (
  <Link
    className="flex select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
    href={item.url as any}
  >
    <div className="text-muted-foreground">{item.icon}</div>
    <div>
      <div className="font-semibold text-sm">{item.title}</div>
      {item.description && (
        <p className="text-muted-foreground text-sm leading-snug">
          {item.description}
        </p>
      )}
    </div>
  </Link>
);

const NavigationMenuWithoutViewport = ({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) => {
  return (
    <NavigationMenuPrimitive.Root
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      data-slot="navigation-menu"
      data-viewport={viewport}
      {...props}
    >
      {children}
      {/* The Viewport needs to be removed to center align submenus under their parents. You could remove this from the shadcn/ui component */}
      {/* {viewport && <NavigationMenuViewport />} */}
    </NavigationMenuPrimitive.Root>
  );
};

export { Navbar2 };
