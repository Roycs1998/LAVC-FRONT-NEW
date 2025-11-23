import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  control: any;
  required?: boolean;
  className?: string;
}

const FormArea = ({
  name,
  label,
  placeholder,
  description,
  control,
  required = false,
  className = "",
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} rows={3} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormArea;
