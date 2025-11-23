import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { PhoneInput } from "./phone-input";
import { Country } from "react-phone-number-input";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  control: any;
  required?: boolean;
  className?: string;
  defaultCountry?: Country;
}

const FormPhone = ({
  name,
  label,
  placeholder,
  control,
  required = false,
  className = "",
  defaultCountry,
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
            <PhoneInput
              placeholder={placeholder}
              {...field}
              defaultCountry={defaultCountry}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormPhone;
