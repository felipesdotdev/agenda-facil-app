"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlotCardProps {
  time: string;
  duration: number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function TimeSlotCard({
  time,
  duration,
  selected = false,
  disabled = false,
  onClick,
}: TimeSlotCardProps) {
  return (
    <button
      className={cn(
        "group relative flex h-16 w-full flex-col items-center justify-center rounded-lg border-2 border-border bg-card p-3 text-center transition-all duration-200 hover:border-primary hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        selected && "border-primary bg-primary/10 ring-2 ring-primary/20",
        disabled && "cursor-not-allowed opacity-50"
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium text-sm">{time}</span>
      </div>
      <span className="text-muted-foreground text-xs">{duration}min</span>

      {selected && (
        <div className="-top-1 -right-1 absolute h-3 w-3 rounded-full bg-primary" />
      )}
    </button>
  );
}
