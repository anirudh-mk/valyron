import { useState } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Switch } from "@/components/base/switch.tsx";
import { Input } from "@/components/base/input.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table.tsx";
import {
  Field,
  FieldLabel,
} from "@/components/base/field.tsx";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/base/combobox.tsx";
import {
  MapPin,
  Home,
  Building,
  Truck,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  GripVertical,
  MoreHorizontal,
  Info,
} from "lucide-react";

export interface SupplierAddress {
  id: string;
  type: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  gstPlaceOfSupply: string;
  isBilling: boolean;
  isShipping: boolean;
  status: string;
}

interface SupplierAddressesSectionProps {
  addresses: SupplierAddress[];
  activeAddressId: string | null;
  setActiveAddressId: (id: string | null) => void;
  onAddressChange: (id: string, field: string, value: any) => void;
  onAddAddress: () => void;
  onDeleteAddress: (id: string) => void;
}

const ADDRESS_TYPES = ["Registered", "Billing", "Shipping", "Warehouse", "Branch", "Other"] as const;
const COUNTRY_OPTIONS = ["India", "United States", "United Kingdom", "Germany", "Singapore"] as const;
const STATE_OPTIONS = ["Karnataka", "Kerala", "Tamil Nadu", "Maharashtra", "Delhi"] as const;
const GST_PLACES = ["Karnataka (29)", "Kerala (32)", "Tamil Nadu (33)", "Maharashtra (27)", "Delhi (07)"] as const;

