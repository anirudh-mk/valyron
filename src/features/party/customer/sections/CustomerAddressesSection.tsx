import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card.tsx";
import { Input } from "@/components/base/input.tsx";
import { Textarea } from "@/components/base/textarea.tsx";
import { Checkbox } from "@/components/base/checkbox.tsx";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/base/combobox.tsx";
import { Field, FieldLabel } from "@/components/base/field.tsx";
import { Building, Plus, Trash2, MoreVertical, Info } from "lucide-react";

export interface CustomerAddress {
  id: string;
  type: string;
  name: string;
  addressText: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  gstTreatment: string;
  taxId: string;
  pan: string;
  phone: string;
  email: string;
  mobile: string;
  contactPerson: string;
  designation: string;
  deliveryInstructions: string;
  isPrimaryBilling: boolean;
  isPrimaryShipping: boolean;
}

interface CustomerAddressesSectionProps {
  addresses: CustomerAddress[];
  activeAddressId: string | null;
  setActiveAddressId: (id: string | null) => void;
  onAddressChange: (id: string, field: string, value: any) => void;
  onAddAddress: () => void;
  onDeleteAddress: (id: string) => void;
}

const ADDRESS_TYPE_OPTIONS = ["Billing Address", "Shipping Address", "Registered Office", "Branch Office", "Other Address"] as const;
const COUNTRY_OPTIONS = ["India", "United States", "United Kingdom", "Germany", "France"] as const;
const STATE_OPTIONS = ["Kerala", "Karnataka", "Tamil Nadu", "Maharashtra", "Delhi", "Bangalore"] as const;
const GST_TREATMENT_OPTIONS = ["Registered Business", "Unregistered Business", "Consumer", "SEZ"] as const;

