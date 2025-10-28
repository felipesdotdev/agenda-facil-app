"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/utils/trpc";

const DURATION_MIN = 15;
const DURATION_MAX = 480;

export function AdminServicesSection() {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: services, isLoading } = useQuery({
    ...trpc.service.getAll.queryOptions(),
    staleTime: 0,
  });

  const createMutation = useMutation({
    ...trpc.service.create.mutationOptions({
      onSuccess: () => {
        toast.success("Serviço criado com sucesso!");
        setIsCreating(false);
        queryClient.invalidateQueries({ queryKey: [["service", "getAll"]] });
      },
      onError: (error) => {
        toast.error("Erro ao criar serviço", {
          description: error.message,
        });
      },
    }),
  });

  const updateMutation = useMutation({
    ...trpc.service.update.mutationOptions({
      onSuccess: () => {
        toast.success("Serviço atualizado com sucesso!");
        setEditingId(null);
        queryClient.invalidateQueries({ queryKey: [["service", "getAll"]] });
      },
      onError: (error) => {
        toast.error("Erro ao atualizar serviço", {
          description: error.message,
        });
      },
    }),
  });

  const deleteMutation = useMutation({
    ...trpc.service.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Serviço desativado com sucesso!");
        queryClient.invalidateQueries({ queryKey: [["service", "getAll"]] });
      },
      onError: (error) => {
        toast.error("Erro ao desativar serviço", {
          description: error.message,
        });
      },
    }),
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    createMutation.mutate({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      duration: Number(formData.get("duration")),
      price: formData.get("price") ? Number(formData.get("price")) : undefined,
      displayOrder: Number(formData.get("displayOrder") || 0),
    });
  };

  const handleUpdate = (id: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    updateMutation.mutate({
      id,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      duration: Number(formData.get("duration")),
      price: formData.get("price") ? Number(formData.get("price")) : undefined,
      displayOrder: Number(formData.get("displayOrder") || 0),
    });
  };

  if (isLoading) {
    return <div className="py-8 text-center">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Lista de Serviços</h3>
        <Button
          disabled={isCreating}
          onClick={() => setIsCreating(true)}
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Serviço
        </Button>
      </div>

      {isCreating && (
        <div className="rounded-lg border bg-muted/50 p-4">
          <form className="space-y-4" onSubmit={handleCreate}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="create-name">Nome *</Label>
                <Input id="create-name" name="name" required />
              </div>
              <div>
                <Label htmlFor="create-duration">Duração (min) *</Label>
                <Input
                  defaultValue={60}
                  id="create-duration"
                  max={DURATION_MAX}
                  min={DURATION_MIN}
                  name="duration"
                  required
                  type="number"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="create-description">Descrição</Label>
              <Textarea id="create-description" name="description" rows={2} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="create-price">Preço (R$)</Label>
                <Input
                  id="create-price"
                  name="price"
                  step="0.01"
                  type="number"
                />
              </div>
              <div>
                <Label htmlFor="create-order">Ordem de Exibição</Label>
                <Input
                  defaultValue={0}
                  id="create-order"
                  name="displayOrder"
                  type="number"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                disabled={createMutation.isPending}
                size="sm"
                type="submit"
              >
                Salvar
              </Button>
              <Button
                onClick={() => setIsCreating(false)}
                size="sm"
                type="button"
                variant="outline"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Ordem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.length === 0 ? (
              <TableRow>
                <TableCell
                  className="py-8 text-center text-muted-foreground"
                  colSpan={7}
                >
                  Nenhum serviço cadastrado
                </TableCell>
              </TableRow>
            ) : (
              services?.map((service) => (
                <TableRow key={service.id}>
                  {editingId === service.id ? (
                    <TableCell colSpan={7}>
                      <form
                        className="space-y-3"
                        onSubmit={(e) => handleUpdate(service.id, e)}
                      >
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div>
                            <Input
                              defaultValue={service.name}
                              name="name"
                              required
                            />
                          </div>
                          <div>
                            <Input
                              defaultValue={service.duration}
                              max={DURATION_MAX}
                              min={DURATION_MIN}
                              name="duration"
                              required
                              type="number"
                            />
                          </div>
                        </div>
                        <div>
                          <Textarea
                            defaultValue={service.description || ""}
                            name="description"
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div>
                            <Input
                              defaultValue={service.price || ""}
                              name="price"
                              step="0.01"
                              type="number"
                            />
                          </div>
                          <div>
                            <Input
                              defaultValue={service.displayOrder}
                              name="displayOrder"
                              type="number"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            disabled={updateMutation.isPending}
                            size="sm"
                            type="submit"
                          >
                            Salvar
                          </Button>
                          <Button
                            onClick={() => setEditingId(null)}
                            size="sm"
                            type="button"
                            variant="outline"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </form>
                    </TableCell>
                  ) : (
                    <>
                      <TableCell className="font-medium">
                        {service.name}
                      </TableCell>
                      <TableCell>{service.description || "-"}</TableCell>
                      <TableCell>{service.duration} min</TableCell>
                      <TableCell>
                        {service.price ? `R$ ${service.price.toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell>{service.displayOrder}</TableCell>
                      <TableCell>
                        <Checkbox checked={service.active} disabled />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => setEditingId(service.id)}
                            size="icon"
                            variant="ghost"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              const confirmed = window.confirm(
                                "Deseja desativar este serviço?"
                              );
                              if (confirmed) {
                                deleteMutation.mutate({ id: service.id });
                              }
                            }}
                            size="icon"
                            variant="ghost"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
