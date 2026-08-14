import { useState } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Switch } from "@/components/base/switch.tsx";
import { Input } from "@/components/base/input.tsx";
import { Textarea } from "@/components/base/textarea.tsx";
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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
} from "@/components/base/input-group.tsx";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/base/combobox.tsx";
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  Phone,
  Mail,
  Star,
  MoreHorizontal,
  Info,
} from "lucide-react";

export interface SupplierContact {
  id: string;
  name: string;
  designation: string;
  phone: string;
  email: string;
  isPrimary: boolean;
  status: string;
  alternatePhone: string;
  relationship: string;
  alternateEmail: string;
  preferredCommunication: string;
  notes: string;
}

interface SupplierContactsSectionProps {
  contacts: SupplierContact[];
  onAddContact: () => void;
  onDeleteContact: (id: string) => void;
  onUpdateContact: (id: string, field: keyof SupplierContact, value: any) => void;
}

const RELATION_TYPES = ["Primary Contact", "Alternate Contact", "Billing Contact", "Shipping Contact", "Technical Contact"] as const;
const COMM_METHODS = ["Email", "Phone", "SMS", "WhatsApp"] as const;

export default function SupplierContactsSection({
  contacts,
  onAddContact,
  onDeleteContact,
  onUpdateContact,
}: SupplierContactsSectionProps) {
  const [activeContactId, setActiveContactId] = useState<string | null>(
    contacts.length > 0 ? contacts[0].id : null
  );

  const activeContact = contacts.find((c) => c.id === activeContactId) || null;

  // Calculate statistics
  const totalCount = contacts.length;
  const primaryCount = contacts.filter((c) => c.isPrimary).length;
  const activeCount = contacts.filter((c) => c.status === "Active").length;
  const inactiveCount = contacts.filter((c) => c.status === "Inactive").length;

  const getInitials = (name: string) => {
    if (!name) return "C";
    return name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const getAvatarColorClass = (id: string) => {
    const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/15",
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15",
      "bg-orange-500/10 text-orange-500 border border-orange-500/15",
      "bg-pink-500/10 text-pink-500 border border-pink-500/15",
    ];
    return colors[hash % colors.length];
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!activeContactId) return;
    const { name, value } = e.target;
    onUpdateContact(activeContactId, name as keyof SupplierContact, value);
  };

  const handleSelectChange = (field: keyof SupplierContact, value: string) => {
    if (!activeContactId) return;
    onUpdateContact(activeContactId, field, value);
  };

  const handleSwitchChange = (field: keyof SupplierContact, checked: boolean) => {
    if (!activeContactId) return;
    onUpdateContact(activeContactId, field, checked ? "Active" : "Inactive");
  };

  const togglePrimary = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      onUpdateContact(id, "isPrimary", !contact.isPrimary);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-lg border border-border/50 shadow-xs">
        <div>
          <h3 className="text-base font-semibold text-foreground">Contacts</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Manage all primary contacts from this supplier.</p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onAddContact}
            className="text-xs font-semibold gap-1.5 h-9"
            type="button"
          >
            <Plus className="h-4 w-4" /> Add New Contact
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
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Total Contacts</span>
              <p className="text-xl font-extrabold text-foreground">{totalCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Users className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Primary Contacts</span>
              <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400">{primaryCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Star className="h-4.5 w-4.5 fill-blue-500/10" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Active Contacts</span>
              <p className="text-xl font-extrabold text-green-600 dark:text-green-400">{activeCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <Users className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Inactive Contacts</span>
              <p className="text-xl font-extrabold text-muted-foreground">{inactiveCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Users className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contacts Data Table Grid */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-b border-border/30 h-10">
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[25%]">Contact Name</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[20%]">Department / Designation</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[18%]">Phone</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[22%]">Email</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[8%] text-center">Primary</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[8%]">Status</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[70px] text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-28 text-center text-xs text-muted-foreground">
                      No contacts added yet. Click "+ Add New Contact" to configure people.
                    </TableCell>
                  </TableRow>
                ) : (
                  contacts.map((contact) => {
                    const isSelected = contact.id === activeContactId;
                    return (
                      <TableRow
                        key={contact.id}
                        onClick={() => setActiveContactId(contact.id)}
                        className={`hover:bg-accent/10 border-b border-border/30 h-14 cursor-pointer transition-colors ${
                          isSelected ? "bg-primary/5" : ""
                        }`}
                      >
                        <TableCell className="py-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getAvatarColorClass(contact.id)}`}>
                              {getInitials(contact.name)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-foreground truncate">
                                {contact.name || "Unnamed"}
                              </p>
                              {contact.isPrimary && (
                                <span className="text-[9px] font-bold text-primary bg-primary/10 px-1 py-0.5 rounded-sm block w-fit mt-0.5">
                                  Primary
                                </span>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-2 text-xs font-semibold text-foreground">
                          {contact.designation || "—"}
                        </TableCell>
                        <TableCell className="py-2">
                          {contact.phone ? (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                              <Phone className="h-3.5 w-3.5" />
                              <span>{contact.phone}</span>
                            </div>
                          ) : "—"}
                        </TableCell>
                        <TableCell className="py-2">
                          {contact.email ? (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                              <Mail className="h-3.5 w-3.5" />
                              <span className="truncate max-w-[160px]">{contact.email}</span>
                            </div>
                          ) : "—"}
                        </TableCell>
                        <TableCell className="py-2 text-center" onClick={(e) => togglePrimary(contact.id, e)}>
                          <div className="flex items-center justify-center">
                            {contact.isPrimary ? (
                              <Star className="h-4.5 w-4.5 text-blue-500 fill-blue-500 cursor-pointer" />
                            ) : (
                              <Star className="h-4.5 w-4.5 text-muted-foreground/60 cursor-pointer hover:text-blue-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Badge className={`border-none font-semibold text-[10px] w-fit ${
                            contact.status === "Active"
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : "bg-destructive/10 text-destructive"
                          }`}>
                            {contact.status || "Active"}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => setActiveContactId(contact.id)}
                              className="hover:bg-accent p-1.5 rounded-sm hover:text-foreground text-muted-foreground transition-colors cursor-pointer"
                              title="Edit contact details"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteContact(contact.id)}
                              className="hover:bg-accent p-1.5 rounded-sm hover:text-destructive text-muted-foreground transition-colors cursor-pointer"
                              title="Delete contact"
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
              Showing 1 to {contacts.length} of {contacts.length} contacts
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

      {/* Contact Details Form Block */}
      {activeContact ? (
        <Card className="border border-border/50 shadow-sm text-left">
          <CardContent className="p-5 space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-foreground">Contact Details</h4>
              <p className="text-xs text-muted-foreground mt-0.5">View and edit the details of the selected contact.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Field>
                <FieldLabel>Contact Name <span className="text-destructive">*</span></FieldLabel>
                <Input
                  name="name"
                  value={activeContact.name}
                  onChange={handleTextChange}
                  placeholder="e.g., Ravi Sharma"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Department / Designation</FieldLabel>
                <Input
                  name="designation"
                  value={activeContact.designation}
                  onChange={handleTextChange}
                  placeholder="e.g., Purchase Manager"
                />
              </Field>

              <Field>
                <FieldLabel>Alternate Phone</FieldLabel>
                <Input
                  name="alternatePhone"
                  value={activeContact.alternatePhone}
                  onChange={handleTextChange}
                  placeholder="Enter alternate phone"
                />
              </Field>

              <Field>
                <FieldLabel>Relationship</FieldLabel>
                <Combobox
                  value={activeContact.relationship || "Alternate Contact"}
                  onValueChange={(val) => handleSelectChange("relationship", val || "")}
                  items={RELATION_TYPES}
                >
                  <ComboboxInput placeholder="Select relation" className="h-9 text-xs" />
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
              <Field>
                <FieldLabel>Phone <span className="text-destructive">*</span></FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>🇮🇳 +91</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    name="phone"
                    value={activeContact.phone.replace("+91 ", "")}
                    onChange={(e) => onUpdateContact(activeContact.id, "phone", `+91 ${e.target.value}`)}
                    placeholder="98765 43210"
                    required
                  />
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel>Email <span className="text-destructive">*</span></FieldLabel>
                <Input
                  type="email"
                  name="email"
                  value={activeContact.email}
                  onChange={handleTextChange}
                  placeholder="e.g., ravi.sharma@supplier.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Alternate Email</FieldLabel>
                <Input
                  name="alternateEmail"
                  value={activeContact.alternateEmail}
                  onChange={handleTextChange}
                  placeholder="e.g., ravi.s@supplier.com"
                />
              </Field>

              <Field>
                <FieldLabel>Preferred Communication</FieldLabel>
                <Combobox
                  value={activeContact.preferredCommunication || "Email"}
                  onValueChange={(val) => handleSelectChange("preferredCommunication", val || "")}
                  items={COMM_METHODS}
                >
                  <ComboboxInput placeholder="Select method" className="h-9 text-xs" />
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
                  id="form-contact-status"
                  checked={activeContact.status !== "Inactive"}
                  onCheckedChange={(c) => handleSwitchChange("status", c)}
                />
                <label
                  htmlFor="form-contact-status"
                  className="text-xs font-semibold text-foreground cursor-pointer select-none"
                >
                  Active
                </label>
              </div>
            </div>

            <Field>
              <div className="flex justify-between">
                <FieldLabel>Notes</FieldLabel>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {(activeContact.notes || "").length}/500
                </span>
              </div>
              <Textarea
                name="notes"
                value={activeContact.notes}
                onChange={handleTextChange}
                maxLength={500}
                placeholder="Add notes about this contact..."
                className="min-h-[80px]"
              />
            </Field>
          </CardContent>
        </Card>
      ) : null}

      {/* Info instruction footer */}
      <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-lg border border-blue-500/20 text-xs">
        <Info className="h-4 w-4 shrink-0" />
        <p>Primary contacts will be used for important communications and approvals.</p>
      </div>
    </div>
  );
}