export default function CustomerAddressesSection({
  addresses,
  activeAddressId,
  setActiveAddressId,
  onAddressChange,
  onAddAddress,
  onDeleteAddress,
}: CustomerAddressesSectionProps) {
  const activeAddress = addresses.find((addr) => addr.id === activeAddressId);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!activeAddressId) return;
    const { name, value } = e.target;
    onAddressChange(activeAddressId, name, value);
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!activeAddressId) return;
    onAddressChange(activeAddressId, name, value);
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (!activeAddressId) return;
    onAddressChange(activeAddressId, "isPrimaryBilling", checked);
  };

  // Find the primary billing address name for header display
  const primaryBillingAddr = addresses.find((addr) => addr.isPrimaryBilling);
  const primaryBillingValue = primaryBillingAddr ? primaryBillingAddr.name : "";

  const handlePrimaryBillingDropdownChange = (val: string) => {
    const matchedAddr = addresses.find((addr) => addr.name === val);
    if (matchedAddr) {
      addresses.forEach((addr) => {
        onAddressChange(addr.id, "isPrimaryBilling", addr.id === matchedAddr.id);
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-lg border border-border/50 shadow-xs">
        <div>
          <h3 className="text-base font-semibold text-foreground">Customer Addresses</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Manage billing and shipping addresses for this customer.</p>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Primary billing selection dropdown */}
          <div className="flex items-center gap-1.5">
            <Combobox
              value={primaryBillingValue}
              onValueChange={(val) => handlePrimaryBillingDropdownChange(val || "")}
              items={addresses.map((addr) => addr.name).filter(Boolean)}
            >
              <ComboboxInput placeholder="Select primary billing" className="h-8.5 text-xs w-[180px]" />
              <ComboboxContent>
                <ComboboxEmpty>No addresses found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item} className="text-xs">
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>

          <button
            type="button"
            onClick={onAddAddress}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Add Address
          </button>
        </div>
      </div>

      {/* Main Split Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 items-start">
        {/* Left column: Address Cards List */}
        <div className="space-y-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              onClick={() => setActiveAddressId(address.id)}
              className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                address.id === activeAddressId
                  ? "border-primary bg-primary/5 shadow-xs"
                  : "border-border/60 hover:border-border bg-card shadow-2xs"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-primary">
                    {address.type} {address.isPrimaryBilling && "(Primary)"}
                  </span>
                  <h4 className="text-xs font-bold text-foreground mt-1 truncate">{address.name || "Unnamed Address"}</h4>
                  <p className="text-2xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                    {address.addressText || "No address text entered"}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={address.id === activeAddressId}
                    onChange={() => setActiveAddressId(address.id)}
                    className="h-3.5 w-3.5 text-primary border-border cursor-pointer"
                  />
                  <MoreVertical className="h-3.5 w-3.5 text-muted-foreground/80 hover:text-foreground cursor-pointer" />
                </div>
              </div>
            </div>
          ))}

          {/* Add New Address Trigger */}
          <button
            type="button"
            onClick={onAddAddress}
            className="w-full py-4 border border-dashed border-border/70 hover:border-primary/50 hover:bg-primary/5 rounded-lg text-xs font-medium text-muted-foreground hover:text-primary flex items-center justify-center gap-1 cursor-pointer transition-all"
          >
            <Plus className="h-4 w-4" /> Add New Address
          </button>
        </div>

        {/* Right column: Selected Address Form */}
        <div className="min-w-0">
          {activeAddress ? (
            <Card className="border border-border/50 shadow-sm">
              <CardContent className="p-4 space-y-4">
                {/* Row 1: Address Type, Name, IsPrimary */}
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_auto] gap-4 items-center">
                  <Field>
                    <FieldLabel>Address Type <span className="text-destructive">*</span></FieldLabel>
                    <Combobox
                      value={activeAddress.type}
                      onValueChange={(val) => handleSelectChange("type", val || "")}
                      items={ADDRESS_TYPE_OPTIONS}
                    >
                      <ComboboxInput placeholder="Select address type" />
                      <ComboboxContent>
                        <ComboboxEmpty>No results found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </Field>

                  <Field>
                    <FieldLabel>Address Name <span className="text-destructive">*</span></FieldLabel>
                    <Input
                      name="name"
                      value={activeAddress.name}
                      onChange={handleTextChange}
                      placeholder="e.g., Acme Corporation - Head Office"
                      required
                    />
                  </Field>

                  <div className="flex items-center gap-2 pt-5">
                    <Checkbox
                      id="is-primary-billing"
                      checked={activeAddress.isPrimaryBilling}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor="is-primary-billing"
                      className="text-xs font-semibold text-foreground cursor-pointer select-none"
                    >
                      Set as primary billing address
                    </label>
                  </div>
                </div>

                {/* Row 2: Address Textarea */}
                <Field>
                  <FieldLabel>Address <span className="text-destructive">*</span></FieldLabel>
                  <Textarea
                    name="addressText"
                    value={activeAddress.addressText}
                    onChange={handleTextChange}
                    placeholder="Enter detailed address info..."
                    className="min-h-[80px]"
                    required
                  />
                </Field>

                {/* Row 3: Country, State, City, Pincode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Field>
                    <FieldLabel>Country <span className="text-destructive">*</span></FieldLabel>
                    <Combobox
                      value={activeAddress.country}
                      onValueChange={(val) => handleSelectChange("country", val || "")}
                      items={COUNTRY_OPTIONS}
                    >
                      <ComboboxInput placeholder="Select Country" />
                      <ComboboxContent>
                        <ComboboxEmpty>No results found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
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
                      <ComboboxInput placeholder="Select State" />
                      <ComboboxContent>
                        <ComboboxEmpty>No results found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </Field>

                  <Field>
                    <FieldLabel>City <span className="text-destructive">*</span></FieldLabel>
                    <Input
                      name="city"
                      value={activeAddress.city}
                      onChange={handleTextChange}
                      placeholder="e.g., Kozhikode"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Pincode <span className="text-destructive">*</span></FieldLabel>
                    <Input
                      name="pincode"
                      value={activeAddress.pincode}
                      onChange={handleTextChange}
                      placeholder="e.g., 673001"
                      required
                    />
                  </Field>
                </div>

                {/* Row 4: GST Treatment, GSTIN, PAN */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel>GST Treatment</FieldLabel>
                    <Combobox
                      value={activeAddress.gstTreatment}
                      onValueChange={(val) => handleSelectChange("gstTreatment", val || "")}
                      items={GST_TREATMENT_OPTIONS}
                    >
                      <ComboboxInput placeholder="Select GST Treatment" />
                      <ComboboxContent>
                        <ComboboxEmpty>No results found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </Field>

                  <Field>
                    <FieldLabel>GSTIN / Tax ID</FieldLabel>
                    <Input
                      name="taxId"
                      value={activeAddress.taxId}
                      onChange={handleTextChange}
                      placeholder="32XXXXXXXXXX125"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>PAN / Tax No.</FieldLabel>
                    <Input
                      name="pan"
                      value={activeAddress.pan}
                      onChange={handleTextChange}
                      placeholder="XXXXX1234X"
                    />
                  </Field>
                </div>

                {/* Row 5: Phone, Email, Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel>Phone</FieldLabel>
                    <Input
                      name="phone"
                      value={activeAddress.phone}
                      onChange={handleTextChange}
                      placeholder="+91 98765 43210"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      name="email"
                      value={activeAddress.email}
                      onChange={handleTextChange}
                      placeholder="accounts@acme.com"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Mobile</FieldLabel>
                    <Input
                      name="mobile"
                      value={activeAddress.mobile}
                      onChange={handleTextChange}
                      placeholder="+91 98765 43210"
                    />
                  </Field>
                </div>

                {/* Row 6: Contact Person, Designation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Contact Person</FieldLabel>
                    <Input
                      name="contactPerson"
                      value={activeAddress.contactPerson}
                      onChange={handleTextChange}
                      placeholder="Rahul Kumar"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Designation</FieldLabel>
                    <Input
                      name="designation"
                      value={activeAddress.designation}
                      onChange={handleTextChange}
                      placeholder="Accounts Manager"
                    />
                  </Field>
                </div>

                {/* Row 7: Delivery Instructions */}
                <Field>
                  <FieldLabel>Delivery Instructions (Optional)</FieldLabel>
                  <Textarea
                    name="deliveryInstructions"
                    value={activeAddress.deliveryInstructions}
                    onChange={handleTextChange}
                    placeholder="e.g. Gate No. 3, 2nd floor. Call before delivery."
                    className="min-h-[60px]"
                  />
                </Field>

                {/* Form Footer Actions */}
                <Separator className="my-2" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-1.5 text-2xs text-muted-foreground">
                    <Info className="h-3.5 w-3.5" />
                    <span>You can add multiple address types for this customer and mark one as primary.</span>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => onDeleteAddress(activeAddress.id)}
                      className="text-xs font-semibold text-destructive hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAddressId(null)}
                      className="px-3.5 py-1.5 border border-border/80 text-foreground hover:bg-muted text-xs font-semibold rounded-md transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {}}
                      className="px-3.5 py-1.5 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold rounded-md shadow-sm transition-all"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="p-12 border border-dashed rounded-lg text-center text-muted-foreground text-sm bg-card shadow-2xs">
              No address selected. Select an address card on the left or click "+ Add New Address" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
const Separator = ({ className }: { className?: string }) => (
  <div className={`h-[1px] w-full bg-border ${className}`} />
);
