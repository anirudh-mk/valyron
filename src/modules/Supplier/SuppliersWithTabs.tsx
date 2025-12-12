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
import { Truck, Plus, Eye, Download, Send, Building2, Globe, Phone, Mail, CreditCard } from "lucide-react";
import { format } from "date-fns";

// Mock Suppliers Data
const mockSuppliers = [
  {
    id: "SUP-2025-0001",
    name: "Tech Distributors Inc.",
    email: "procurement@techdist.com",
    phone: "+1 (415) 555-0198",
    country: "United States",
    currency: "USD",
    status: "Active",
    createdDate: "2025-01-10",
    totalPurchased: "$428,500.00",
  },
  {
    id: "SUP-2025-0002",
    name: "Indian Hardware Ltd",
    email: "accounts@indianhardware.in",
    phone: "+91 98470 12345",
    country: "India",
    currency: "INR",
    status: "Active",
    createdDate: "2025-02-15",
    totalPurchased: "₹68,75,000.00",
  },
  {
    id: "SUP-2025-0003",
    name: "EuroTech Supplies GmbH",
    email: "einkauf@eurotech.de",
    phone: "+49 89 12345670",
    country: "Germany",
    currency: "EUR",
    status: "Active",
    createdDate: "2025-03-05",
    totalPurchased: "€198,400.00",
  },
  {
    id: "SUP-2025-0004",
    name: "Global Components Asia",
    email: "sales@globalcomp.asia",
    phone: "+65 6789 0123",
    country: "Singapore",
    currency: "SGD",
    status: "On Hold",
    createdDate: "2025-04-18",
    totalPurchased: "S$87,200.00",
  },
];

export default function SuppliersWithTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const [preferredCurrency, setPreferredCurrency] = useState("USD");

  const [state, setState] = useState({
    supplierName: "",
    supplierType: "manufacturer",
    category: "electronics",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
    email: "",
    phone: "",
    website: "",
    taxId: "",
    currency: "USD",
    paymentTerms: "net30",
    leadTime: "",
    status: "active",
    notes: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, ":", value);
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", state);
    // Add form submission logic here (e.g., API call)    
    clearForm();
  }

  const clearForm = () => {
    setState({
      supplierName: "",
      supplierType: "manufacturer",
      category: "electronics",
      address: "",
      city: "",
      postalCode: "",
      country: "United States",
      email: "",
      phone: "",
      website: "",
      taxId: "",
      currency: "USD",
      paymentTerms: "net30",
      leadTime: "",
      status: "active",
      notes: "",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-600 mt-1">
            Manage your suppliers, vendors, and procurement partners worldwide
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              All Suppliers ({mockSuppliers.length})
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Supplier
            </TabsTrigger>
          </TabsList>

          {/* ========== ADD SUPPLIER TAB ========== */}
          <TabsContent value="create" className="mt-0">
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-8 space-y-8">
                {/* Company & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Supplier Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Supplier Name *</Label>
                        <Input
                          placeholder="e.g., Tech Distributors Inc."
                          className="font-semibold text-lg"
                          value={state.supplierName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Supplier ID</Label>
                          <Input
                            placeholder="Auto-generated"
                            readOnly
                            className="bg-gray-100"
                          />
                        </div>
                        <div>
                          <Label>Supplier Type</Label>
                          <Select defaultValue="manufacturer">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manufacturer">Manufacturer</SelectItem>
                              <SelectItem value="distributor">Distributor</SelectItem>
                              <SelectItem value="wholesaler">Wholesaler</SelectItem>
                              <SelectItem value="service">Service Provider</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select defaultValue="electronics">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronics">Electronics & Hardware</SelectItem>
                            <SelectItem value="software">Software & Licenses</SelectItem>
                            <SelectItem value="logistics">Logistics & Shipping</SelectItem>
                            <SelectItem value="office">Office Supplies</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Address & Location
                    </h3>
                    <div className="space-y-4">
                      <Textarea placeholder="Street address, building, floor..." rows={3} />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="City *" />
                        <Input placeholder="Postal Code / ZIP *" />
                      </div>
                      <div>
                        <Label>Country *</Label>
                        <Select defaultValue="United States">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="Singapore">Singapore</SelectItem>
                            <SelectItem value="China">China</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact & Banking */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Email (Procurement) *</Label>
                        <Input type="email" placeholder="procurement@supplier.com" />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        <Input placeholder="+1 (415) 555-0198" />
                      </div>
                      <div>
                        <Label>Website</Label>
                        <Input placeholder="https://supplier.com" type="url" />
                      </div>
                      <div>
                        <Label>GSTIN / VAT / Tax ID</Label>
                        <Input placeholder="e.g., 98-7654321" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment & Terms
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Preferred Currency</Label>
                        <Select value={preferredCurrency} onValueChange={setPreferredCurrency}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Payment Terms</Label>
                        <Select defaultValue="net30">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prepaid">Prepaid</SelectItem>
                            <SelectItem value="net15">Net 15 Days</SelectItem>
                            <SelectItem value="net30">Net 30 Days</SelectItem>
                            <SelectItem value="net60">Net 60 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Lead Time (days)</Label>
                        <Input type="number" placeholder="7" />
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Select defaultValue="active">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Notes / Special Instructions</Label>
                  <Textarea
                    rows={4}
                    className="mt-2"
                    placeholder="e.g., Requires 3-day advance notice for large orders. Preferred Incoterm: FOB Shanghai."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-8">
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Supplier
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== ALL SUPPLIERS TAB ========== */}
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">All Suppliers</CardTitle>
                <p className="text-gray-600">View and manage your procurement partners</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Supplier ID</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead className="text-right">Total Purchased</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSuppliers.map((sup) => (
                        <TableRow key={sup.id} className="hover:bg-gray-50 transition">
                          <TableCell className="font-medium">{sup.id}</TableCell>
                          <TableCell className="font-semibold">{sup.name}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm">{sup.email}</p>
                              <p className="text-xs text-gray-500">{sup.phone}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {sup.country}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{sup.currency}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">{sup.totalPurchased}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                sup.status === "Active"
                                  ? "default"
                                  : sup.status === "On Hold"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {sup.status}
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
                  <p className="text-sm text-gray-600">Showing 4 of 89 suppliers</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Export CSV</Button>
                    <Button variant="outline" size="sm">Load More</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}