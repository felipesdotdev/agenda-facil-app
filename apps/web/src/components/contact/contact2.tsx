import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

const Contact2 = ({
  title = "Entre em Contato",
  description = "Estamos disponíveis para esclarecer dúvidas, fornecer orçamentos ou agendar consultas. Entre em contato conosco e descubra como podemos ajudar sua empresa!",
  phone = "(19) 99999-9999",
  email = "contato@agendafacil.com.br",
  web = { label: "agendafacil.com.br", url: "https://agendafacil.com.br" },
}: Contact2Props) => (
  <section className="py-32">
    <div className="container mx-auto max-w-7xl px-4 py-2">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
        <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
          <div className="text-center lg:text-left">
            <h1 className="mb-2 font-semibold text-5xl lg:mb-1 lg:text-6xl">
              {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="mx-auto w-fit lg:mx-0">
            <h3 className="mb-6 text-center font-semibold text-2xl lg:text-left">
              Informações de Contato
            </h3>
            <ul className="ml-4 list-disc">
              <li>
                <span className="font-bold">Telefone: </span>
                {phone}
              </li>
              <li>
                <span className="font-bold">Email: </span>
                <a className="underline" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
              <li>
                <span className="font-bold">Website: </span>
                <a className="underline" href={web.url} target="_blank">
                  {web.label}
                </a>
              </li>
              <li>
                <span className="font-bold">Endereço: </span>
                Rua das Flores, 123 - Piracicaba/SP
              </li>
              <li>
                <span className="font-bold">Horário: </span>
                Seg-Sex, 8h-18h
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border p-10">
          <div className="flex gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="firstname">Nome</Label>
              <Input id="firstname" placeholder="Seu nome" type="text" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="lastname">Sobrenome</Label>
              <Input id="lastname" placeholder="Seu sobrenome" type="text" />
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="seu@email.com" type="email" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="subject">Assunto</Label>
            <Input
              id="subject"
              placeholder="Qual serviço você precisa?"
              type="text"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              placeholder="Descreva sua necessidade ou dúvida..."
            />
          </div>
          <Button className="w-full">Enviar Mensagem</Button>
        </div>
      </div>
    </div>
  </section>
);

export { Contact2 };
