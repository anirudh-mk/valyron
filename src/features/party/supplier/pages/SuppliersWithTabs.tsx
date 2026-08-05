import { useEffect, useState } from "react";
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
import { Truck, Plus, Eye, Download, Send, Building2, Globe, Phone, Mail, CreditCard, Loader2 } from "lucide-react";
import { createCustomer, retrievePartyData } from "@/services/customerService.ts";

// import { createSupplier, getSuppliers } from "@/services/supplierService";

// Types
interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  currency: string;
  status: "Active" | "On Hold" | "Inactive";
  totalPurchased?: string;
  type: string;
}

const mockSuppliers: Supplier[] = [/* your mock data here */];

export default function SuppliersWithTabs() {
  const [activeTab, setActiveTab] = useState<"all" | "create">("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

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
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof typeof state, value: string) => {
    setState(prev => ({ ...prev, [name]: value }));
  };

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      name: state.supplierName,
      type: state.supplierType,
      category: state.category,
      address: {
        street: state.address,
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
      preferences: {
        currency: state.currency,
        paymentTerms: state.paymentTerms,
        leadTimeDays: state.leadTime ? Number(state.leadTime) : null,
      },
      status: state.status,
      notes: state.notes,
      party_type: "supplier",
    };

    try {
      await createCustomer({ payload });
      alert("supplier created successfully!");
      clearForm();
    } catch (err: any) {
      console.error(err);
      alert("Error: " + (err.response?.data?.message || "Failed to create supplier"));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    setIsFetching(true);
    try {
      const res = await retrievePartyData();
      const list = res?.data?.data || res?.data || [];
      setSuppliers(Array.isArray(list) ? list : mockSuppliers);
    } catch (err) {
      console.error("Failed to load suppliers:", err);
      setSuppliers(mockSuppliers);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (activeTab === "all") {
      fetchSuppliers();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-600 mt-1">Manage your suppliers, vendors, and procurement partners worldwide</p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              All Suppliers ({suppliers.length})
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Supplier
            </TabsTrigger>
          </TabsList>

          {/* CREATE TAB */}
          <TabsContent value="create">
            <Card className="shadow-xl border-0 rounded-2xl">
              <CardContent className="p-8 space-y-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* supplier Details */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Building2 className="h-5 w-5" /> Supplier Details
                      </h3>
                      <div>
                        <Label>Supplier Name *</Label>
                        <Input
                          name="supplierName"
                          value={state.supplierName}
                          onChange={handleChange}
                          placeholder="e.g., Tech Distributors Inc."
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Supplier ID</Label>
                          <Input value="Auto-generated" disabled className="bg-gray-100" />
                        </div>
                        <div>
                          <Label>Supplier Type</Label>
                          <Select value={state.supplierType} onValueChange={(v) => handleSelectChange("supplierType", v)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
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
                        <Select value={state.category} onValueChange={(v) => handleSelectChange("category", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronics">Electronics & Hardware</SelectItem>
                            <SelectItem value="software">Software & Licenses</SelectItem>
                            <SelectItem value="logistics">Logistics</SelectItem>
                            <SelectItem value="office">Office Supplies</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Globe className="h-5 w-5" /> Address
                      </h3>
                      <Textarea
                        name="address"
                        value={state.address}
                        onChange={handleChange}
                        placeholder="Street, building, floor..."
                        rows={3}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input name="city" value={state.city} onChange={handleChange} placeholder="City" />
                        <Input name="postalCode" value={state.postalCode} onChange={handleChange} placeholder="ZIP/Postal" />
                      </div>
                      <div>
                        <Label>Country</Label>
                        <Select value={state.country} onValueChange={(v) => handleSelectChange("country", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="Singapore">Singapore</SelectItem>
                            <SelectItem value="China">China</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Mail className="h-5 w-5" /> Contact
                      </h3>
                      <Input name="email" value={state.email} onChange={handleChange} type="email" placeholder="procurement@supplier.com" required />
                      <Input name="phone" value={state.phone} onChange={handleChange} placeholder="+1 (415) 555-0198" required />
                      <Input name="website" value={state.website} onChange={handleChange} placeholder="https://..." />
                      <Input name="taxId" value={state.taxId} onChange={handleChange} placeholder="GSTIN / VAT ID" />
                    </div>

                    {/* Payment & Terms */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <CreditCard className="h-5 w-5" /> Payment
                      </h3>
                      <div>
                        <Label>Currency</Label>
                        <Select value={state.currency} onValueChange={(v) => handleSelectChange("currency", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="INR">INR</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="SGD">SGD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Payment Terms</Label>
                        <Select value={state.paymentTerms} onValueChange={(v) => handleSelectChange("paymentTerms", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prepaid">Prepaid</SelectItem>
                            <SelectItem value="net30">Net 30</SelectItem>
                            {/* ... */}
                          </SelectContent>
                        </Select>
                      </div>

                      <Input name="leadTime" value={state.leadTime} onChange={handleChange} type="number" placeholder="Lead time (days)" />
                      <div>
                        <Label>Status</Label>
                        <Select value={state.status} onValueChange={(v) => handleSelectChange("status", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
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
                      placeholder="Special instructions, Incoterms, etc."
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={clearForm}>Cancel</Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Adding...</> : <><Plus className="h-4 w-4 mr-2" /> Add Supplier</>}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LIST TAB */}
          {/* ========== ALL SUPPLIERS TAB (LIST) ========== */}
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">All Suppliers</CardTitle>
                <p className="text-gray-600">View and manage your procurement partners</p>
              </CardHeader>
              <CardContent>
                {isFetching ? (
                  /* Loading State */
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
                    <p className="text-gray-500">Loading suppliers...</p>
                  </div>
                ) : suppliers.length === 0 ? (
                  /* Empty State */
                  <div className="text-center py-16">
                    <Truck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No suppliers found</p>
                    <p className="text-sm text-gray-400 mt-2">Start by adding your first supplier</p>
                  </div>
                ) : (
                  /* Data Table */
                  <>
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
                          {suppliers.map((sup) => (
                            <TableRow key={sup.id} className="hover:bg-gray-50 transition">
                              <TableCell className="font-medium">{sup.id || "-"}</TableCell>
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
                                <Badge variant="secondary">{sup.currency || "USD"}</Badge>
                              </TableCell>
                              <TableCell className="text-right font-semibold">
                                {sup.totalPurchased || "-"}
                              </TableCell>
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
                                  {sup.status || "Active"}
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

                    {/* Footer */}
                    <div className="mt-6 flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Showing {suppliers.length} supplier{suppliers.length !== 1 ? "s" : ""}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Export CSV
                        </Button>
                        <Button variant="outline" size="sm">
                          Load More
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}