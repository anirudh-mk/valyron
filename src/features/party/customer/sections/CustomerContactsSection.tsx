import { useState } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Switch } from "@/components/base/switch.tsx";
import { Textarea } from "@/components/base/textarea.tsx";
import { Input } from "@/components/base/input.tsx";
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
  Info,
  Plus,
  Trash2,
  Users,
} from "lucide-react";

export interface CustomerContact {
  id: string;
  salutation: string;
  firstName: string;
  lastName: string;
  designation: string;
  department: string;
  contactType: string;
  email: string;
  phone: string;
  mobile: string;
  alternativePhone: string;
  preferredContactMethod: string;
  isPrimary: boolean;
  communicationAddress: string;
  preferredLanguage: string;
  notes: string;
}

interface CustomerContactsSectionProps {
  contacts: CustomerContact[];
  addresses: { id: string; name: string }[];
  onAddContact: () => void;
  onDeleteContact: (id: string) => void;
  onUpdateContact: (id: string, field: keyof CustomerContact, value: any) => void;
}

const SALUTATIONS = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."] as const;
const CONTACT_TYPES = ["Primary Contact", "Secondary Contact", "Billing Contact", "Shipping Contact", "Other"] as const;
const CONTACT_METHODS = ["Email", "Phone", "SMS", "WhatsApp"] as const;
const LANGUAGES = ["English", "Malayalam", "Hindi", "Tamil", "Arabic"] as const;

