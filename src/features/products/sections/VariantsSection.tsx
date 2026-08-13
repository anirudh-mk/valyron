import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Info,
  GripVertical,
  Trash2,
  Plus,
  ArrowUpDown,
  RefreshCw,
  SlidersHorizontal,
  MoreHorizontal,
  IndianRupee,
  Pencil,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group.tsx";
import {Alert, AlertAction, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";

interface Attribute {
  id: string;
  name: string;
  values: string[];
}

interface Variant {
  id: string;
  name: string;
  sku: string;
  sellingPrice: string;
  purchaseCost: string;
  stock: number;
  warehouseCount: number;
  status: "Active" | "Inactive";
}

export default function VariantsSection() {
  const [variantsEnabled, setVariantsEnabled] = useState(true);
  const [attributes, setAttributes] = useState<Attribute[]>([
    {id: "attr-1", name: "Color", values: ["Space Gray", "Silver"]},
    {id: "attr-2", name: "Storage", values: ["256GB", "512GB", "1TB"]},
  ]);

  const [generatedVariants, setGeneratedVariants] = useState<Variant[]>([
    {
      id: "var-1",
      name: "Space Gray / 256GB",
      sku: "MBP-M3-14-SG-256",
      sellingPrice: "1,99,900.00",
      purchaseCost: "1,65,000.00",
      stock: 12,
      warehouseCount: 1,
      status: "Active",
    },
    {
      id: "var-2",
      name: "Space Gray / 512GB",
      sku: "MBP-M3-14-SG-512",
      sellingPrice: "2,19,900.00",
      purchaseCost: "1,80,000.00",
      stock: 8,
      warehouseCount: 1,
      status: "Active",
    },
    {
      id: "var-3",
      name: "Space Gray / 1TB",
      sku: "MBP-M3-14-SG-1TB",
      sellingPrice: "2,39,900.00",
      purchaseCost: "1,95,000.00",
      stock: 5,
      warehouseCount: 1,
      status: "Active",
    },
    {
      id: "var-4",
      name: "Silver / 256GB",
      sku: "MBP-M3-14-SL-256",
      sellingPrice: "1,99,900.00",
      purchaseCost: "1,65,000.00",
      stock: 10,
      warehouseCount: 1,
      status: "Active",
    },
    {
      id: "var-5",
      name: "Silver / 512GB",
      sku: "MBP-M3-14-SL-512",
      sellingPrice: "2,19,900.00",
      purchaseCost: "1,80,000.00",
      stock: 6,
      warehouseCount: 1,
      status: "Active",
    },
    {
      id: "var-6",
      name: "Silver / 1TB",
      sku: "MBP-M3-14-SL-1TB",
      sellingPrice: "2,39,900.00",
      purchaseCost: "2,35,000.00",
      stock: 4,
      warehouseCount: 1,
      status: "Active",
    },
  ]);

  const handleAddAttribute = () => {
    const nextId = `attr-${attributes.length + 1}`;
    setAttributes([...attributes, {id: nextId, name: "New Attribute", values: []}]);
  };

  const handleDeleteAttribute = (id: string) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
  };

  const handleAddValue = (attrId: string) => {
    const valueName = prompt("Enter attribute value:");
    if (!valueName) return;
    setAttributes(
      attributes.map((attr) =>
        attr.id === attrId ? {...attr, values: [...attr.values, valueName]} : attr
      )
    );
  };

  const handleDeleteVariant = (id: string) => {
    setGeneratedVariants(generatedVariants.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Enable Variants Alert Bar */}
      <Alert className="flex items-center justify-between gap-4 p-3.5 border-blue-100 bg-blue-50/50 text-blue-800 dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-200">
        <div className="flex items-center gap-2.5">
          <Info className="size-4 shrink-0 text-blue-600 dark:text-blue-400"/>
          <div>
            <AlertTitle className="sr-only">Product Variants</AlertTitle>
            <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
              Variants allow you to manage different options (e.g. Color, Storage) for this product.
            </AlertDescription>
          </div>
        </div>
        <AlertAction className="static translate-y-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground select-none whitespace-nowrap">
              Enable Variants
            </span>
            <Switch checked={variantsEnabled} onCheckedChange={setVariantsEnabled}/>
          </div>
        </AlertAction>
      </Alert>

      {variantsEnabled && (
        <Card>
          <CardHeader>
            <CardTitle>Variant Attributes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Reorder button */}
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <ArrowUpDown className="size-3.5"/>
              Reorder Attributes
            </Button>

            {/* Attribute rows */}
            <div className="space-y-3">
              {attributes.map((attr) => (
                <div key={attr.id} className="flex items-center gap-3 p-3 border border-border rounded-lg bg-muted/20">
                  <GripVertical className="size-4 shrink-0 cursor-grab text-muted-foreground hover:text-foreground"/>

                  <div className="w-[140px] shrink-0">
                    <Input
                      defaultValue={attr.name}
                      className="h-8 text-xs font-semibold"
                      onChange={(e) =>
                        setAttributes(attributes.map((a) =>
                          a.id === attr.id ? {...a, name: e.target.value} : a
                        ))
                      }
                    />
                  </div>

                  <div className="flex-1 flex flex-wrap items-center gap-1.5">
                    {attr.values.map((val, idx) => (
                      <Badge key={idx} variant="secondary" className="h-6 px-2.5 py-0.5 text-xs gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"/>
                        {val}
                      </Badge>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 px-2 text-xs border-dashed gap-1"
                      onClick={() => handleAddValue(attr.id)}
                    >
                      <Plus className="size-3"/>
                      Add Value
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteAttribute(attr.id)}
                  >
                    <Trash2 className="size-3.5"/>
                  </Button>
                </div>
              ))}
            </div>

            {/* Add Attribute */}
            <Button
              variant="outline"
              className="w-full h-9 gap-1.5 border-dashed text-xs text-muted-foreground hover:text-foreground"
              onClick={handleAddAttribute}
            >
              <Plus className="size-4"/>
              Add Attribute
            </Button>

            {/* Generated Variants */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold">
                    Generated Variants ({generatedVariants.length})
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Variants are generated from the combination of attributes.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                    <RefreshCw className="size-3.5"/>
                    Generate Variants
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                    <SlidersHorizontal className="size-3.5"/>
                    Bulk Edit
                  </Button>
                </div>
              </div>

              {/* Shadcn Table */}
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead className="px-4 py-3 text-xs">Variant</TableHead>
                      <TableHead className="px-4 py-3 text-xs">SKU</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Selling Price</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Purchase Cost</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Stock</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Status</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generatedVariants.map((variant) => (
                      <TableRow key={variant.id} className="hover:bg-muted/10">
                        {/* Variant Name */}
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-slate-600 to-slate-900 flex items-center justify-center text-[10px] font-bold text-white shrink-0 border border-border/50">
                              MB
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-foreground leading-normal">
                                {variant.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground leading-normal">
                                MacBook Pro M3 14"
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* SKU */}
                        <TableCell className="px-4 py-3">
                          <Input
                            defaultValue={variant.sku}
                            className="h-8 max-w-[150px] text-xs bg-muted/40"
                            onChange={(e) =>
                              setGeneratedVariants(generatedVariants.map((v) =>
                                v.id === variant.id ? {...v, sku: e.target.value} : v
                              ))
                            }
                          />
                        </TableCell>

                        {/* Selling Price */}
                        <TableCell className="px-4 py-3">
                          <InputGroup className="h-8 max-w-[120px]">
                            <InputGroupAddon align="inline-start">
                              <InputGroupText>
                                <IndianRupee className="size-3"/>
                              </InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput defaultValue={variant.sellingPrice} className="text-xs"/>
                          </InputGroup>
                        </TableCell>

                        {/* Purchase Cost */}
                        <TableCell className="px-4 py-3">
                          <InputGroup className="h-8 max-w-[120px]">
                            <InputGroupAddon align="inline-start">
                              <InputGroupText>
                                <IndianRupee className="size-3"/>
                              </InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput defaultValue={variant.purchaseCost} className="text-xs"/>
                          </InputGroup>
                        </TableCell>

                        {/* Stock */}
                        <TableCell className="px-4 py-3">
                          <p className="text-xs font-semibold text-foreground leading-none">
                            {variant.stock}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">
                            in {variant.warehouseCount} WH
                          </p>
                        </TableCell>

                        {/* Status */}
                        <TableCell className="px-4 py-3">
                          <Badge
                            variant="secondary"
                            className="text-[10px] bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800 font-medium"
                          >
                            {variant.status}
                          </Badge>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="px-4 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                <MoreHorizontal className="size-4"/>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Pencil className="size-3.5"/>
                                Edit Variant
                              </DropdownMenuItem>
                              <DropdownMenuSeparator/>
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => handleDeleteVariant(variant.id)}
                              >
                                <Trash2 className="size-3.5"/>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <p className="text-xs text-muted-foreground pl-1">
                Showing 1 to {generatedVariants.length} of {generatedVariants.length} variants
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