export default function SupplierAddressesSection({
  addresses,
  activeAddressId,
  setActiveAddressId,
  onAddressChange,
  onAddAddress,
  onDeleteAddress,
}: SupplierAddressesSectionProps) {
  const activeAddress = addresses.find((addr) => addr.id === activeAddressId) || null;

  // Calculate statistics
  const totalCount = addresses.length;
  const billingCount = addresses.filter((d) => d.isBilling).length;
  const shippingCount = addresses.filter((d) => d.isShipping).length;
  const otherCount = addresses.filter((d) => !d.isBilling && !d.isShipping).length;

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "Registered":
        return (
          <div className="h-8 w-8 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/15">
            <Home className="h-4.5 w-4.5" />
          </div>
        );
      case "Billing":
        return (
          <div className="h-8 w-8 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/15">
            <Building className="h-4.5 w-4.5" />
          </div>
        );
      case "Shipping":
      case "Warehouse":
        return (
          <div className="h-8 w-8 rounded-md bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 border border-orange-500/15">
            <Truck className="h-4.5 w-4.5" />
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-md bg-muted text-muted-foreground flex items-center justify-center shrink-0 border border-border">
            <MapPin className="h-4.5 w-4.5" />
          </div>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Registered":
        return (
          <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-none font-semibold text-[10px] uppercase">
            Registered
          </Badge>
        );
      case "Billing":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-semibold text-[10px] uppercase">
            Billing
          </Badge>
        );
      case "Shipping":
      case "Warehouse":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 border-none font-semibold text-[10px] uppercase">
            Shipping
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-[10px] uppercase font-semibold">
            {type}
          </Badge>
        );
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeAddressId) return;
    const { name, value } = e.target;
    onAddressChange(activeAddressId, name, value);
  };

  const handleSelectChange = (field: string, value: string) => {
    if (!activeAddressId) return;
    onAddressChange(activeAddressId, field, value);
  };

  const handleSwitchChange = (field: string, checked: boolean) => {
    if (!activeAddressId) return;
    onAddressChange(activeAddressId, field, checked);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-lg border border-border/50 shadow-xs">
        <div>
          <h3 className="text-base font-semibold text-foreground">Addresses</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Add and manage all addresses for this supplier.</p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onAddAddress}
            className="text-xs font-semibold gap-1.5 h-9"
            type="button"
          >
            <Plus className="h-4 w-4" /> Add New Address
          </Button>
          <Button variant="ghost" size="icon-sm" type="button" className="h-9 w-9">
            <MoreHorizontal className="h-4.5 w-4.5" />
          </Button>
        </div>
      </div>

      {/* Stats Summary Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border border-border/50 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Total Addresses</span>
              <p className="text-xl font-extrabold text-foreground">{totalCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <MapPin className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Billing Addresses</span>
              <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400">{billingCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Building className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Shipping Addresses</span>
              <p className="text-xl font-extrabold text-orange-500">{shippingCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Truck className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Other Addresses</span>
              <p className="text-xl font-extrabold text-muted-foreground">{otherCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <MapPin className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Address Table Grid */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-b border-border/30 h-10">
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[23%]">Address Name</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[37%]">Address</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[12%]">Type</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[10%] text-center">Billing</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[10%] text-center">Shipping</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[8%]">Status</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[70px] text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addresses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-28 text-center text-xs text-muted-foreground">
                      No addresses added yet. Click "+ Add New Address" to configure locations.
                    </TableCell>
                  </TableRow>
                ) : (
                  addresses.map((addr) => {
                    const isSelected = addr.id === activeAddressId;
                    return (
                      <TableRow
                        key={addr.id}
                        onClick={() => setActiveAddressId(addr.id)}
                        className={`hover:bg-accent/10 border-b border-border/30 h-14 cursor-pointer transition-colors ${
                          isSelected ? "bg-primary/5" : ""
                        }`}
                      >
                        <TableCell className="py-2 text-center" onClick={(e) => e.stopPropagation()}>
                          <GripVertical className="h-4 w-4 text-muted-foreground/60 cursor-grab" />
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {getAddressIcon(addr.type)}
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-foreground truncate">
                                {addr.name}
                              </p>
                              {addr.id === "addr-1" && (
                                <span className="text-[9px] font-bold text-primary bg-primary/10 px-1 py-0.5 rounded-sm block w-fit mt-0.5">
                                  Primary
                                </span>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-2 text-xs font-semibold text-foreground leading-relaxed whitespace-pre-line">
                          {`Acme Supplies Pvt Ltd\n${addr.addressLine1}${addr.addressLine2 ? `, ${addr.addressLine2}` : ""}\n${addr.city} - ${addr.pincode}\n${addr.state}, ${addr.country}`}
                        </TableCell>
                        <TableCell className="py-2">
                          {getTypeBadge(addr.type)}
                        </TableCell>
                        <TableCell className="py-2 text-center">
                          <div className="flex items-center justify-center gap-1 text-[11px] font-bold">
                            {addr.isBilling ? (
                              <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                                <CheckCircle className="h-3.5 w-3.5 fill-green-600/10" /> Yes
                              </span>
                            ) : (
                              <span className="text-muted-foreground flex items-center gap-1">
                                <XCircle className="h-3.5 w-3.5 text-destructive/80 fill-destructive/10" /> No
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-2 text-center">
                          <div className="flex items-center justify-center gap-1 text-[11px] font-bold">
                            {addr.isShipping ? (
                              <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                                <CheckCircle className="h-3.5 w-3.5 fill-green-600/10" /> Yes
                              </span>
                            ) : (
                              <span className="text-muted-foreground flex items-center gap-1">
                                <XCircle className="h-3.5 w-3.5 text-destructive/80 fill-destructive/10" /> No
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-none font-semibold text-[10px] w-fit">
                            {addr.status || "Active"}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => setActiveAddressId(addr.id)}
                              className="hover:bg-accent p-1.5 rounded-sm hover:text-foreground text-muted-foreground transition-colors cursor-pointer"
                              title="Edit address details"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteAddress(addr.id)}
                              className="hover:bg-accent p-1.5 rounded-sm hover:text-destructive text-muted-foreground transition-colors cursor-pointer"
                              title="Delete address"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer Pagination Bar */}
          <div className="flex items-center justify-between p-4 border-t border-border/40 text-xs text-muted-foreground font-medium">
            <span>
              Showing 1 to {addresses.length} of {addresses.length} addresses
            </span>
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-1.5">
                <span>Show</span>
                <span className="bg-muted py-1 px-2.5 rounded-md border border-border/30 font-semibold text-foreground">
                  10 / page
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled
                  className="bg-primary text-primary-foreground font-bold h-7 w-7 rounded-md flex items-center justify-center"
                >
                  1
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Details Form Block */}
      {activeAddress ? (
        <Card className="border border-border/50 shadow-sm text-left">
          <CardContent className="p-5 space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-foreground">Address Details</h4>
              <p className="text-xs text-muted-foreground mt-0.5">View and edit the details of the selected address.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field>
                <FieldLabel>Address Name <span className="text-destructive">*</span></FieldLabel>
                <Input
                  name="name"
                  value={activeAddress.name}
                  onChange={handleTextChange}
                  placeholder="e.g., Registered Office"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Address Line 1 <span className="text-destructive">*</span></FieldLabel>
                <Input
                  name="addressLine1"
                  value={activeAddress.addressLine1}
                  onChange={handleTextChange}
                  placeholder="e.g., 123, Industrial Estate"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Landmark</FieldLabel>
                <Input
                  name="landmark"
                  value={activeAddress.landmark}
                  onChange={handleTextChange}
                  placeholder="e.g., Near Forum Shantiniketan"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <Field>
                <FieldLabel>Type <span className="text-destructive">*</span></FieldLabel>
                <Combobox
                  value={activeAddress.type}
                  onValueChange={(val) => handleSelectChange("type", val || "")}
                  items={ADDRESS_TYPES}
                >
                  <ComboboxInput placeholder="Select type" className="h-9 text-xs" />
                  <ComboboxContent>
                    <ComboboxEmpty>No results found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item} className="text-xs">
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>

              <Field>
                <FieldLabel>Address Line 2</FieldLabel>
                <Input
                  name="addressLine2"
                  value={activeAddress.addressLine2}
                  onChange={handleTextChange}
                  placeholder="e.g., Phase 2"
                />
              </Field>

              <Field>
                <FieldLabel>City <span className="text-destructive">*</span></FieldLabel>
                <Input
                  name="city"
                  value={activeAddress.city}
                  onChange={handleTextChange}
                  placeholder="e.g., Whitefield"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>PIN / ZIP Code <span className="text-destructive">*</span></FieldLabel>
                <Input
                  name="pincode"
                  value={activeAddress.pincode}
                  onChange={handleTextChange}
                  placeholder="e.g., 560066"
                  required
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-2 pt-4">
                <Switch
                  id="form-is-billing"
                  checked={activeAddress.isBilling}
                  onCheckedChange={(c) => handleSwitchChange("isBilling", c)}
                />
                <div className="flex items-baseline gap-1.5">
                  <label
                    htmlFor="form-is-billing"
                    className="text-xs font-semibold text-foreground cursor-pointer select-none"
                  >
                    Billing Address
                  </label>
                  <span className="text-[10px] text-muted-foreground font-semibold">
                    {activeAddress.isBilling ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <Field>
                <FieldLabel>Country <span className="text-destructive">*</span></FieldLabel>
                <Combobox
                  value={activeAddress.country}
                  onValueChange={(val) => handleSelectChange("country", val || "")}
                  items={COUNTRY_OPTIONS}
                >
                  <ComboboxInput placeholder="Select country" className="h-9 text-xs" />
                  <ComboboxContent>
                    <ComboboxEmpty>No results found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item} className="text-xs">
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>

              <Field>
                <FieldLabel>State <span className="text-destructive">*</span></FieldLabel>
                <Combobox
                  value={activeAddress.state}
                  onValueChange={(val) => handleSelectChange("state", val || "")}
                  items={STATE_OPTIONS}
                >
                  <ComboboxInput placeholder="Select state" className="h-9 text-xs" />
                  <ComboboxContent>
                    <ComboboxEmpty>No results found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item} className="text-xs">
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>

              <Field>
                <div className="flex items-center gap-1">
                  <FieldLabel>GST Registration (Place of Supply)</FieldLabel>
                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-pointer" />
                </div>
                <Combobox
                  value={activeAddress.gstPlaceOfSupply}
                  onValueChange={(val) => handleSelectChange("gstPlaceOfSupply", val || "")}
                  items={GST_PLACES}
                >
                  <ComboboxInput placeholder="Select Place" className="h-9 text-xs" />
                  <ComboboxContent>
                    <ComboboxEmpty>No results found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item} className="text-xs">
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-2 pt-2">
                <Switch
                  id="form-is-shipping"
                  checked={activeAddress.isShipping}
                  onCheckedChange={(c) => handleSwitchChange("isShipping", c)}
                />
                <div className="flex items-baseline gap-1.5">
                  <label
                    htmlFor="form-is-shipping"
                    className="text-xs font-semibold text-foreground cursor-pointer select-none"
                  >
                    Shipping Address
                  </label>
                  <span className="text-[10px] text-muted-foreground font-semibold">
                    {activeAddress.isShipping ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Info instruction footer */}
      <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-lg border border-blue-500/20 text-xs">
        <Info className="h-4 w-4 shrink-0" />
        <p>You can drag and drop addresses to change the order.</p>
      </div>
    </div>
  );
}
