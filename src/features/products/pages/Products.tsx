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
import { Package, Plus, Eye, Edit, Trash } from "lucide-react";

/* =======================
   TYPES
======================= */
interface Product {
  id: string;
  name: string;
  type: "goods" | "services";
  hsn: string;
  unit: string;
  salePrice: number;
  purchasePrice: number;
  priceType: "inclusive" | "exclusive";
  taxCategory: "taxable" | "exempt" | "nil";
  gstRate: number;
  stock?: number;
  status: "active" | "inactive";
  description?: string;
}

/* =======================
   COMPONENT
======================= */
export default function Products() {
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);

  const [state, setState] = useState({
    productName: "",
    productType: "goods",
    hsnCode: "",
    unit: "pcs",
    salePrice: "",
    purchasePrice: "",
    priceType: "exclusive",
    taxCategory: "taxable",
    gstRate: "18",
    openingStock: "",
    status: "active",
    description: "",
  });

  /* =======================
     HANDLERS
  ======================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setState({
      productName: "",
      productType: "goods",
      hsnCode: "",
      unit: "pcs",
      salePrice: "",
      purchasePrice: "",
      priceType: "exclusive",
      taxCategory: "taxable",
      gstRate: "18",
      openingStock: "",
      status: "active",
      description: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Product = {
      id: `PROD-${Date.now()}`,
      name: state.productName,
      type: state.productType as "goods" | "services",
      hsn: state.hsnCode,
      unit: state.unit,
      salePrice: Number(state.salePrice),
      purchasePrice: Number(state.purchasePrice),
      priceType: state.priceType as "inclusive" | "exclusive",
      taxCategory: state.taxCategory as "taxable" | "exempt" | "nil",
      gstRate: state.taxCategory === "taxable" ? Number(state.gstRate) : 0,
      stock:
        state.productType === "goods"
          ? Number(state.openingStock || 0)
          : undefined,
      status: state.status as "active" | "inactive",
      description: state.description,
    };

    setProducts((prev) => [...prev, payload]);
    clearForm();
    setActiveTab("all");
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            GST compliant product & service master
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="all">
              <Package className="h-4 w-4 mr-2" />
              All Products
            </TabsTrigger>
            <TabsTrigger value="create">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </TabsTrigger>
          </TabsList>

          {/* ================= CREATE PRODUCT ================= */}
          <TabsContent value="create">
            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-8 space-y-8">
                <form onSubmit={handleSubmit}>
                  {/* BASIC DETAILS */}
                  <h3 className="font-bold text-lg">Basic Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Product Name *</Label>
                      <Input
                        name="productName"
                        value={state.productName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <Label>Product Type</Label>
                      <Select
                        value={state.productType}
                        onValueChange={(v) =>
                          handleSelectChange("productType", v)
                        }
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="goods">Goods</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>HSN / SAC *</Label>
                      <Input
                        name="hsnCode"
                        value={state.hsnCode}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <Label>Unit</Label>
                      <Select
                        value={state.unit}
                        onValueChange={(v) => handleSelectChange("unit", v)}
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pcs">Pieces</SelectItem>
                          <SelectItem value="kg">Kilogram</SelectItem>
                          <SelectItem value="ltr">Litre</SelectItem>
                          <SelectItem value="nos">Nos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* PRICING */}
                  <h3 className="font-bold text-lg">Pricing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Selling Price</Label>
                      <Input
                        type="number"
                        name="salePrice"
                        value={state.salePrice}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Label>Purchase Price</Label>
                      <Input
                        type="number"
                        name="purchasePrice"
                        value={state.purchasePrice}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Label>Price Type</Label>
                      <Select
                        value={state.priceType}
                        onValueChange={(v) =>
                          handleSelectChange("priceType", v)
                        }
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exclusive">
                            Exclusive of GST
                          </SelectItem>
                          <SelectItem value="inclusive">
                            Inclusive of GST
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* GST */}
                  <h3 className="font-bold text-lg">GST Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Tax Category</Label>
                      <Select
                        value={state.taxCategory}
                        onValueChange={(v) =>
                          handleSelectChange("taxCategory", v)
                        }
                      >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="taxable">Taxable</SelectItem>
                          <SelectItem value="exempt">Exempt</SelectItem>
                          <SelectItem value="nil">Nil Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {state.taxCategory === "taxable" && (
                      <div>
                        <Label>GST Rate (%)</Label>
                        <Select
                          value={state.gstRate}
                          onValueChange={(v) =>
                            handleSelectChange("gstRate", v)
                          }
                        >
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="12">12%</SelectItem>
                            <SelectItem value="18">18%</SelectItem>
                            <SelectItem value="28">28%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* INVENTORY */}
                  {state.productType === "goods" && (
                    <>
                      <h3 className="font-bold text-lg">Inventory</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label>Opening Stock</Label>
                          <Input
                            type="number"
                            name="openingStock"
                            value={state.openingStock}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <Label>Status</Label>
                          <Select
                            value={state.status}
                            onValueChange={(v) =>
                              handleSelectChange("status", v)
                            }
                          >
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      name="description"
                      value={state.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-6">
                    <Button type="button" variant="outline" onClick={clearForm}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= ALL PRODUCTS ================= */}
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>HSN</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>GST %</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-10 text-gray-500"
                          >
                            No products found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((p) => (
                          <TableRow key={p.id}>
                            <TableCell>{p.hsn}</TableCell>
                            <TableCell className="font-semibold">
                              {p.name}
                            </TableCell>
                            <TableCell>{p.type}</TableCell>
                            <TableCell>{p.gstRate}%</TableCell>
                            <TableCell>{p.salePrice}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  p.status === "active"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {p.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex justify-center gap-2">
                                <Button size="icon" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
