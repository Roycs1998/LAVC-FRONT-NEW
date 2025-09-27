"use client";

import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
};

export function EmptyState({
  title = "Nada por aquí aún",
  description = "Aún no hay registros para mostrar.",
  actionLabel,
  onAction,
  icon,
}: Props) {
  return (
    <div className="rounded-lg border p-10 text-center space-y-3">
      <div className="mx-auto w-10 h-10 flex items-center justify-center">
        {icon ?? <span className="text-2xl">🗂️</span>}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      {actionLabel && onAction ? (
        <Button onClick={onAction}>{actionLabel}</Button>
      ) : null}
    </div>
  );
}
