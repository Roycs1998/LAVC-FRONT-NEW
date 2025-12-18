import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function DescriptionCard({ description }: { description?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Descripción</CardTitle>
        <CardDescription>Información detallada del evento</CardDescription>
      </CardHeader>
      <CardContent>
        {description ? (
          <p className="text-sm leading-7 whitespace-pre-wrap text-muted-foreground">
            {description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Sin descripción disponible
          </p>
        )}
      </CardContent>
    </Card>
  );
}
