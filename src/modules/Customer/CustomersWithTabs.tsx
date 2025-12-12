import { useEffect, useState } from "react";
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
import { Users, Plus, Eye, Download, Send, MapPin, Phone, Mail, Building, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { createCustomer, retrieveCustomerData } from "@/services/customerService";

// Mock Customers Data
const mockCustomers: Customer[] = [
  {
    id: "CUST-2025-0001",
    name: "Acme Corporation Inc.",
    email: "billing@acme.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    status: "Active",
    totalSpent: "$124,500.00"
  },
  {
    id: "CUST-2025-0002",
    name: "TechCorp Ltd",
    email: "accounts@techcorp.in",
    phone: "+91 98765 43210",
    country: "India",
    status: "Active",
    totalSpent: "₹8,75,000.00"
  },
  {
    id: "CUST-2025-0003",
    name: "Global Solutions GmbH",
    email: "finance@globalsol.de",
    phone: "+49 30 12345678",
    country: "Germany",
    status: "Inactive",
    totalSpent: "€45,200.00"
  },
  {
    id: "CUST-2025-0004",
    name: "EuroTech Partners",
    email: "sales@eurotech.fr",
    phone: "+33 1 23 45 67 89",
    country: "France",
    status: "Active",
    totalSpent: "€32,100.00"
  },
];
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  status: "Active" | "Inactive" | "Suspended";
  createdDate?: string;
  totalSpent?: string;
}

