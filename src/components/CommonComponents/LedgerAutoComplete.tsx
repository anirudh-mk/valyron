// src/components/CommonComponents/LedgerAutoComplete.tsx
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/base/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/base/popover";
import { Button } from "@/components/base/button";
import { Check, ChevronsUpDown, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Ledger {
  id: string | number;
  name: string;
  gstin?: string;
  address?: string;
}

interface LedgerAutoCompleteProps {
  ledgers?: Ledger[];
  onSelect: (ledger: Ledger | null) => void;
  placeholder?: string;
}

export default function LedgerAutoComplete({
  ledgers = [],
  onSelect,
  placeholder = "Search customer...",
}: LedgerAutoCompleteProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState<Ledger | null>(null);

  const mockLedgers: Ledger[] = ledgers.length > 0 ? ledgers : [
    { id: 1, name: "Acme Corporation", gstin: "27AAECA1234A1Z5", address: "Mumbai, India" },
    { id: 2, name: "TechCorp Solutions", gstin: "29AABCU4321B1Z6", address: "Bangalore, India" },
    { id: 3, name: "Global Innovations Ltd", gstin: "06AAECG5678C1Z4", address: "New York, USA" },
  ];

  const filtered = value === ""
    ? mockLedgers
    : mockLedgers.filter((ledger) =>
        ledger.name.toLowerCase().includes(value.toLowerCase())
      );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal text-left"
        >
          {selected ? selected.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      {/* THIS IS THE KEY FIX: disable portal + force mount */}
      <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            value={value}
            onValueChange={setValue}
          />
          <CommandList>
            <CommandEmpty>No customer found.</CommandEmpty>
            <CommandGroup>
              {filtered.map((ledger) => (
                <CommandItem
                  key={ledger.id}
                  value={ledger.name}
                  onSelect={() => {
                    setSelected(ledger);
                    setValue(ledger.name);
                    onSelect(ledger);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.id === ledger.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div>
                    <div className="font-medium">{ledger.name}</div>
                    {ledger.gstin && (
                      <div className="text-xs text-muted-foreground">
                        GSTIN: {ledger.gstin}
                      </div>
                    )}
                  </div>
                </CommandItem>
              ))}
              {value && !filtered.find(l => l.name.toLowerCase() === value.toLowerCase()) && (
                <CommandItem
                  onSelect={() => {
                    const newLedger = { id: "new", name: value, gstin: "", address: "" };
                    setSelected(newLedger);
                    onSelect(newLedger);
                    setOpen(false);
                  }}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create "{value}"
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}