import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
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
      attributes.map((attr) => {
        if (attr.id === attrId) {
          return {...attr, values: [...attr.values, valueName]};
        }
        return attr;
      })
    );
  };

  const handleDeleteVariant = (id: string) => {
    setGeneratedVariants(generatedVariants.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Enable Variants Alert Bar */}
      <Alert
        className="flex items-center justify-between gap-4 p-3.5 rounded-lg border border-blue-100 bg-blue-50/50 text-blue-800 dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-200">
        <div className="flex items-center gap-2.5">
          <Info className="size-4 shrink-0 text-blue-600 dark:text-blue-400"/>
          <div>
            <AlertTitle className="sr-only">
              Product Variants
            </AlertTitle>
            <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
              Variants allow you to manage different options (e.g. Color, Storage)
              for this product.
            </AlertDescription>
          </div>
        </div>
        <AlertAction className="static translate-y-0">
          <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground select-none whitespace-nowrap">
            Enable Variants
          </span>
            <Switch
              checked={variantsEnabled}
              onCheckedChange={setVariantsEnabled}
            />
          </div>
        </AlertAction>
      </Alert>


      {variantsEnabled && (
        <>
          {/* Variant Attributes Section */}
          <Card>
            <CardHeader>
              <CardTitle>Variant Attributes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="ghost" size="sm"
                      className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                <ArrowUpDown className="size-3.5"/>
                Reorder Attributes
              </Button>

              <div className="space-y-3">
                {attributes.map((attr) => (
                  <div
                    key={attr.id}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg bg-muted/20"
                  >
                    {/* Grip Handle */}
                    <div className="cursor-grab text-muted-foreground hover:text-foreground">
                      <GripVertical className="size-4"/>
                    </div>

                    {/* Attribute Name Input/Display */}
                    <div className="w-[140px] shrink-0">
                      <Input
                        defaultValue={attr.name}
                        className="h-8 text-xs font-semibold"
                        onChange={(e) => {
                          setAttributes(
                            attributes.map((a) =>
                              a.id === attr.id ? {...a, name: e.target.value} : a
                            )
                          );
                        }}
                      />
                    </div>

                    {/* Badges & Add Button */}
                    <div className="flex-1 flex flex-wrap items-center gap-1.5">
                      {attr.values.map((val, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="h-6 px-2.5 py-0.5 text-xs bg-muted border border-border rounded-md gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"/>
                          {val}
                        </Badge>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 px-2 text-xs border-dashed text-primary hover:text-primary-hover gap-1"
                        onClick={() => handleAddValue(attr.id)}
                      >
                        <Plus className="size-3"/>
                        Add Value
                      </Button>
                    </div>

                    {/* Delete Button */}
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
              {/* Add Attribute Button */}
              <Button
                variant="outline"
                className="w-full h-9 px-3 gap-1.5 border-dashed text-xs text-muted-foreground hover:text-foreground"
                onClick={handleAddAttribute}
              >
                <Plus className="size-4"/>
                Add Attribute
              </Button>

              {/* Generated Variants Table Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold">Generated Variants ({generatedVariants.length})</h2>
                    <p className="text-xs text-muted-foreground">Variants are generated from the combination of
                      attributes.</p>
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

                {/* Variants Table */}
                <div className="rounded-lg border border-border overflow-hidden bg-background">
                  <table className="w-full text-xs text-left">
                    <thead>
                    <tr className="bg-muted/40 border-b border-border text-muted-foreground font-medium">
                      <th className="px-4 py-3 font-medium">Variant</th>
                      <th className="px-4 py-3 font-medium">SKU</th>
                      <th className="px-4 py-3 font-medium">Selling Price</th>
                      <th className="px-4 py-3 font-medium">Purchase Cost</th>
                      <th className="px-4 py-3 font-medium">Stock</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {generatedVariants.map((variant, idx) => (
                      <tr
                        key={variant.id}
                        className={`border-b border-border last:border-b-0 hover:bg-muted/10 ${
                          idx % 2 === 0 ? "" : "bg-muted/5"
                        }`}
                      >
                        {/* Variant Name & Image */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-md bg-gradient-to-br from-slate-600 to-slate-900 flex items-center justify-center text-[10px] font-bold text-white shrink-0 border border-border/50">
                              MB
                            </div>
                            <div>
                              <p className="font-semibold text-foreground leading-normal">{variant.name}</p>
                              <p className="text-[10px] text-muted-foreground leading-normal">MacBook Pro M3 14"</p>
                            </div>
                          </div>
                        </td>

                        {/* SKU Input */}
                        <td className="px-4 py-3">
                          <Input
                            defaultValue={variant.sku}
                            className="h-8 max-w-[150px] text-xs bg-muted/40"
                            onChange={(e) => {
                              setGeneratedVariants(
                                generatedVariants.map((v) =>
                                  v.id === variant.id ? {...v, sku: e.target.value} : v
                                )
                              );
                            }}
                          />
                        </td>

                        {/* Selling Price */}
                        <td className="px-4 py-3">
                          <InputGroup className="h-8 max-w-[120px]">
                            <InputGroupAddon align="inline-start">
                              <InputGroupText>
                                <IndianRupee className="size-3"/>
                              </InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput
                              defaultValue={variant.sellingPrice}
                              className="text-xs"
                            />
                          </InputGroup>
                        </td>

                        {/* Purchase Cost */}
                        <td className="px-4 py-3">
                          <InputGroup className="h-8 max-w-[120px]">
                            <InputGroupAddon align="inline-start">
                              <InputGroupText>
                                <IndianRupee className="size-3"/>
                              </InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput
                              defaultValue={variant.purchaseCost}
                              className="text-xs"
                            />
                          </InputGroup>
                        </td>

                        {/* Stock Info */}
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-semibold text-foreground leading-none">{variant.stock}</p>
                            <p
                              className="text-[10px] text-muted-foreground mt-0.5 leading-none">in {variant.warehouseCount} WH</p>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <Badge
                            variant="secondary"
                            className="text-[10px] bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800 font-medium"
                          >
                            {variant.status}
                          </Badge>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                              <MoreHorizontal className="size-4"/>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteVariant(variant.id)}
                            >
                              <Trash2 className="size-4"/>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-muted-foreground pl-1">
                  Showing 1 to {generatedVariants.length} of {generatedVariants.length} variants
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
