import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/base/card.tsx";
import {Field, FieldLabel} from "@/components/base/field.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/base/input-group.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/select.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/dropdown-menu.tsx";
import {Switch} from "@/components/base/switch.tsx";
import {Button} from "@/components/base/button.tsx";
import {Badge} from "@/components/base/badge.tsx";
import {Separator} from "@/components/base/separator.tsx";
import {
  IndianRupee,
  Plus,
  Star,
  Trash2,
  MoreHorizontal,
  Tag,
  Pencil,
} from "lucide-react";

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
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
            <Tag className="size-4"/>
          </div>
          Pricing
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Row 1: Selling Price, Purchase Cost, MRP, Profit Margin */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
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
          <Field orientation="horizontal" className="col-span-2 self-end h-9 items-center pb-0">
            <Switch
              id="price-inclusive-tax"
              checked={priceInclusive}
              onCheckedChange={setPriceInclusive}
            />
            <FieldLabel htmlFor="price-inclusive-tax" className="mb-0 cursor-pointer font-normal text-sm">
              Price Inclusive of Tax
            </FieldLabel>
          </Field>
        </div>

        <Separator className="my-6"/>

        {/* Price Levels */}
        <div className="space-y-3">
          <FieldLabel>Price Levels (Optional)</FieldLabel>

          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="px-4 py-2.5 text-xs">Price Level</TableHead>
                  <TableHead className="px-4 py-2.5 text-xs">Selling Price</TableHead>
                  <TableHead className="px-4 py-2.5 text-xs">Margin %</TableHead>
                  <TableHead className="px-4 py-2.5 text-xs">Is Default</TableHead>
                  <TableHead className="px-4 py-2.5 text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceLevels.map((level) => (
                  <TableRow key={level.id}>
                    <TableCell className="px-4 py-2.5 text-sm font-medium">
                      {level.name}
                    </TableCell>

                    <TableCell className="px-4 py-2.5">
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
                    </TableCell>

                    <TableCell className="px-4 py-2.5 text-sm text-muted-foreground">
                      {level.margin}
                    </TableCell>

                    <TableCell className="px-4 py-2.5">
                      {level.isDefault ? (
                        <Badge className="gap-1 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800">
                          <Star className="size-3 fill-amber-500 text-amber-500"/>
                          Default
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">–</span>
                      )}
                    </TableCell>

                    <TableCell className="px-4 py-2.5">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                            <MoreHorizontal className="size-4"/>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="size-3.5"/>
                            Edit
                          </DropdownMenuItem>
                          {!level.isDefault && (
                            <>
                              <DropdownMenuSeparator/>
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => handleDeletePriceLevel(level.id)}
                              >
                                <Trash2 className="size-3.5"/>
                                Delete
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Add Price Level */}
          <Button variant="outline" className="w-full gap-2 border-dashed text-muted-foreground hover:text-foreground">
            <Plus className="size-4"/>
            Add Price Level
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}