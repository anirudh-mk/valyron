import {useState} from "react";
import {Card} from "@/components/ui/card.tsx";
import {
  Field,
  FieldLabel,
} from "@/components/ui/field.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {
  IndianRupee,
  Plus,
  Star,
  Trash2,
  MoreHorizontal,
  Tag,
} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";

interface PriceLevel {
  id: number;
  name: string;
  sellingPrice: string;
  margin: string;
  isDefault: boolean;
}

const defaultPriceLevels: PriceLevel[] = [
  {id: 1, name: "Retail Price (Default)", sellingPrice: "1,999.00", margin: "17.6%", isDefault: true},
  {id: 2, name: "Wholesale Price", sellingPrice: "1,850.00", margin: "12.1%", isDefault: false},
  {id: 3, name: "Dealer Price", sellingPrice: "1,780.00", margin: "7.9%", isDefault: false},
  {id: 4, name: "VIP Price", sellingPrice: "1,700.00", margin: "3.0%", isDefault: false},
];

export default function PricingSection() {
  const [priceInclusive, setPriceInclusive] = useState(false);
  const [priceLevels, setPriceLevels] = useState<PriceLevel[]>(defaultPriceLevels);

  const handleDeletePriceLevel = (id: number) => {
    setPriceLevels((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Card className="p-6 gap-4">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
          <Tag className="size-4"/>
        </div>
        <h2 className="text-base font-semibold">Pricing</h2>
      </div>

      {/* Row 1: Selling Price, Purchase Cost, MRP, Profit Margin */}
      <div className="grid grid-cols-4 gap-4">
        {/* Selling Price */}
        <Field>
          <FieldLabel htmlFor="selling-price">
            Selling Price
            <span className="text-destructive">*</span>
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <IndianRupee className="size-3.5"/>
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="selling-price"
              type="number"
              placeholder="0.00"
              defaultValue="1999.00"
            />
          </InputGroup>
        </Field>

        {/* Purchase Cost */}
        <Field>
          <FieldLabel htmlFor="purchase-cost">
            Purchase Cost
            <span className="text-destructive">*</span>
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <IndianRupee className="size-3.5"/>
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="purchase-cost"
              type="number"
              placeholder="0.00"
              defaultValue="1650.00"
            />
          </InputGroup>
        </Field>

        {/* MRP */}
        <Field>
          <FieldLabel htmlFor="mrp">MRP (Optional)</FieldLabel>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <IndianRupee className="size-3.5"/>
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="mrp"
              type="number"
              placeholder="0.00"
              defaultValue="2199.00"
            />
          </InputGroup>
        </Field>

        {/* Profit Margin */}
        <Field>
          <FieldLabel htmlFor="profit-margin">Profit Margin</FieldLabel>
          <div
            id="profit-margin"
            className="flex h-9 w-full items-center justify-center rounded-sm bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 px-3 text-sm font-semibold text-green-700 dark:text-green-400"
          >
            17.6%
          </div>
        </Field>
      </div>

      {/* Row 2: Tax & Tax Type & Price Inclusive Toggle */}
      <div className="grid grid-cols-[180px_220px_1fr] gap-4 items-end">
        {/* Tax */}
        <Field>
          <FieldLabel htmlFor="tax">Tax</FieldLabel>
          <Select defaultValue="gst18">
            <SelectTrigger id="tax">
              <SelectValue placeholder="Select Tax"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="gst0">GST 0%</SelectItem>
                <SelectItem value="gst5">GST 5%</SelectItem>
                <SelectItem value="gst12">GST 12%</SelectItem>
                <SelectItem value="gst18">GST 18%</SelectItem>
                <SelectItem value="gst28">GST 28%</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {/* Tax Type */}
        <Field>
          <FieldLabel htmlFor="tax-type">Tax Type</FieldLabel>
          <Select defaultValue="exclusive">
            <SelectTrigger id="tax-type">
              <SelectValue placeholder="Select Tax Type"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="exclusive">Exclusive</SelectItem>
                <SelectItem value="inclusive">Inclusive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {/* Price Inclusive of Tax */}
        <Field orientation="horizontal" className="h-9 items-center pb-0">
          <Switch
            id="price-inclusive-tax"
            checked={priceInclusive}
            onCheckedChange={setPriceInclusive}
          />
          <FieldLabel htmlFor="price-inclusive-tax" className="mb-0 font-normal text-sm cursor-pointer">
            Price Inclusive of Tax
          </FieldLabel>
        </Field>
      </div>

      <Separator/>

      {/* Price Levels Table */}
      <div className="space-y-3">
        <FieldLabel>Price Levels (Optional)</FieldLabel>

        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
            <tr className="bg-muted/40 border-b border-border">
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Price Level</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Selling Price</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Margin %</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Is Default</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Actions</th>
            </tr>
            </thead>
            <tbody>
            {priceLevels.map((level, idx) => (
              <tr
                key={level.id}
                className={`border-b border-border last:border-b-0 ${idx % 2 === 0 ? "" : "bg-muted/20"}`}
              >
                <td className="px-4 py-2.5 text-sm font-medium">{level.name}</td>
                <td className="px-4 py-2.5">
                  <InputGroup className="h-8 max-w-[140px]">
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>
                        <IndianRupee className="size-3"/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      type="number"
                      defaultValue={level.sellingPrice}
                      className="text-sm"
                    />
                  </InputGroup>
                </td>
                <td className="px-4 py-2.5 text-sm text-muted-foreground">{level.margin}</td>
                <td className="px-4 py-2.5">
                  {level.isDefault ? (
                    <Badge
                      className="gap-1 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800">
                      <Star className="size-3 fill-amber-500 text-amber-500"/>
                      Default
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">–</span>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                      <MoreHorizontal className="size-4"/>
                    </Button>
                    {!level.isDefault && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeletePriceLevel(level.id)}
                      >
                        <Trash2 className="size-4"/>
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Add Price Level */}
        <Button variant="outline" className="w-full gap-2 border-dashed text-muted-foreground hover:text-foreground">
          <Plus className="size-4"/>
          Add Price Level
        </Button>
      </div>
    </Card>
  );
}