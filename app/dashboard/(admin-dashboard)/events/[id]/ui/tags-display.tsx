import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TagsDisplay({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Etiquetas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
