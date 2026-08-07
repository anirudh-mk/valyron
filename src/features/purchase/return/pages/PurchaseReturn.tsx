import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { FileText, Plus, Eye, Download, Send, PackageX } from "lucide-react";
import { format } from "date-fns";

// Mock purchase Returns (Debit Notes)
const mockPurchaseReturns = [
  { id: "PR-2025-012", date: "2025-11-24", supplier: "Tech Distributors Inc.", refInvoice: "PINV-2025-0047", amount: "$1,200.00", status: "Sent" },
  { id: "PR-2025-011", date: "2025-11-20", supplier: "Indian Hardware Ltd", refInvoice: "PINV-2025-0046", amount: "₹85,000.00", status: "Draft" },
  { id: "PR-2025-010", date: "2025-11-18", supplier: "Euro Parts GmbH", refInvoice: "PINV-2025-0045", amount: "€2,400.00", status: "Approved" },
  { id: "PR-2025-009", date: "2025-11-15", supplier: "Global Vendors", refInvoice: "PINV-2025-0044", amount: "$3,100.00", status: "Sent" },
];

export default function PurchaseReturnWithTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const [currency, setCurrency] = useState("USD");
  const [returnReason, setReturnReason] = useState("damaged");

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Purchase Returns</h1>
          <p className="text-gray-600 mt-1">
            Issue debit notes to suppliers for returned or defective goods
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              All Returns ({mockPurchaseReturns.length})
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Purchase Return
            </TabsTrigger>
          </TabsList>

          {/* ========== CREATE PURCHASE RETURN TAB ========== */}
          <TabsContent value="create" className="mt-0">
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-red-50 border-b">
                <CardTitle className="text-2xl text-red-800 flex items-center gap-2">
                  <PackageX className="h-6 w-6" />
                  Purchase Return / Debit Note
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {/* supplier & Company Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Supplier (Return To)</h3>
                    <Input defaultValue="Tech Distributors Inc." className="font-semibold text-lg" />
                    <Textarea
                      defaultValue="789 Supply Chain Road\nLos Angeles, CA 90021\nUnited States"
                      rows={3}
                      className="mt-3"
                    />
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div><Label>VAT / GSTIN</Label><Input defaultValue="98-7654321" /></div>
                      <div><Label>Email</Label><Input defaultValue="returns@techdist.com" type="email" /></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Our Company</h3>
                    <Input defaultValue="Valyron Labs Private Limited" className="font-semibold text-lg" />
                    <Textarea
                      defaultValue="123 Tech Park, Cyber Park Road\nCalicut, Kerala 673001\nIndia"
                      rows={3}
                      className="mt-3"
                    />
                  </div>
                </div>

                <Separator />

                {/* Return Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Return No.</Label>
                    <Input defaultValue="PR-2025-013" className="font-bold text-lg" readOnly />
                  </div>
                  <div>
                    <Label>Return Date</Label>
                    <Input type="date" defaultValue="2025-11-26" />
                  </div>
                  <div>
                    <Label>Original Invoice No.</Label>
                    <Input defaultValue="PINV-2025-0047" />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Reason for Return</Label>
                    <Select value={returnReason} onValueChange={setReturnReason}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="damaged">Damaged Goods</SelectItem>
                        <SelectItem value="defective">Defective / Faulty</SelectItem>
                        <SelectItem value="wrong">Wrong Item Delivered</SelectItem>
                        <SelectItem value="excess">Excess Quantity</SelectItem>
                        <SelectItem value="quality">Quality Issue</SelectItem>
                        <SelectItem value="expired">Expired / Near Expiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Return Type</Label>
                    <Select defaultValue="credit">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">Credit Note Expected</SelectItem>
                        <SelectItem value="replacement">Replacement Requested</SelectItem>
                        <SelectItem value="refund">Refund Requested</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Items Table */}
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-red-50">
                        <TableHead>#</TableHead>
                        <TableHead>Item Description</TableHead>
                        <TableHead>HSN/SAC</TableHead>
                        <TableHead className="text-center">Returned Qty</TableHead>
                        <TableHead className="text-center">Unit</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Dell PowerEdge R760 Server (2U Rack)</TableCell>
                        <TableCell>847150</TableCell>
                        <TableCell className="text-center font-semibold text-red-700">2</TableCell>
                        <TableCell className="text-center">Nos</TableCell>
                        <TableCell className="text-right">$3,500.00</TableCell>
                        <TableCell className="text-right font-bold text-red-700">$7,000.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button variant="outline" size="sm" className="mt-4">
                    + Add Returned Item
                  </Button>
                </div>

                {/* Totals */}
                <div className="ml-auto max-w-md bg-red-50 rounded-lg p-6 border border-red-200">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal</span>
                    <strong>$7,000.00</strong>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Tax Recovered (18%)</span>
                    <strong>$1,260.00</strong>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between text-2xl font-bold text-red-700">
                    <span>Total Return Amount</span>
                    <span>$8,260.00</span>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label>Return Notes / Instructions</Label>
                  <Textarea
                    rows={4}
                    className="mt-2"
                    placeholder="e.g., Goods damaged in transit. Please arrange pickup by Friday. Photos attached."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-8">
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="destructive">
                    <PackageX className="h-4 w-4 mr-2" />
                    Record Return
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Send className="h-4 w-4 mr-2" />
                    Send Debit Note
                  </Button>
                  <Button onClick={() => window.print()}>Print / PDF</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== ALL PURCHASE RETURNS TAB ========== */}
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">All Purchase Returns</CardTitle>
                <p className="text-gray-600">
                  Track all debit notes issued to suppliers
                </p>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Return No.</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Ref Invoice</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPurchaseReturns.map((pr) => (
                        <TableRow key={pr.id} className="hover:bg-gray-50 transition">
                          <TableCell className="font-medium text-red-700">{pr.id}</TableCell>
                          <TableCell>{format(new Date(pr.date), "dd MMM yyyy")}</TableCell>
                          <TableCell>{pr.supplier}</TableCell>
                          <TableCell className="text-sm text-gray-600">{pr.refInvoice}</TableCell>
                          <TableCell className="text-right font-semibold text-red-700">{pr.amount}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                pr.status === "Approved"
                                  ? "default"
                                  : pr.status === "Sent"
                                  ? "secondary"
                                  : pr.status === "Draft"
                                  ? "outline"
                                  : "destructive"
                              }
                            >
                              {pr.status}
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
                  <p className="text-sm text-gray-600">Showing 4 of 68 returns</p>
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