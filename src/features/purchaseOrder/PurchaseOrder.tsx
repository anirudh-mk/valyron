import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Eye, Download, Send, FileCheck } from "lucide-react";
import { format } from "date-fns";

// Mock purchase Orders
const mockPurchaseOrders = [
  { id: "PO-2025-0891", date: "2025-11-25", supplier: "Tech Distributors Inc.", amount: "$18,500.00", status: "Sent" },
  { id: "PO-2025-0890", date: "2025-11-22", supplier: "Global Components Ltd", amount: "₹14,80,000.00", status: "Approved" },
  { id: "PO-2025-0889", date: "2025-11-20", supplier: "EuroTech Supplies GmbH", amount: "€12,300.00", status: "Draft" },
  { id: "PO-2025-0888", date: "2025-11-18", supplier: "Asia Pacific Hardware", amount: "$9,750.00", status: "Sent" },
];

export default function PurchaseOrderWithTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const [currency, setCurrency] = useState("USD");
  const [paymentTerms, setPaymentTerms] = useState("net30");

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
          <p className="text-gray-600 mt-1">
            Create and manage purchase orders with suppliers worldwide
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              All Orders ({mockPurchaseOrders.length})
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Purchase Order
            </TabsTrigger>
          </TabsList>

          {/* ========== CREATE PURCHASE ORDER TAB ========== */}
          <TabsContent value="create" className="mt-0">
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-8 space-y-8">
                {/* Header: supplier & Company Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Supplier</h3>
                    <Input
                      defaultValue="Tech Distributors Inc."
                      className="font-semibold text-lg"
                      placeholder="Supplier Name"
                    />
                    <Textarea
                      defaultValue="789 Supply Chain Road\nLos Angeles, CA 90021\nUnited States"
                      rows={4}
                      className="mt-3"
                      placeholder="Supplier Address"
                    />
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div>
                        <Label>VAT / GSTIN</Label>
                        <Input defaultValue="98-7654321" />
                      </div>
                      <div>
                        <Label>Contact Email</Label>
                        <Input defaultValue="procurement@techdist.com" type="email" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Ship To (Our Company)</h3>
                    <Input
                      defaultValue="Valyron Labs Private Limited"
                      className="font-semibold text-lg"
                    />
                    <Textarea
                      defaultValue="123 Tech Park, Cyber Park Road\nCalicut, Kerala 673001\nIndia"
                      rows={4}
                      className="mt-3"
                    />
                    <div className="mt-4">
                      <Label>Delivery Address (if different)</Label>
                      <Textarea
                        placeholder="Leave blank if same as above"
                        rows={2}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* PO Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Purchase Order No.</Label>
                    <Input defaultValue="PO-2025-0892" className="font-bold text-lg" readOnly />
                  </div>
                  <div>
                    <Label>Order Date</Label>
                    <Input type="date" defaultValue="2025-11-26" />
                  </div>
                  <div>
                    <Label>Expected Delivery</Label>
                    <Input type="date" defaultValue="2025-12-15" />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Payment Terms</Label>
                    <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prepaid">Prepaid</SelectItem>
                        <SelectItem value="net15">Net 15 Days</SelectItem>
                        <SelectItem value="net30">Net 30 Days</SelectItem>
                        <SelectItem value="net60">Net 60 Days</SelectItem>
                        <SelectItem value="cod">Cash on Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Shipping Method</Label>
                    <Input defaultValue="Air Freight" />
                  </div>
                  <div>
                    <Label>Incoterms</Label>
                    <Select defaultValue="FOB">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EXW">EXW - Ex Works</SelectItem>
                        <SelectItem value="FOB">FOB - Free on Board</SelectItem>
                        <SelectItem value="CIF">CIF - Cost Insurance Freight</SelectItem>
                        <SelectItem value="DAP">DAP - Delivered at Place</SelectItem>
                        <SelectItem value="DDP">DDP - Delivered Duty Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Items Table */}
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Item Description</TableHead>
                        <TableHead>HSN/SAC</TableHead>
                        <TableHead className="text-center">Qty</TableHead>
                        <TableHead className="text-center">Unit</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Line Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Dell PowerEdge R760 Server (2U Rack)</TableCell>
                        <TableCell>847150</TableCell>
                        <TableCell className="text-center">5</TableCell>
                        <TableCell className="text-center">Nos</TableCell>
                        <TableCell className="text-right">$3,500.00</TableCell>
                        <TableCell className="text-right font-bold">$17,500.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Annual Software License - Monitoring Suite</TableCell>
                        <TableCell>998315</TableCell>
                        <TableCell className="text-center">1</TableCell>
                        <TableCell className="text-center">Year</TableCell>
                        <TableCell className="text-right">$1,000.00</TableCell>
                        <TableCell className="text-right font-bold">$1,000.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button variant="outline" size="sm" className="mt-4">
                    + Add Item
                  </Button>
                </div>

                {/* Totals */}
                <div className="ml-auto max-w-md space-y-3">
                  <div className="bg-blue-50 rounded-lg p-6 border">
                    <div className="flex justify-between text-lg">
                      <span>Subtotal</span>
                      <strong>$18,500.00</strong>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Tax (Excluded)</span>
                      <span className="text-gray-600">As per local laws</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between text-2xl font-bold text-blue-700">
                      <span>Total Amount</span>
                      <span>$18,500.00</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label>Notes / Terms & Conditions</Label>
                  <Textarea
                    rows={4}
                    className="mt-2"
                    defaultValue="• Please include commercial invoice and packing list.\n• Goods must comply with RoHS and REACH standards.\n• Warranty: Minimum 3 years on hardware."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-8">
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="secondary">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Approve & Send
                  </Button>
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Send PO
                  </Button>
                  <Button onClick={() => window.print()}>Print PDF</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== ALL PURCHASE ORDERS TAB ========== */}
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">All Purchase Orders</CardTitle>
                <p className="text-gray-600">
                  Track and manage all purchase orders sent to suppliers
                </p>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>PO Number</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPurchaseOrders.map((po) => (
                        <TableRow key={po.id} className="hover:bg-gray-50 transition">
                          <TableCell className="font-medium">{po.id}</TableCell>
                          <TableCell>{format(new Date(po.date), "dd MMM yyyy")}</TableCell>
                          <TableCell>{po.supplier}</TableCell>
                          <TableCell className="text-right font-semibold">{po.amount}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                po.status === "Approved"
                                  ? "default"
                                  : po.status === "Sent"
                                  ? "secondary"
                                  : po.status === "Draft"
                                  ? "outline"
                                  : "destructive"
                              }
                            >
                              {po.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button size="icon" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-600">Showing 4 of 127 purchase orders</p>
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