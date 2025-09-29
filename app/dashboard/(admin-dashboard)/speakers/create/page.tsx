"use client";

import { SpeakerForm } from "../ui/speaker-form";

export default function NewSpeakerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Nueva exponente</h1>
        <p className="text-sm text-muted-foreground">
          Completa los campos y crea tu exponente.
        </p>
      </div>

      <SpeakerForm mode="create" />
    </div>
  );
}
