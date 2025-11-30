// src/components/ItemTable/GlobalInvoiceItemsTable.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  description: string;
  hsnSac: string;
  rate: number;
  taxRate: number;
}

const defaultProducts: Product[] = [
  { id: 1, name: "Website Development", description: "Full-stack web application", hsnSac: "998314", rate: 85000, taxRate: 18 },
  { id: 2, name: "Mobile App (React Native)", description: "iOS & Android app", hsnSac: "998314", rate: 140000, taxRate: 18 },
  { id: 3, name: "API Integration", description: "Third-party API setup", hsnSac: "998319", rate: 30000, taxRate: 18 },
  { id: 4, name: "Cloud Migration", description: "AWS/Azure migration", hsnSac: "998315", rate: 95000, taxRate: 18 },
  { id: 5, name: "Consulting (per day)", description: "Technical consulting", hsnSac: "998319", rate: 18000, taxRate: 18 },
];

export interface InvoiceItem {
  id: string;
  productId?: number;
  description: string;
  hsnSac: string;
  qty: number;
  rate: number;
  amount: number;
  taxRate: number;
}

interface GlobalInvoiceItemsTableProps {
  items: InvoiceItem[];
  onItemsChange: (items: InvoiceItem[]) => void;
  currency: string;
  currencySymbol: string;
  invoiceType: string;
  placeOfSupply: string;
  companyState: string; // e.g., "KL"
  customerState: string; // e.g., "MH"
  reverseCharge: boolean;
}

const GlobalInvoiceItemsTable = ({
  items,
  onItemsChange,
  currency,
  currencySymbol,
  invoiceType,
  placeOfSupply,
  companyState,
  customerState,
  reverseCharge,
}: GlobalInvoiceItemsTableProps) => {
  const isExportOrSEZ = invoiceType.includes("export") || invoiceType.includes("sez");
  const isDomesticGST = invoiceType === "tax_invoice" && customerState && companyState;
  const isIGST = isDomesticGST && customerState !== companyState;

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      hsnSac: "",
      qty: 1,
      rate: 0,
      amount: 0,
      taxRate: isExportOrSEZ ? 0 : 18,
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
    const product = defaultProducts.find((p) => p.id === Number(productId));
    if (product) {
      updateItem(id, "description", product.description);
      updateItem(id, "hsnSac", product.hsnSac);
      updateItem(id, "rate", product.rate);
      updateItem(id, "taxRate", isExportOrSEZ ? 0 : product.taxRate);
    }
  };

  // Calculations
  const subtotal = items.reduce((sum, i) => sum + i.amount, 0);
  const effectiveTaxRate = isExportOrSEZ ? 0 : items.reduce((sum, i) => sum + i.taxRate, 0) / (items.length || 1);

  const cgst = isDomesticGST && !isIGST ? subtotal * (effectiveTaxRate / 2 / 100) : 0;
  const sgst = isDomesticGST && !isIGST ? subtotal * (effectiveTaxRate / 2 / 100) : 0;
  const igst = isDomesticGST && isIGST ? subtotal * (effectiveTaxRate / 100) : 0;
  const totalTax = cgst + sgst + igst;
  const grandTotal = subtotal + totalTax;

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[40%]">Item & Description</TableHead>
            {isDomesticGST && <TableHead>HSN/SAC</TableHead>}
            <TableHead className="text-center">Qty</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            {isDomesticGST && <TableHead className="text-center">Tax</TableHead>}
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                No items added. Click "Add Item" to begin.
              </TableCell>
            </TableRow>
          )}
          {items.map((item) => (
            <TableRow key={item.id} className="hover:bg-gray-50">
              <TableCell>
                <Select onValueChange={(val) => handleProductSelect(item.id, val)}>
                  <SelectTrigger className="mb-2">
                    <SelectValue placeholder="Select product/service" />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultProducts.map((p) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        <div className="flex justify-between w-full">
                          <span>{p.name}</span>
                          <span className="text-gray-500 ml-4">
                            {currencySymbol}{p.rate.toLocaleString()}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  placeholder="Enter description"
                  className="mt-1"
                />
              </TableCell>

              {isDomesticGST && (
                <TableCell>
                  <Input
                    value={item.hsnSac}
                    onChange={(e) => updateItem(item.id, "hsnSac", e.target.value)}
                    placeholder="998314"
                  />
                </TableCell>
              )}

              <TableCell>
                <Input
                  type="number"
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, "qty", Number(e.target.value) || 1)}
                  className="w-24 mx-auto"
                  min="1"
                />
              </TableCell>

              <TableCell className="text-right">
                <Input
                  type="number"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))}
                  className="w-32 text-right"
                />
              </TableCell>

              <TableCell className="text-right font-semibold">
                {currencySymbol}{item.amount.toLocaleString()}
              </TableCell>

              {isDomesticGST && (
                <TableCell className="text-center">
                  <Badge variant="secondary">
                    {isExportOrSEZ ? "0%" : `${item.taxRate}% ${isIGST ? "IGST" : "GST"}`}
                  </Badge>
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

      <Button onClick={addItem} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Item
      </Button>

      {/* === TAX SUMMARY & TOTAL === */}
      <div className="ml-auto max-w-lg space-y-3">
        <div className="border rounded-lg bg-gray-50 p-6 space-y-3">
          <div className="flex justify-between text-lg">
            <span>Subtotal</span>
            <span className="font-semibold">
              {currencySymbol}{subtotal.toFixed(2)}
            </span>
          </div>

          {isDomesticGST && !isExportOrSEZ && (
            <>
              {cgst > 0 && (
                <div className="flex justify-between">
                  <span>CGST @{(effectiveTaxRate / 2).toFixed(1)}%</span>
                  <span>{currencySymbol}{cgst.toFixed(2)}</span>
                </div>
              )}
              {sgst > 0 && (
                <div className="flex justify-between">
                  <span>SGST @{(effectiveTaxRate / 2).toFixed(1)}%</span>
                  <span>{currencySymbol}{sgst.toFixed(2)}</span>
                </div>
              )}
              {igst > 0 && (
                <div className="flex justify-between">
                  <span>IGST @{effectiveTaxRate.toFixed(1)}%</span>
                  <span>{currencySymbol}{igst.toFixed(2)}</span>
                </div>
              )}
            </>
          )}

          {isExportOrSEZ && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Tax (Zero Rated - Export/SEZ)</span>
              <span>{currencySymbol}0.00</span>
            </div>
          )}

          {reverseCharge && (
            <div className="text-orange-600 text-sm italic">
              Reverse Charge Applicable (Tax payable by recipient)
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-xl font-bold">
            <span>Total Amount</span>
            <span className="text-primary">
              {currencySymbol}{grandTotal.toFixed(2)}
            </span>
          </div>

          {isExportOrSEZ && (
            <div className="text-sm text-gray-600 mt-3 p-3 bg-blue-50 rounded border border-blue-200">
              This is a <strong>Zero-Rated Supply</strong> under GST (Export/SEZ)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalInvoiceItemsTable;