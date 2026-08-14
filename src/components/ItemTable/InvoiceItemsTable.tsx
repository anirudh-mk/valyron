// src/components/ItemTable/InvoiceItemsTablePro.tsx
import { useState } from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table";
import { Trash2, Plus } from "lucide-react";

export interface InvoiceItem {
  id: string;
  description: string;
  hsnSac: string;
  qty: number;
  rate: number;
  taxRate: number;
  amount: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  hsnSac: string;
  rate: number;
  taxRate: number;
}

const defaultProducts: Product[] = [
  { id: 1, name: "Website Development", description: "Full-stack web app", hsnSac: "998314", rate: 75000, taxRate: 18 },
  { id: 2, name: "Mobile App (React Native)", description: "Cross-platform app", hsnSac: "998314", rate: 120000, taxRate: 18 },
  { id: 3, name: "API Integration", description: "Third-party API setup", hsnSac: "998319", rate: 25000, taxRate: 18 },
  { id: 4, name: "Consulting (per day)", description: "Technical consulting", hsnSac: "998319", rate: 15000, taxRate: 18 },
];

interface InvoiceItemsTableProProps {
  items: InvoiceItem[];
  onItemsChange: (items: InvoiceItem[]) => void;
  currency?: string;
  showTaxColumns?: boolean;
  products?: Product[];
}

const InvoiceItemsTable = ({
  items,
  onItemsChange,
  currency = "INR",
  showTaxColumns = true,
  products = defaultProducts,
}: InvoiceItemsTableProProps) => {
  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      hsnSac: "",
      qty: 1,
      rate: 0,
      taxRate: 18,
      amount: 0,
    };
    onItemsChange([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === "qty" || field === "rate") {
          updatedItem.amount = Number(updatedItem.qty) * Number(updatedItem.rate);
        }
        return updatedItem;
      }
      return item;
    });
    onItemsChange(updated);
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter((i) => i.id !== id));
  };

  const handleProductSelect = (id: string, productId: string) => {
    const product = products.find((p) => p.id === Number(productId));
    if (product) {
      updateItem(id, "description", product.description);
      updateItem(id, "hsnSac", product.hsnSac);
      updateItem(id, "rate", product.rate);
      updateItem(id, "taxRate", product.taxRate);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxTotal = items.reduce((sum, item) => sum + (item.amount * item.taxRate) / 100, 0);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Item Description</TableHead>
            <TableHead>HSN/SAC</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Amount</TableHead>
            {showTaxColumns && <TableHead>Tax</TableHead>}
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                No items added yet. Click "+ Add Item" to start.
              </TableCell>
            </TableRow>
          )}
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Select onValueChange={(val) => handleProductSelect(item.id, val)}>
                  <SelectTrigger className="w-full mb-1">
                    <SelectValue placeholder="Select product/service" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.name} ({currencySymbol(currency)}{p.rate.toLocaleString()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  placeholder="Description"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={item.hsnSac}
                  onChange={(e) => updateItem(item.id, "hsnSac", e.target.value)}
                  placeholder="998314"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, "qty", Number(e.target.value))}
                  className="w-20"
                  min="1"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))}
                  className="w-32"
                />
              </TableCell>
              <TableCell className="font-medium">
                {currencySymbol(currency)}{item.amount.toLocaleString()}
              </TableCell>
              {showTaxColumns && (
                <TableCell>
                  <Select
                    value={item.taxRate.toString()}
                    onValueChange={(val) => updateItem(item.id, "taxRate", Number(val))}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="12">12%</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                      <SelectItem value="28">28%</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              )}
              <TableCell>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button onClick={addItem} className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" /> Add Item
      </Button>

      {/* Summary */}
      <div className="ml-auto max-w-md space-y-2 border-t pt-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">
            {currencySymbol(currency)}{subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tax Total</span>
          <span className="font-medium">
            {currencySymbol(currency)}{taxTotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t pt-2">
          <span>Total</span>
          <span className="text-primary">
            {currencySymbol(currency)}{(subtotal + taxTotal).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

const currencySymbol = (currency: string) => {
  switch (currency) {
    case "INR": return "₹";
    case "USD": return "$";
    case "EUR": return "€";
    default: return "₹";
  }
};

export default InvoiceItemsTable;