export default function CustomersWithTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const [state, setState] = useState({
    customerName: "",
    customerType: "corporate",
    industry: "technology",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    email: "",
    phone: "",
    website: "",
    taxId: "",
    creditLimit: "",
    paymentTerms: "net30",
    currency: "USD",
    status: "active",
    notes: "",
    country: "India",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, ":", value);
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", state);
    // Add form submission logic here (e.g., API call) 
    let payload = {
      name: state.customerName,
      type: state.customerType,
      industry: state.industry,
      address: {
        line1: state.addressLine1,
        line2: state.addressLine2,
        city: state.city,
        postalCode: state.postalCode,
        country: state.country,
      },
      contact: {
        email: state.email,
        phone: state.phone,
        website: state.website,
        taxId: state.taxId,
      },
      payment: {
        creditLimit: state.creditLimit,
        paymentTerms: state.paymentTerms,
        currency: state.currency,
      },
      status: state.status,
      notes: state.notes,
    }
    const res = await createCustomer({ payload });
    console.log(res.data);
    clearForm();
  }

  const clearForm = () => {
    setState({
      customerName: "",
      customerType: "corporate",
      industry: "technology",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      email: "",
      phone: "",
      website: "",
      taxId: "",
      creditLimit: "",
      paymentTerms: "net30",
      currency: "USD",
      status: "active",
      notes: "",
      country: "India",
    });
  }

  const fetchCustomers = async () => {
    setIsFetching(true);
    try {
      const res = await retrieveCustomerData();
      const data = res?.data?.data || res?.data || [];
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
      // setCustomers(mockCustomers); // fallback
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (activeTab === "all") {
      fetchCustomers();
    }
  }, [activeTab]);


  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customer database and relationships</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              All Customers ({mockCustomers.length})
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Customer
            </TabsTrigger>
          </TabsList>

          {/* ========== ADD CUSTOMER TAB ========== */}
          <TabsContent value="create" className="mt-0">
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Company Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Customer Name *</Label>
                        {/* <Input placeholder="e.g., Acme Corporation Inc." className="font-semibold text-lg" /> */}
                        <Input
                          name="customerName"
                          value={state.customerName}
                          onChange={handleChange}
                          placeholder="e.g., Acme Corporation Inc."
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Customer ID</Label>
                          {/* <Input placeholder="Auto-generated" readOnly /> */}
                          <Input
                            value="Auto-generated"
                            disabled
                            className="bg-gray-100"
                          />
                        </div>
                        <div>
                          <Label>Customer Type</Label>
                          <Select
                            value={state.customerType}
                            onValueChange={(value) => handleSelectChange("customerType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="corporate">Corporate</SelectItem>
                              <SelectItem value="individual">Individual</SelectItem>
                              <SelectItem value="government">Government</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Industry</Label>
                        <Select
                          value={state.industry}
                          onValueChange={(value) => handleSelectChange("industry", value)}
                          defaultValue="technology">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Billing Address
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Address Line 1 *</Label>
                        {/* <Input placeholder="Street address" /> */}
                        <Input
                          name="addressLine1"
                          value={state.addressLine1}
                          onChange={handleChange}
                          placeholder="Street address"
                          required
                        />
                      </div>
                      <div>
                        <Label>Address Line 2</Label>
                        {/* <Input placeholder="Suite, floor, etc." /> */}
                        <Input
                          name="addressLine2"
                          value={state.addressLine2}
                          onChange={handleChange}
                          placeholder="Suite, floor, etc."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>City *</Label>
                          {/* <Input placeholder="City" /> */}
                          <Input
                            name="city"
                            value={state.city}
                            onChange={handleChange}
                            placeholder="City"
                            required
                          />
                        </div>
                        <div>
                          <Label>Postal Code *</Label>
                          {/* <Input placeholder="ZIP / PIN" /> */}
                          <Input
                            name="postalCode"
                            value={state.postalCode}
                            onChange={handleChange}
                            placeholder="ZIP / PIN"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Country *</Label>
                        {/* <Select value={country} onValueChange={setCountry}> */}
                        <Select
                          value={state.country}
                          onValueChange={(value) => handleSelectChange("country", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Email *</Label>
                        {/* <Input type="email" placeholder="billing@company.com" /> */}
                        <Input
                          type="email"
                          name="email"
                          value={state.email}
                          onChange={handleChange}
                          placeholder="billing@company.com"
                          required
                        />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        {/* <Input placeholder="+1 (555) 123-4567" /> */}
                        <Input
                          name="phone"
                          value={state.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                      <div>
                        <Label>Website</Label>
                        {/* <Input placeholder="https://company.com" type="url" /> */}
                        <Input
                          name="website"
                          value={state.website}
                          onChange={handleChange}
                          placeholder="https://company.com"
                          type="url"
                        />
                      </div>
                      <div>
                        <Label>GSTIN / VAT / Tax ID</Label>
                        {/* <Input placeholder="e.g., 32AAGCV1234A1Z5" /> */}
                        <Input
                          name="taxId"
                          value={state.taxId}
                          onChange={handleChange}
                          placeholder="e.g., 32AAGCV1234A1Z5"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Payment & Terms
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Credit Limit</Label>
                        {/* <Input type="number" placeholder="0" /> */}
                        <Input
                          name="creditLimit"
                          value={state.creditLimit}
                          onChange={handleChange}
                          type="number"
                          placeholder="50000"
                        />
                      </div>
                      <div>
                        <Label>Payment Terms</Label>
                        {/* <Select defaultValue="net30"> */}
                        <Select
                          value={state.paymentTerms}
                          onValueChange={(value) => handleSelectChange("paymentTerms", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="net15">Net 15 Days</SelectItem>
                            <SelectItem value="net30">Net 30 Days</SelectItem>
                            <SelectItem value="net60">Net 60 Days</SelectItem>
                            <SelectItem value="cod">Cash on Delivery</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Preferred Currency</Label>
                        {/* <Select defaultValue="USD"> */}
                        <Select
                          value={state.currency}
                          onValueChange={(value) => handleSelectChange("currency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Status</Label>
                        {/* <Select defaultValue="active"> */}
                        <Select
                          value={state.status}
                          onValueChange={(value) => handleSelectChange("status", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Notes</Label>
                  <Textarea
                    name="notes"
                    value={state.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any additional notes about this customer..."
                    className="mt-2"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-8">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSubmit}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== ALL CUSTOMERS TAB ========== */}
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">All Customers</CardTitle>
                <p className="text-gray-600">View and manage your customer records</p>
              </CardHeader>
              <CardContent>
                {isFetching ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  </div>
                ) : (
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Customer ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Country</TableHead>
                          <TableHead className="text-right">Total Spent</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                              No customers found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          customers.map((cust) => (
                            <TableRow key={cust.id} className="hover:bg-gray-50">
                              <TableCell className="font-medium">{cust.id}</TableCell>
                              <TableCell className="font-semibold">{cust.name}</TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <p className="text-sm">{cust.email}</p>
                                  <p className="text-xs text-gray-500">{cust.phone}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{cust.country}</Badge>
                              </TableCell>
                              <TableCell className="text-right font-semibold">
                                {cust.totalSpent || "-"}
                              </TableCell>
                              <TableCell>
                                <Badge variant={cust.status === "Active" ? "default" : "secondary"}>
                                  {cust.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex justify-center gap-2">
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
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Showing {customers.length} customer{customers.length !== 1 ? "s" : ""}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Export CSV</Button>
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