import Link from "next/link";
import { Button } from "@/components/ui/button";

type Cta12Props = {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
};

const Cta12 = ({
  heading = "Pronto para Agendar?",
  description = "Não perca mais tempo com burocracias. Agende seus serviços contábeis de forma rápida e prática. Nossa equipe especializada está pronta para atender você!",
  buttons = {
    primary: {
      text: "Agendar Agora",
      url: "/agendar",
    },
    secondary: {
      text: "Falar no WhatsApp",
      url: "https://wa.me/5519958711160",
    },
  },
}: Cta12Props) => {
  const isExternalUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://");

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-7xl px-4 py-2">
        <div className="rounded-lg bg-accent p-8 md:rounded-xl lg:p-12">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="mb-4 font-semibold text-3xl md:text-5xl lg:mb-6 lg:text-6xl">
              {heading}
            </h3>
            <p className="mb-8 font-medium text-lg text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              {buttons.primary &&
                (isExternalUrl(buttons.primary.url) ? (
                  <Button asChild className="w-full sm:w-auto" size="lg">
                    <a href={buttons.primary.url}>{buttons.primary.text}</a>
                  </Button>
                ) : (
                  <Button asChild className="w-full sm:w-auto" size="lg">
                    <Link href={buttons.primary.url as any}>
                      {buttons.primary.text}
                    </Link>
                  </Button>
                ))}
              {buttons.secondary && (
                <Button
                  asChild
                  className="w-full sm:w-auto"
                  size="lg"
                  variant="outline"
                >
                  <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta12 };
