import {
  Calendar,
  ChevronDown,
  Filter,
  Search,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/base/card.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/base/input-group.tsx";
import { Button } from "@/components/base/button.tsx";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/base/combobox.tsx";
import { DatePicker } from "@/components/base/date-picker.tsx";

type FilterOption = {
  label: string;
  value: string;
};

type SelectFilter = {
  type: "select";
  key: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
};

type DateFilter = {
  type: "date";
  key: string;
  label: string;
  value?: string | Date;
  onChange?: (value: string) => void;
  onClick?: () => void;
};

type Filter = SelectFilter | DateFilter;

interface FilterBarProps {
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };

  filters?: Filter[];

  onFilterClick?: () => void;
  onSettingsClick?: () => void;

  className?: string;
}

export function FilterBar({
  search,
  filters = [],
  onFilterClick,
  onSettingsClick,
  className,
}: FilterBarProps) {
  return (
    <Card
      className={cn(
        "flex flex-row flex-wrap md:flex-nowrap items-center justify-between p-3 gap-3",
        className
      )}
    >
      {/* Left side */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2.5 flex-1 min-w-0 mr-4">
        {/* Search */}
        {search && (
          <InputGroup className="flex-1 max-w-xs min-w-[180px]">
            <InputGroupInput
              placeholder={search.placeholder || "Search..."}
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        )}

        {/* Filters */}
        {filters.map((filter) => {
          if (filter.type === "select") {
            const currentLabel = filter.options.find(opt => opt.value === filter.value)?.label || "";
            return (
              <Combobox
                key={filter.key}
                value={currentLabel}
                onValueChange={(labelVal) => {
                  const selectedOption = filter.options.find(opt => opt.label === labelVal);
                  if (selectedOption) {
                    filter.onChange(selectedOption.value);
                  }
                }}
                items={filter.options.map(opt => opt.label)}
              >
                <ComboboxInput
                  placeholder={filter.options[0]?.label || "Select..."}
                  className="h-8 text-xs font-semibold text-slate-700 bg-slate-50/50 border border-slate-200 rounded-md max-w-44 focus:bg-white"
                />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item} className="text-xs">
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            );
          }

          if (filter.type === "date") {
            const dateValue = filter.value ? new Date(filter.value) : undefined;
            return (
              <DatePicker
                key={filter.key}
                value={dateValue}
                onChange={(date) => {
                  if (filter.onChange) {
                    filter.onChange(date.toISOString());
                  } else if (filter.onClick) {
                    filter.onClick();
                  }
                }}
                placeholder={filter.label}
              />
            );
          }

          return null;
        })}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Filter Button */}
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={onFilterClick}
          className="bg-slate-50/50 text-slate-500 hover:bg-white hover:text-slate-700 transition-colors"
          aria-label="Filter"
        >
          <Filter className="h-4 w-4" />
        </Button>

        {/* Settings Button */}
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={onSettingsClick}
          className="bg-slate-50/50 text-slate-500 hover:bg-white hover:text-slate-700 transition-colors"
          aria-label="Settings"
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}