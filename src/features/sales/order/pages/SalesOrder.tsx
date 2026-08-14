import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Input } from "@/components/base/input.tsx";
import { Textarea } from "@/components/base/textarea.tsx";
import { Label } from "@/components/base/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/base/select.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Separator } from "@/components/base/separator.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/base/tabs.tsx";
import { Package, Truck, Calendar, DollarSign, Plus, Eye, Download, Send, FileText } from "lucide-react";
import { format } from "date-fns";

// Mock data for existing sales orders
const mockSalesOrders = [
  { id: "SO-2025-0891", date: "2025-11-24", customer: "Acme Corporation", amount: "$14,986.00", status: "Confirmed", delivery: "2025-12-15" },
  { id: "SO-2025-0890", date: "2025-11-22", customer: "TechCorp Ltd", amount: "₹8,50,000.00", status: "Pending", delivery: "2025-12-20" },
  { id: "SO-2025-0889", date: "2025-11-18", customer: "Global Solutions", amount: "$22,500.00", status: "In Progress", delivery: "2025-12-10" },
  { id: "SO-2025-0888", date: "2025-11-15", customer: "EuroTech GmbH", amount: "€18,900.00", status: "Delivered", delivery: "2025-11-30" },
];

export default function SalesOrderWithTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const today = format(new Date(), "yyyy-MM-dd");
  const deliveryDate = format(new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), "yyyy-MM-dd");

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sales Orders</h1>
          <p className="text-gray-600 mt-1">Create and manage customer orders professionally</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              All Orders ({mockSalesOrders.length})
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Order
            </TabsTrigger>
          </TabsList>

          {/* ========== CREATE SALES ORDER TAB ========== */}
          <TabsContent value="create" className="mt-0">
            <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-8 space-y-8">
                {/* Your full original form goes here - keeping it clean */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5" /> Supplier
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                      <p className="font-bold text-base">Valyron Labs Private Limited</p>
                      <p>123 Tech Park, Kozhikode<br />Kerala 673001, India</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><strong>GSTIN:</strong> 32AAGCV1234A1Z5</div>
                        <div><strong>PAN:</strong> AAGCV1234A</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Bill To</h3>
                    <Input defaultValue="Acme Corporation Inc." className="font-semibold mb-3" />
                    <Textarea defaultValue="123 Broadway Street\nNew York, NY 10001\nUnited States" rows={3} className="mb-3" />
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Contact</Label><Input defaultValue="Jane Smith" /></div>
                      <div><Label>VAT ID</Label><Input defaultValue="US123456789" /></div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div><Label>Order No.</Label><Input defaultValue="SO-2025-0892" className="font-bold text-xl" /></div>
                  <div><Label>Date</Label><Input type="date" defaultValue={today} /></div>
                  <div><Label>Delivery Date</Label><Input type="date" defaultValue={deliveryDate} /></div>
                  <div>
                    <Label>Currency</Label>
                    <Select defaultValue="USD">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
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
                        <TableHead>Qty</TableHead>
                        <TableHead className="text-right">Rate</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Enterprise Web App Development</TableCell>
                        <TableCell className="text-center">1</TableCell>
                        <TableCell className="text-right">$8,500.00</TableCell>
                        <TableCell className="text-right font-bold">$10,030.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Mobile App (React Native)</TableCell>
                        <TableCell className="text-center">1</TableCell>
                        <TableCell className="text-right">$4,200.00</TableCell>
                        <TableCell className="text-right font-bold">$4,956.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button variant="outline" size="sm" className="mt-4">+ Add Item</Button>
                </div>

                {/* Total */}
                <div className="ml-auto max-w-md bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                  <div className="flex justify-between text-lg"><span>Subtotal</span><strong>$12,700.00</strong></div>
                  <div className="flex justify-between text-lg"><span>Tax (18%)</span><strong>$2,286.00</strong></div>
                  <Separator className="my-3" />
                  <div className="flex justify-between text-2xl font-bold text-indigo-700">
                    <span>Total Value</span>
                    <span>$14,986.00</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-8">
                  <Button variant="outline">Save Draft</Button>
                  <Button>Send to Customer</Button>
                  <Button onClick={() => window.print()}>Print</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== ALL SALES ORDERS TAB ========== */}
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">All Sales Orders</h2>
                <p className="text-gray-600">Track and manage all customer orders in one place</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Order No.</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Delivery Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSalesOrders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-gray-50 transition">
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{format(new Date(order.date), "dd MMM yyyy")}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{format(new Date(order.delivery), "dd MMM yyyy")}</TableCell>
                          <TableCell className="text-right font-semibold">{order.amount}</TableCell>
                          <TableCell>
                            <Badge variant={
                              order.status === "Delivered" ? "default" :
                                order.status === "Confirmed" ? "secondary" :
                                  order.status === "In Progress" ? "outline" : "destructive"
                            }>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                              <Button size="icon" variant="ghost"><Download className="h-4 w-4" /></Button>
                              <Button size="icon" variant="ghost"><Send className="h-4 w-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-600">Showing 4 of 127 sales orders</p>
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