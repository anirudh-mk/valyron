import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Eye, Download, CreditCard } from "lucide-react";
import { format } from "date-fns";

// Mock data for saved purchase invoices
const mockPurchaseInvoices = [
  { id: "PINV-2025-0047", date: "2025-11-24", supplier: "Tech Suppliers Inc.", amount: "$4,200.00", status: "Paid" },
  { id: "PINV-2025-0046", date: "2025-11-20", supplier: "Indian Hardware Ltd", amount: "₹3,50,000.00", status: "Unpaid" },
  { id: "PINV-2025-0045", date: "2025-11-18", supplier: "Euro Parts GmbH", amount: "€7,800.00", status: "Draft" },
  { id: "PINV-2025-0044", date: "2025-11-15", supplier: "Global Vendors", amount: "$9,100.00", status: "Paid" },
];

export default function PurchaseInvoiceWithTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Purchase Invoices</h1>
          <p className="text-gray-600 mt-1">Record and manage supplier invoices</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              All Invoices ({mockPurchaseInvoices.length})
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Record Invoice
            </TabsTrigger>
          </TabsList>

          {/* ========== RECORD INVOICE TAB ========== */}
          <TabsContent value="create" className="mt-0">
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">From (Supplier):</h3>
                    <Input defaultValue="Tech Suppliers Inc." className="font-semibold" />
                    <Textarea defaultValue="456 Industrial Park, San Francisco\nCA 94105, United States" rows={3} className="mt-3" />
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div><Label>GSTIN/VAT</Label><Input defaultValue="32AAGCV5678B1Z9" /></div>
                      <div><Label>PAN/TIN</Label><Input defaultValue="AAGCV5678B" /></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Bill To (Our Company):</h3>
                    <Input defaultValue="Valyron Labs Private Limited" className="font-semibold" />
                    <Textarea defaultValue="123 Tech Park, Calicut\nKerala 673001, India" rows={3} className="mt-3" />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><Label>Invoice No.</Label><Input defaultValue="PINV-2025-0048" className="font-bold" /></div>
                  <div><Label>Received Date</Label><Input type="date" defaultValue="2025-11-25" /></div>
                  <div><Label>Due Date</Label><Input type="date" defaultValue="2025-12-25" /></div>
                  <div>
                    <Label>Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Items Table */}
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>#</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>HSN/SAC</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead className="text-right">Rate</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Server Hardware - Enterprise Grade</TableCell>
                        <TableCell>847150</TableCell>
                        <TableCell className="text-center">2</TableCell>
                        <TableCell className="text-right">$2,000.00</TableCell>
                        <TableCell className="text-right font-bold">$4,720.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button variant="outline" size="sm" className="mt-4">+ Add Item</Button>
                </div>

                {/* Totals */}
                <div className="ml-auto max-w-md bg-blue-50 rounded-lg p-6 border">
                  <div className="flex justify-between text-lg"><span>Subtotal</span><strong>$4,000.00</strong></div>
                  <div className="flex justify-between text-lg"><span>Tax (18%)</span><strong>$720.00</strong></div>
                  <Separator className="my-3" />
                  <div className="flex justify-between text-2xl font-bold text-blue-700">
                    <span>Total</span>
                    <span>$4,720.00</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-8">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Record Invoice</Button>
                  <Button onClick={() => window.print()}>Print</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== ALL INVOICES TAB ========== */}
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">All Purchase Invoices</CardTitle>
                <p className="text-gray-600">View and manage all your received and draft purchase invoices</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Invoice No.</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPurchaseInvoices.map((inv) => (
                        <TableRow key={inv.id} className="hover:bg-gray-50 transition">
                          <TableCell className="font-medium">{inv.id}</TableCell>
                          <TableCell>{format(new Date(inv.date), "dd MMM yyyy")}</TableCell>
                          <TableCell>{inv.supplier}</TableCell>
                          <TableCell className="text-right font-semibold">{inv.amount}</TableCell>
                          <TableCell>
                            <Badge variant={inv.status === "Paid" ? "default" : inv.status === "Unpaid" ? "secondary" : "outline"}>
                              {inv.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                              <Button size="icon" variant="ghost"><Download className="h-4 w-4" /></Button>
                              <Button size="icon" variant="ghost"><CreditCard className="h-4 w-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-600">Showing 4 of 48 invoices</p>
                  <Button variant="outline">Load More</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}