export default function CustomerContactsSection({
  contacts,
  addresses,
  onAddContact,
  onDeleteContact,
  onUpdateContact,
}: CustomerContactsSectionProps) {
  const [activeContactId, setActiveContactId] = useState<string | null>(
    contacts.length > 0 ? contacts[0].id : null
  );

  const activeContact = contacts.find((c) => c.id === activeContactId) || null;

  // Helper to extract initials for the contact list avatar
  const getInitials = (firstName: string, lastName: string) => {
    if (!firstName && !lastName) return "C";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!activeContactId) return;
    const { name, value } = e.target;
    onUpdateContact(activeContactId, name as keyof CustomerContact, value);
  };

  const handleSelectChange = (field: keyof CustomerContact, value: string) => {
    if (!activeContactId) return;
    onUpdateContact(activeContactId, field, value);
  };

  const handleSwitchChange = (checked: boolean) => {
    if (!activeContactId) return;
    onUpdateContact(activeContactId, "isPrimary", checked);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-lg border border-border/50 shadow-xs">
        <div>
          <h3 className="text-base font-semibold text-foreground">Customer Contacts</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Manage primary and secondary contacts for this customer.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onAddContact();
            // Focus new contact
            if (contacts.length > 0) {
              const nextId = contacts[contacts.length - 1].id;
              setActiveContactId(nextId);
            }
          }}
          type="button"
          className="text-xs font-semibold gap-1.5 self-end sm:self-auto h-9"
        >
          <Plus className="h-4 w-4" /> Add Contact
        </Button>
      </div>

      {/* Main Grid: Left List (1/3) & Right Form Details (2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Left Column: All Contacts List */}
        <Card className="border border-border/50 shadow-sm h-fit">
          <div className="p-4 border-b border-border/50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              All Contacts ({contacts.length})
            </h4>
          </div>
          <div className="p-2 space-y-1 max-h-[480px] overflow-y-auto">
            {contacts.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No contacts added.
              </div>
            ) : (
              contacts.map((contact) => {
                const isActive = contact.id === activeContactId;
                const displayName = `${contact.firstName} ${contact.lastName}`.trim() || "Unnamed Contact";
                return (
                  <div
                    key={contact.id}
                    onClick={() => setActiveContactId(contact.id)}
                    className={`flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors group ${
                      isActive
                        ? "bg-primary/15 text-foreground font-medium"
                        : "hover:bg-accent/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold shrink-0">
                        {getInitials(contact.firstName, contact.lastName)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate text-foreground">
                          {displayName}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {contact.designation || "No designation"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {contact.isPrimary && (
                        <span className="text-[9px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-sm">
                          Primary
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteContact(contact.id);
                          if (activeContactId === contact.id) {
                            const remaining = contacts.filter((c) => c.id !== contact.id);
                            setActiveContactId(remaining.length > 0 ? remaining[0].id : null);
                          }
                        }}
                        type="button"
                        className="opacity-0 group-hover:opacity-100 hover:text-destructive p-1 rounded-sm transition-opacity"
                        title="Delete contact"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
            <button
              onClick={onAddContact}
              type="button"
              className="w-full flex items-center justify-center gap-1.5 p-2 border border-dashed border-border/80 hover:border-primary/50 text-xs font-medium text-muted-foreground hover:text-primary rounded-md mt-2 transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Add New Contact
            </button>
          </div>
        </Card>

        {/* Right Column: Contact Details Form */}
        <div className="min-w-0">
          {activeContact ? (
            <Card className="border border-border/50 shadow-sm">
              <CardContent className="p-5 space-y-5">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Contact Details</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Edit personal and professional info for this contact.</p>
                </div>

                {/* Grid Row 1: Salutation, First Name, Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-[110px_1fr_1fr] gap-4">
                  <Field>
                    <FieldLabel>Salutation</FieldLabel>
                    <Combobox
                      value={activeContact.salutation}
                      onValueChange={(val) => handleSelectChange("salutation", val || "")}
                      items={SALUTATIONS}
                    >
                      <ComboboxInput placeholder="Select" />
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
                    <FieldLabel>First Name <span className="text-destructive">*</span></FieldLabel>
                    <Input
                      name="firstName"
                      value={activeContact.firstName}
                      onChange={handleTextChange}
                      placeholder="e.g., Rahul"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Last Name <span className="text-destructive">*</span></FieldLabel>
                    <Input
                      name="lastName"
                      value={activeContact.lastName}
                      onChange={handleTextChange}
                      placeholder="e.g., Kumar"
                      required
                    />
                  </Field>
                </div>

                {/* Grid Row 2: Designation, Department, Contact Type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel>Designation</FieldLabel>
                    <Input
                      name="designation"
                      value={activeContact.designation}
                      onChange={handleTextChange}
                      placeholder="e.g., Accounts Manager"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Department</FieldLabel>
                    <Input
                      name="department"
                      value={activeContact.department}
                      onChange={handleTextChange}
                      placeholder="e.g., Accounts"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Contact Type</FieldLabel>
                    <Combobox
                      value={activeContact.contactType}
                      onValueChange={(val) => handleSelectChange("contactType", val || "")}
                      items={CONTACT_TYPES}
                    >
                      <ComboboxInput placeholder="Select contact type" />
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
                </div>

                {/* Grid Row 3: Email, Phone, Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel>Email <span className="text-destructive">*</span></FieldLabel>
                    <Input
                      type="email"
                      name="email"
                      value={activeContact.email}
                      onChange={handleTextChange}
                      placeholder="e.g., rahul.kumar@acme.com"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Phone (Office)</FieldLabel>
                    <Input
                      name="phone"
                      value={activeContact.phone}
                      onChange={handleTextChange}
                      placeholder="e.g., +91 495 123 4567"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Mobile <span className="text-destructive">*</span></FieldLabel>
                    <Input
                      name="mobile"
                      value={activeContact.mobile}
                      onChange={handleTextChange}
                      placeholder="e.g., +91 98765 43210"
                      required
                    />
                  </Field>
                </div>

                {/* Grid Row 4: Alternative Phone, Preferred Method, Is Primary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Field>
                    <FieldLabel>Alternative Phone</FieldLabel>
                    <Input
                      name="alternativePhone"
                      value={activeContact.alternativePhone}
                      onChange={handleTextChange}
                      placeholder="e.g., +91 98956 78901"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Preferred Contact Method</FieldLabel>
                    <Combobox
                      value={activeContact.preferredContactMethod}
                      onValueChange={(val) => handleSelectChange("preferredContactMethod", val || "")}
                      items={CONTACT_METHODS}
                    >
                      <ComboboxInput placeholder="Select contact method" />
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

                  <div className="flex items-center gap-2 pt-5">
                    <Switch
                      id="is-primary-contact"
                      checked={activeContact.isPrimary}
                      onCheckedChange={handleSwitchChange}
                    />
                    <label
                      htmlFor="is-primary-contact"
                      className="text-xs font-semibold text-foreground cursor-pointer select-none"
                    >
                      Is Primary Contact
                    </label>
                  </div>
                </div>

                {/* Address & Communication Sub-Section */}
                <div className="pt-2 border-t border-border/50">
                  <h5 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Address & Communication</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Communication Address</FieldLabel>
                      <Combobox
                        value={activeContact.communicationAddress}
                        onValueChange={(val) => handleSelectChange("communicationAddress", val || "")}
                        items={addresses.map((a) => a.name).filter(Boolean)}
                      >
                        <ComboboxInput placeholder="Select billing/shipping" />
                        <ComboboxContent>
                          <ComboboxEmpty>No addresses found.</ComboboxEmpty>
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
                      <FieldLabel>Preferred Language</FieldLabel>
                      <Combobox
                        value={activeContact.preferredLanguage}
                        onValueChange={(val) => handleSelectChange("preferredLanguage", val || "")}
                        items={LANGUAGES}
                      >
                        <ComboboxInput placeholder="Select language" />
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
                  </div>
                </div>

                {/* Notes Textarea */}
                <Field>
                  <div className="flex justify-between">
                    <FieldLabel>Notes (Optional)</FieldLabel>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {(activeContact.notes || "").length}/300
                    </span>
                  </div>
                  <Textarea
                    name="notes"
                    value={activeContact.notes}
                    onChange={handleTextChange}
                    maxLength={300}
                    placeholder="Add any notes about this contact..."
                    className="min-h-[70px]"
                  />
                </Field>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-2.5 pt-3">
                  <Button variant="outline" size="sm" type="button" className="text-xs font-semibold">
                    Cancel
                  </Button>
                  <Button variant="default" size="sm" type="button" className="text-xs font-semibold">
                    Save Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-dashed border-border/80 flex flex-col items-center justify-center p-12 text-center h-[500px]">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">No Active Contact Selected</h4>
              <p className="text-xs text-muted-foreground max-w-sm mt-1">
                Select a contact from the left list or add a new contact to configure details.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Info Banner */}
      <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3.5 rounded-lg border border-blue-500/20 text-xs">
        <Info className="h-4.5 w-4.5 shrink-0" />
        <p>You can add multiple contacts for each customer. One contact can be marked as primary.</p>
      </div>
    </div>
  );
}
