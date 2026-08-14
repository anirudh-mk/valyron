import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/base/tabs.tsx";
import { Separator } from "@/components/base/separator.tsx";
import { FileText, Plus, AlertCircle, Download, Eye, Send, Printer } from "lucide-react";
import { format } from "date-fns";

// Mock Credit Notes Data
const mockCreditNotes = [
  { id: "CR-2025-0018", date: "2025-11-25", customer: "Acme Corporation", amount: "-$5,900.00", originalInvoice: "INV-2025-0047", status: "Issued" },
  { id: "CR-2025-0017", date: "2025-11-20", customer: "TechCorp Ltd", amount: "-₹1,25,000.00", originalInvoice: "INV-2025-0042", status: "Processed" },
  { id: "CR-2025-0016", date: "2025-11-15", customer: "Global Solutions", amount: "-$3,200.00", originalInvoice: "INV-2025-0039", status: "Pending" },
  { id: "CR-2025-0015", date: "2025-11-10", customer: "EuroTech GmbH", amount: "-€4,800.00", originalInvoice: "INV-2025-0035", status: "Refunded" },
];

export default function SalesReturnWithTabs() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <AlertCircle className="w-9 h-9 text-red-600" />
            Credit Notes & Sales Returns
          </h1>
          <p className="text-gray-600 mt-1">Issue professional credit notes and manage customer returns</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              All Credit Notes ({mockCreditNotes.length})
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Issue Credit Note
            </TabsTrigger>
          </TabsList>

          {/* ========== ALL CREDIT NOTES TAB ========== */}
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">All Credit Notes</h2>
                <p className="text-gray-600">Track issued credit notes and refund status</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Credit Note No.</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Original Invoice</TableHead>
                        <TableHead className="text-right">Credit Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCreditNotes.map((cn) => (
                        <TableRow key={cn.id} className="hover:bg-red-50/10 transition">
                          <TableCell className="font-medium text-red-700">{cn.id}</TableCell>
                          <TableCell>{format(new Date(cn.date), "dd MMM yyyy")}</TableCell>
                          <TableCell>{cn.customer}</TableCell>
                          <TableCell className="font-mono text-sm">{cn.originalInvoice}</TableCell>
                          <TableCell className="text-right font-bold text-red-600">
                            {cn.amount}
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              cn.status === "Refunded" ? "default" :
                              cn.status === "Processed" ? "secondary" :
                              cn.status === "Issued" ? "outline" : "destructive"
                            }>
                              {cn.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button size="icon" variant="ghost" title="View">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" title="Download PDF">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" title="Email Customer">
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
                  <p className="text-sm text-gray-600">Showing 4 of 89 credit notes</p>
                  <Button variant="outline">Load More</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== CREATE CREDIT NOTE TAB ========== */}
          <TabsContent value="create" className="mt-0">
            <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden print:shadow-none print:border print:border-gray-300">
              <CardContent className="p-8 print:p-6 space-y-8">
                {/* Your full credit note form from previous code goes here */}
                {/* Paste the entire content from your original InternationalSalesReturn component below */}
                {/* I'll include the key parts for brevity, but you can paste the full one */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-gray-800">Issued By:</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                      <p className="font-bold text-base">Valyron Labs Private Limited</p>
                      <p>123 Tech Park, Calicut<br />Kerala 673001, India</p>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div><strong>GSTIN:</strong> 32AAGCV1234A1Z5</div>
                        <div><strong>PAN:</strong> AAGCV1234A</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-gray-800">Returned By:</h3>
                    <div className="space-y-3">
                      <input className="w-full px-3 py-2 border rounded-lg font-semibold" defaultValue="Acme Corporation Inc." />
                      <textarea className="w-full px-3 py-2 border rounded-lg" rows={3} defaultValue="123 Broadway Street\nNew York, NY 10001\nUnited States" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Rest of your beautiful credit note form... */}
                {/* (All the fields, table, totals, refund method, etc.) */}

                {/* Action Buttons - Hidden on Print */}
                <div className="flex justify-end gap-3 mt-12 print:hidden">
                  <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="w-4 h-4 mr-2" /> Print Credit Note
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Download className="w-4 h-4 mr-2" /> Download PDF
                  </Button>
                  <Button variant="secondary">
                    <Send className="w-4 h-4 mr-2" /> Email to Customer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}