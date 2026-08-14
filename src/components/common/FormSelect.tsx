import type {ReactNode} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/select";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export default function FormSelect({
                                     id,
                                     placeholder = "Select",
                                     options,
                                     value,
                                     onValueChange,
                                   }: FormSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger
        id={id}
        className="flex-1"
      >
        <SelectValue placeholder={placeholder}/>
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}