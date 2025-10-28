"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock, DollarSign } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/utils/trpc";

type ServiceSelectProps = {
  value?: number;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

export function ServiceSelect({
  value,
  onValueChange,
  disabled = false,
  placeholder = "Selecione um serviço",
}: ServiceSelectProps) {
  const MINUTES_IN_HOUR = 60;
  const MS_PER_SECOND = 1000;
  const STALE_TIME_MINUTES = 2;
  const STALE_TIME_MS = STALE_TIME_MINUTES * MINUTES_IN_HOUR * MS_PER_SECOND;

  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    ...trpc.service.getAll.queryOptions(),
    staleTime: STALE_TIME_MS,
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error || !services) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>Erro ao carregar serviços</EmptyTitle>
          <EmptyDescription>
            Não foi possível carregar a lista de serviços. Tente novamente.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <button
            className="text-primary text-sm hover:underline"
            onClick={() => window.location.reload()}
            type="button"
          >
            Recarregar página
          </button>
        </EmptyContent>
      </Empty>
    );
  }

  if (services.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>Nenhum serviço disponível</EmptyTitle>
          <EmptyDescription>
            Não há serviços cadastrados no momento.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-2">
      <Select
        disabled={disabled}
        onValueChange={onValueChange}
        value={value?.toString()}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {services.map((service) => (
            <SelectItem key={service.id} value={service.id.toString()}>
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start">
                  <span className="font-medium">{service.name}</span>
                  {service.description && (
                    <span className="text-muted-foreground text-xs">
                      {service.description}
                    </span>
                  )}
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock className="h-3 w-3" />
                    {service.duration}min
                  </div>
                  {service.price && (
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <DollarSign className="h-3 w-3" />
                      R$ {service.price.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
