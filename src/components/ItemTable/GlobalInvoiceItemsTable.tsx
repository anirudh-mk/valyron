"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table";
import { Input } from "@/components/base/input";
import { Button } from "@/components/base/button";
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
import { Trash2, Plus, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Product Database (replace with your API later)
const PRODUCTS = [
  {
    id: "1",
    productCode: "P001",
    barcode: "8901234567890",
    productName: "Wireless Mouse",
    rate: 25.0,
  },
  {
    id: "2",
    productCode: "P002",
    barcode: "8900987654321",
    productName: "USB Keyboard",
    rate: 45.0,
  },
  {
    id: "3",
    productCode: "P003",
    barcode: "1234567890123",
    productName: "HD Webcam",
    rate: 89.99,
  },
  {
    id: "4",
    productCode: "P004",
    barcode: "9876543210987",
    productName: "Bluetooth Speaker",
    rate: 59.5,
  },
  {
    id: "5",
    productCode: "P005",
    barcode: "1111222233334",
    productName: "Laptop Stand",
    rate: 35.0,
  },
];

interface Item {
  id: string;
  productId?: string;
  productCode: string;
  barcode: string;
  productName: string;
  qty: number;
  rate: number;
}

export function FrappeStyleInvoiceTable() {
  const [items, setItems] = useState<Item[]>([]);

  const addRow = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      productId: undefined,
      productCode: "",
      barcode: "",
      productName: "",
      qty: 1,
      rate: 0,
    };
    setItems([...items, newItem]);
  };

  const removeRow = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (
    id: string,
    field: keyof Item,
    value: string | number
  ) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "qty" || field === "rate" ? Number(value) || 0 : value,
            }
          : item
      )
    );
  };

  const selectProduct = (id: string, product: typeof PRODUCTS[0]) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              productId: product.id,
              productCode: product.productCode,
              barcode: product.barcode,
              productName: product.productName,
              rate: product.rate,
            }
          : item
      )
    );
  };

  const getRowTotal = (item: Item) => (item.qty * item.rate).toFixed(2);

  const grandTotal = items
    .reduce((sum, item) => sum + item.qty * item.rate, 0)
    .toFixed(2);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-32">Code</TableHead>
              <TableHead className="w-40">Barcode</TableHead>
              <TableHead className="min-w-64">Item Name</TableHead>
              <TableHead className="text-center w-24">Qty</TableHead>
              <TableHead className="text-right w-32">Rate</TableHead>
              <TableHead className="text-right w-32">Amount</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/30">
                {/* Product Code */}
                <TableCell>
                  <Input
                    value={item.productCode}
                    readOnly
                    placeholder="Auto"
                    className="h-9 border-0 bg-transparent text-muted-foreground"
                  />
                </TableCell>

                {/* Barcode */}
                <TableCell>
                  <Input
                    value={item.barcode}
                    readOnly
                    placeholder="Auto"
                    className="h-9 border-0 bg-transparent text-muted-foreground"
                  />
                </TableCell>

                {/* Product Name with Autocomplete */}
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      {/* <div> */}
                      <Button
                        variant="ghost"
                        role="combobox"
                        className={cn(
                          "w-full justify-between h-9 px-3 font-normal",
                          !item.productName && "text-muted-foreground"
                        )}
                      >
                        {item.productName || "Select product..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search product..." />
                        <CommandList>
                          <CommandEmpty>No product found.</CommandEmpty>
                          <CommandGroup>
                            {PRODUCTS.map((product) => (
                              <CommandItem
                                key={product.id}
                                value={`${product.productName} ${product.productCode}`}
                                onSelect={() => selectProduct(item.id, product)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.productId === product.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div className="flex flex-col">
                                  <div className="font-medium">{product.productName}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {product.productCode} • ${product.rate}
                                  </div>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </TableCell>

                {/* Quantity */}
                <TableCell>
                  <Input
                    type="number"
                    value={item.qty || ""}
                    onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                    className="h-9 w-20 text-center border-0 bg-transparent"
                    min="1"
                  />
                </TableCell>

                {/* Rate */}
                <TableCell>
                  <Input
                    type="number"
                    value={item.rate || ""}
                    onChange={(e) => updateItem(item.id, "rate", e.target.value)}
                    className="h-9 w-28 text-right border-0 bg-transparent"
                    step="0.01"
                    placeholder="0.00"
                  />
                </TableCell>

                {/* Amount */}
                <TableCell className="text-right font-semibold">
                  ${getRowTotal(item)}
                </TableCell>

                {/* Delete */}
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(item.id)}
                    className="h-8 w-8 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {/* Add Row Button */}
            <TableRow>
              <TableCell colSpan={7}>
                <Button
                  variant="ghost"
                  onClick={addRow}
                  className="w-full h-12 text-primary hover:bg-primary/10 text-lg font-medium"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add a row
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow className="bg-muted/50 font-bold">
              <TableCell colSpan={5} className="text-right text-lg">
                Total
              </TableCell>
              <TableCell className="text-right text-lg">
                ${grandTotal}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Debug: Show JSON */}
      {/* <div className="mt-8">
        <pre className="text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
          {JSON.stringify(items, null, 2)}
        </pre>
      </div> */}
    </div>
  );
}