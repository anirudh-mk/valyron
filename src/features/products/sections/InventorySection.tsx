import { useState } from "react";
import { Card } from "@/components/ui/card.tsx";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Warehouse } from "lucide-react";

export default function InventorySection() {
  const [trackInventory, setTrackInventory] = useState(true);
  const [allowNegativeStock, setAllowNegativeStock] = useState(false);
  const [stockExpiryTracking, setStockExpiryTracking] = useState(false);

  return (
    <Card className="p-6 gap-6 flex flex-col">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
          <Warehouse className="size-4" />
        </div>
        <h2 className="text-base font-semibold">Inventory</h2>
      </div>

      {/* Track Inventory Toggle */}
      <Field orientation="horizontal" className="items-start">
        <Switch
          id="inventory-track"
          checked={trackInventory}
          onCheckedChange={setTrackInventory}
        />
        <div className="flex flex-col gap-0.5">
          <FieldLabel htmlFor="inventory-track" className="font-medium cursor-pointer">
            Track Inventory
          </FieldLabel>
          <FieldDescription>
            Enable if you want to track stock for this product.
          </FieldDescription>
        </div>
      </Field>

      {/* Row 1: Initial Stock, Stock Update Date */}
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="initial-stock">Initial Stock</FieldLabel>
          <Input
            id="initial-stock"
            type="number"
            placeholder="0"
            defaultValue="25"
            disabled={!trackInventory}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="stock-update-date">Stock Update Date</FieldLabel>
          <Input
            id="stock-update-date"
            type="date"
            defaultValue="2024-05-24"
            disabled={!trackInventory}
          />
        </Field>
      </div>

      {/* Row 2: Inventory Unit, Default Warehouse, SKU in Warehouse */}
      <div className="grid grid-cols-3 gap-4">
        <Field>
          <FieldLabel htmlFor="inventory-unit">Inventory Unit</FieldLabel>
          <Select defaultValue="piece">
            <SelectTrigger id="inventory-unit" disabled={!trackInventory}>
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="piece">Piece</SelectItem>
                <SelectItem value="box">Box</SelectItem>
                <SelectItem value="kg">KG</SelectItem>
                <SelectItem value="ltr">Litre</SelectItem>
                <SelectItem value="mtr">Meter</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="default-warehouse">Default Warehouse</FieldLabel>
          <Select defaultValue="main">
            <SelectTrigger id="default-warehouse" disabled={!trackInventory}>
              <SelectValue placeholder="Select Warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="main">Main Warehouse</SelectItem>
                <SelectItem value="secondary">Secondary Warehouse</SelectItem>
                <SelectItem value="store">Store</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="sku-warehouse">SKU in Warehouse (Optional)</FieldLabel>
          <Input
            id="sku-warehouse"
            placeholder="Enter SKU in warehouse"
            disabled={!trackInventory}
          />
        </Field>
      </div>

      {/* Stock Settings */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-primary">Stock Settings</p>

        <div className="grid grid-cols-4 gap-4">
          {/* Reorder Point */}
          <Field>
            <FieldLabel htmlFor="reorder-point">Reorder Point</FieldLabel>
            <Input
              id="reorder-point"
              type="number"
              placeholder="0"
              defaultValue="10"
              disabled={!trackInventory}
            />
            <FieldDescription>
              Stock level at which you will be notified.
            </FieldDescription>
          </Field>

          {/* Reorder Quantity */}
          <Field>
            <FieldLabel htmlFor="reorder-qty">Reorder Quantity</FieldLabel>
            <Input
              id="reorder-qty"
              type="number"
              placeholder="0"
              defaultValue="50"
              disabled={!trackInventory}
            />
            <FieldDescription>
              Quantity to reorder when stock reaches reorder point.
            </FieldDescription>
          </Field>

          {/* Allow Negative Stock */}
          <Field>
            <FieldLabel htmlFor="allow-negative-stock">Allow Negative Stock</FieldLabel>
            <div className="h-9 flex items-center">
              <Switch
                id="allow-negative-stock"
                checked={allowNegativeStock}
                onCheckedChange={setAllowNegativeStock}
                disabled={!trackInventory}
              />
            </div>
            <FieldDescription>
              Allow stock to go below zero.
            </FieldDescription>
          </Field>

          {/* Stock Expiry Tracking */}
          <Field>
            <FieldLabel htmlFor="stock-expiry-tracking">Stock Expiry Tracking</FieldLabel>
            <div className="h-9 flex items-center">
              <Switch
                id="stock-expiry-tracking"
                checked={stockExpiryTracking}
                onCheckedChange={setStockExpiryTracking}
                disabled={!trackInventory}
              />
            </div>
            <FieldDescription>
              Enable to track expiry date.
            </FieldDescription>
          </Field>
        </div>
      </div>
    </Card>
  );
}
