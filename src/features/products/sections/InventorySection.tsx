import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/card.tsx";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/base/field.tsx";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/base/combobox.tsx";
import { Switch } from "@/components/base/switch.tsx";
import { Input } from "@/components/base/input.tsx";
import { Warehouse } from "lucide-react";

const INVENTORY_UNIT_OPTIONS = ["Piece", "Box", "KG", "Litre", "Meter"] as const;
const WAREHOUSE_OPTIONS = ["Main Warehouse", "Secondary Warehouse", "Store"] as const;

export default function InventorySection() {
  const [trackInventory, setTrackInventory] = useState(true);
  const [allowNegativeStock, setAllowNegativeStock] = useState(false);
  const [stockExpiryTracking, setStockExpiryTracking] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-0">
        <span className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
          <Warehouse className="size-4" />
        </span>
        <CardTitle className="text-sm">Inventory</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-12 gap-4">

          {/* Track Inventory Toggle */}
          <Field orientation="horizontal" className="col-span-12">
            <Switch
              id="inventory-track"
              checked={trackInventory}
              onCheckedChange={setTrackInventory}
            />
            <FieldContent>
              <FieldLabel htmlFor="inventory-track" className="font-medium cursor-pointer">
                Track Inventory
              </FieldLabel>
              <FieldDescription>
                Enable if you want to track stock for this product.
              </FieldDescription>
            </FieldContent>
          </Field>

          {/* Initial Stock */}
          <Field className="col-span-6">
            <FieldLabel htmlFor="initial-stock">Initial Stock</FieldLabel>
            <Input
              id="initial-stock"
              type="number"
              placeholder="0"
              defaultValue="25"
              disabled={!trackInventory}
            />
          </Field>

          {/* Stock Update Date */}
          <Field className="col-span-6">
            <FieldLabel htmlFor="stock-update-date">Stock Update Date</FieldLabel>
            <Input
              id="stock-update-date"
              type="date"
              defaultValue="2024-05-24"
              disabled={!trackInventory}
            />
          </Field>

          {/* Inventory Unit */}
          <Field className="col-span-4">
            <FieldLabel htmlFor="inventory-unit">Inventory Unit</FieldLabel>
            <Combobox items={INVENTORY_UNIT_OPTIONS} disabled={!trackInventory}>
              <ComboboxInput id="inventory-unit" placeholder="Select Unit" />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          {/* Default Warehouse */}
          <Field className="col-span-4">
            <FieldLabel htmlFor="default-warehouse">Default Warehouse</FieldLabel>
            <Combobox items={WAREHOUSE_OPTIONS} disabled={!trackInventory}>
              <ComboboxInput id="default-warehouse" placeholder="Select Warehouse" />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          {/* SKU in Warehouse */}
          <Field className="col-span-4">
            <FieldLabel htmlFor="sku-warehouse">SKU in Warehouse (Optional)</FieldLabel>
            <Input
              id="sku-warehouse"
              placeholder="Enter SKU in warehouse"
              disabled={!trackInventory}
            />
          </Field>

          <p className="text-sm font-semibold text-primary col-span-12">Stock Settings</p>

          <Field className="col-span-3">
            <FieldLabel htmlFor="reorder-point">Reorder Point</FieldLabel>
            <Input
              id="reorder-point"
              type="number"
              placeholder="0"
              defaultValue="10"
              disabled={!trackInventory}
            />
            <FieldDescription>Stock level at which you will be notified.</FieldDescription>
          </Field>

          <Field className="col-span-3">
            <FieldLabel htmlFor="reorder-qty">Reorder Quantity</FieldLabel>
            <Input
              id="reorder-qty"
              type="number"
              placeholder="0"
              defaultValue="50"
              disabled={!trackInventory}
            />
            <FieldDescription>Quantity to reorder when stock reaches reorder point.</FieldDescription>
          </Field>

          <Field className="col-span-3">
            <FieldLabel htmlFor="allow-negative-stock">Allow Negative Stock</FieldLabel>
            <Switch
              id="allow-negative-stock"
              checked={allowNegativeStock}
              onCheckedChange={setAllowNegativeStock}
              disabled={!trackInventory}
            />
            <FieldDescription>Allow stock to go below zero.</FieldDescription>
          </Field>

          <Field className="col-span-3">
            <FieldLabel htmlFor="stock-expiry-tracking">Stock Expiry Tracking</FieldLabel>
            <Switch
              id="stock-expiry-tracking"
              checked={stockExpiryTracking}
              onCheckedChange={setStockExpiryTracking}
              disabled={!trackInventory}
            />
            <FieldDescription>Enable to track expiry date.</FieldDescription>
          </Field>

        </div>
      </CardContent>
    </Card>
  );
}
