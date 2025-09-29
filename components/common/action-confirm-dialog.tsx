"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { clientApi } from "@/lib/axios/client";

type HttpMethod = "POST" | "PUT" | "PATCH" | "DELETE";

export type ActionConfirmDialogProps = {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?:
    | "default"
    | "destructive"
    | "secondary"
    | "outline"
    | "ghost"
    | "link";
  url: string;
  method?: HttpMethod;
  payload?: Record<string, any>;
  buildPayload?: () => Record<string, any> | Promise<Record<string, any>>;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (responseData: any) => void;
  onError?: (error: any) => void;
  autoCloseOnSuccess?: boolean;
  highlight?: React.ReactNode;
  entityId?: string | number;
};

export function ActionConfirmDialog({
  open,
  onOpenChange,
  title = "Confirmar acción",
  description = "Esta acción no se puede deshacer.",
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  confirmVariant = "destructive",
  url,
  method = "PATCH",
  payload,
  buildPayload,
  query,
  headers,
  successMessage = "Acción realizada correctamente",
  errorMessage = "Ocurrió un error al ejecutar la acción",
  onSuccess,
  onError,
  autoCloseOnSuccess = true,
  highlight,
  entityId,
}: ActionConfirmDialogProps) {
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const api = await clientApi();
      const finalUrl = appendQueryParams(url, query);

      const body = buildPayload
        ? await buildPayload()
        : payload ?? { id: entityId };

      const { data } = await api.request({
        url: finalUrl,
        method,
        data: ["POST", "PUT", "PATCH"].includes(method) ? body : undefined,
        headers,
      });

      toast.success(successMessage);
      onSuccess?.(data);

      if (autoCloseOnSuccess) {
        onOpenChange(false);
      }
    } catch (err: any) {
      const apiMessage =
        err?.response?.data?.message || err?.message || errorMessage;
      toast.error(apiMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => (!loading ? onOpenChange(v) : null)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {highlight && (
          <div className="rounded-md border p-3 text-sm">{highlight}</div>
        )}

        <DialogFooter className="gap-2">
          <DialogClose asChild disabled={loading}>
            <Button variant="outline" className="cursor-pointer">
              {cancelLabel}
            </Button>
          </DialogClose>

          <Button
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={loading}
            className="cursor-pointer"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function appendQueryParams(
  baseUrl: string,
  query?: Record<string, string | number | boolean | undefined>
) {
  if (!query) return baseUrl;
  const url = new URL(
    baseUrl,
    typeof window !== "undefined" ? window.location.origin : "http://localhost"
  );
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });

  return baseUrl.startsWith("http")
    ? url.toString()
    : `${url.pathname}${url.search}`;
}
