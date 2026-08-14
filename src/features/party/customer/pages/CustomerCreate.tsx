import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/base/tabs.tsx";
import { Button } from "@/components/base/button.tsx";
import { ArrowLeft, ChevronDown, Save } from "lucide-react";
import CustomerGeneralSection from "../sections/CustomerGeneralSection";
import CustomerPreviewSection from "../sections/CustomerPreviewSection";
import CustomerAddressesSection, { type CustomerAddress } from "../sections/CustomerAddressesSection";
import CustomerContactsSection, { type CustomerContact } from "../sections/CustomerContactsSection";
import CustomerFinancialSection from "../sections/CustomerFinancialSection";
import CustomerSalesPricingSection from "../sections/CustomerSalesPricingSection";
import CustomerAccountingSection from "../sections/CustomerAccountingSection";
import CustomerDocumentsSection, { type CustomerDocument } from "../sections/CustomerDocumentsSection";
import CustomerAdditionalSection, { type CustomField } from "../sections/CustomerAdditionalSection";
import { createCustomer } from "@/services/customerService";

export default function CustomerCreate() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form state matching the design from screen mockups
  const [formState, setFormState] = useState({
    name: "",
    code: "",
    type: "Business",
    group: "Corporate",
    email: "",
    phone: "",
    alternatePhone: "",
    website: "",
    currency: "INR - Indian Rupee",
    preferredContact: "Email",
    customerSince: "10 May 2026",
    taxTreatment: "Registered Business",
    taxId: "",
    pan: "",
    notes: "",
    creditLimit: "500000.00",
    outstanding: "125000.00",
    overdue: "25000.00",
    paymentTerms: "Net 30",
    overdueTolerance: "7",
    maxInvoiceAmount: "100000.00",
    creditHold: false,
    creditHoldReason: "",
    checkCreditLimitInvoicing: true,
    checkOverdueInvoices: true,
    blockSalesCreditExceeded: true,
    requireApprovalCreditExceeded: true,
    approvalRequiredBy: "Sales Manager",
    notifyCreditApproachesLimit: true,
    preferredPaymentMethod: "Bank Transfer",
    discountAllowed: "Yes",
    cashDiscountPercent: "2.00",
    cashDiscountTerms: "Within 10 days",
    priceList: "Retail Price List",
    salesperson: "John Smith",
    customerGroup: "Corporate",
    salesChannel: "Direct Sales",
    defaultTax: "GST 18%",
    taxExemption: "No Exemption",
    roundingMethod: "Normal Rounding",
    priceDisplayPreference: "Tax Exclusive",
    allowManualPrice: true,
    allowDiscount: true,
    maxDiscountPercent: "15.00",
    priceOverrideApproval: false,
    cashDiscountPercentSales: "2.00",
    cashDiscountTermsSales: "Within 10 days",
    volumeDiscount: "Based on Price List",
    specialPricing: "Customer Specific",
    requireSalesOrder: false,
    requireCustomerPO: true,
    allowBackdatedInvoices: true,
    allowCreditSales: true,
    minOrderAmount: "10000.00",
    minInvoiceAmount: "5000.00",
    leadTimeDays: "2",
    partialDelivery: true,
    defaultWarehouse: "Main Warehouse",
    shipFromAddress: "Main Warehouse Address",
    deliveryPriority: "Normal",
    incoterms: "FOB - Free On Board",
    receivableAccount: "1101 - Accounts Receivable - Trade",
    salesAccount: "4001 - Sales - Domestic",
    advanceAccount: "2105 - Customer Advances",
    writeOffAccount: "5104 - Bad Debts Written Off",
    taxCategory: "Inter-State",
    gstin: "32XXXXXXXXXX125",
    placeOfSupply: "Kerala (32)",
    gstType: "Regular",
    eInvoicingApplicable: true,
    tan: "BLRA12345B",
    cin: "",
    msmeRegistrationNo: "",
    fssaiNo: "",
    itcEligibility: "Eligible",
    tdsApplicable: "Yes",
    tdsSection: "194H - Commission/Brokerage",
    tcsApplicable: "No",
    exchangeRateType: "Default Company Rate",
    exchangeRate: "1.0000",
    openingBalance: "0.00",
    openingBalanceDate: "2026-05-10",
    preferredLanguage: "English",
    timezone: "Asia/Kolkata (UTC +05:30)",
    communicationPreference: "Email",
    preferredContactMethod: "Email",
    marketingEmails: true,
    smsNotifications: false,
    industry: "Manufacturing",
    businessType: "Private Limited",
    customerTier: "Gold",
    region: "South India",
    defaultPricePrecision: "2 Decimal Places",
    defaultQuantityPrecision: "2 Decimal Places",
    dateFormat: "DD MMM YYYY",
    numberFormat: "Indian (1,23,456.78)"
  });

  // Manage addresses state with initial values matching the mockup design
  const [addresses, setAddresses] = useState<CustomerAddress[]>([
    {
      id: "addr-1",
      type: "Billing Address",
      name: "Acme Corporation - Head Office",
      addressText: "1st Floor, Acme Towers, Mavoor Road, Near Stadium, Kozhikode, Kerala - 673001, India",
      country: "India",
      state: "Kerala",
      city: "Kozhikode",
      pincode: "673001",
      gstTreatment: "Registered Business",
      taxId: "32XXXXXXXXXX125",
      pan: "XXXXX1234X",
      phone: "+91 98765 43210",
      email: "accounts@acme.com",
      mobile: "+91 98765 43210",
      contactPerson: "Rahul Kumar",
      designation: "Accounts Manager",
      deliveryInstructions: "",
      isPrimaryBilling: true,
      isPrimaryShipping: false,
    },
    {
      id: "addr-2",
      type: "Shipping Address",
      name: "Main Warehouse",
      addressText: "Main Warehouse, Near Stadium, Kozhikode, Kerala - 673001, India",
      country: "India",
      state: "Kerala",
      city: "Kozhikode",
      pincode: "673001",
      gstTreatment: "Registered Business",
      taxId: "32XXXXXXXXXX125",
      pan: "XXXXX1234X",
      phone: "+91 98765 43210",
      email: "accounts@acme.com",
      mobile: "+91 98765 43210",
      contactPerson: "Rahul Kumar",
      designation: "Warehouse Manager",
      deliveryInstructions: "Gate No. 3, 2nd floor. Call before delivery.",
      isPrimaryBilling: false,
      isPrimaryShipping: true,
    },
    {
      id: "addr-3",
      type: "Registered Office",
      name: "Acme Corporation - Registered Office",
      addressText: "Kochi, Kerala - 682016, India",
      country: "India",
      state: "Kerala",
      city: "Kochi",
      pincode: "682016",
      gstTreatment: "Registered Business",
      taxId: "32XXXXXXXXXX125",
      pan: "XXXXX1234X",
      phone: "+91 98765 43210",
      email: "accounts@acme.com",
      mobile: "+91 98765 43210",
      contactPerson: "Rahul Kumar",
      designation: "Accounts Manager",
      deliveryInstructions: "",
      isPrimaryBilling: false,
      isPrimaryShipping: false,
    },
    {
      id: "addr-4",
      type: "Branch Office",
      name: "Acme Corporation - Bangalore Branch",
      addressText: "Bangalore, Karnataka - 560001, India",
      country: "India",
      state: "Karnataka",
      city: "Bangalore",
      pincode: "560001",
      gstTreatment: "Registered Business",
      taxId: "32XXXXXXXXXX125",
      pan: "XXXXX1234X",
      phone: "+91 98765 43210",
      email: "accounts@acme.com",
      mobile: "+91 98765 43210",
      contactPerson: "Rahul Kumar",
      designation: "Accounts Manager",
      deliveryInstructions: "",
      isPrimaryBilling: false,
      isPrimaryShipping: false,
    },
    {
      id: "addr-5",
      type: "Other Address",
      name: "Vendor Return Address",
      addressText: "Kozhikode, Kerala - 673001, India",
      country: "India",
      state: "Kerala",
      city: "Kozhikode",
      pincode: "673001",
      gstTreatment: "Registered Business",
      taxId: "32XXXXXXXXXX125",
      pan: "XXXXX1234X",
      phone: "+91 98765 43210",
      email: "accounts@acme.com",
      mobile: "+91 98765 43210",
      contactPerson: "Rahul Kumar",
      designation: "Accounts Manager",
      deliveryInstructions: "",
      isPrimaryBilling: false,
      isPrimaryShipping: false,
    },
  ]);

  const [activeAddressId, setActiveAddressId] = useState<string | null>("addr-1");

  // Manage contacts state with initial mock contacts matching Image 1
  const [contacts, setContacts] = useState<CustomerContact[]>([
    {
      id: "cont-1",
      salutation: "Mr.",
      firstName: "Rahul",
      lastName: "Kumar",
      designation: "Accounts Manager",
      department: "Accounts",
      contactType: "Primary Contact",
      email: "rahul.kumar@acme.com",
      phone: "+91 495 123 4567",
      mobile: "+91 98765 43210",
      alternativePhone: "+91 98956 78901",
      preferredContactMethod: "Email",
      isPrimary: true,
      communicationAddress: "Acme Corporation - Head Office",
      preferredLanguage: "English",
      notes: "Primary contact used for billing communication and accounting.",
    },
    {
      id: "cont-2",
      salutation: "Ms.",
      firstName: "Anjali",
      lastName: "Menon",
      designation: "Purchase Manager",
      department: "Purchase",
      contactType: "Secondary Contact",
      email: "anjali.menon@acme.com",
      phone: "+91 495 123 4568",
      mobile: "+91 98765 43211",
      alternativePhone: "",
      preferredContactMethod: "Phone",
      isPrimary: false,
      communicationAddress: "Main Warehouse Address",
      preferredLanguage: "English",
      notes: "Handles stock purchase coordination.",
    },
    {
      id: "cont-3",
      salutation: "Mr.",
      firstName: "Sajith",
      lastName: "K.",
      designation: "Sales Executive",
      department: "Sales",
      contactType: "Secondary Contact",
      email: "sajith.k@acme.com",
      phone: "+91 495 123 4569",
      mobile: "+91 98765 43212",
      alternativePhone: "",
      preferredContactMethod: "WhatsApp",
      isPrimary: false,
      communicationAddress: "Acme Corporation - Registered Office",
      preferredLanguage: "English",
      notes: "",
    },
    {
      id: "cont-4",
      salutation: "Ms.",
      firstName: "Priya",
      lastName: "Nair",
      designation: "Logistics Coordinator",
      department: "Logistics",
      contactType: "Other",
      email: "priya.nair@acme.com",
      phone: "+91 495 123 4570",
      mobile: "+91 98765 43213",
      alternativePhone: "",
      preferredContactMethod: "Email",
      isPrimary: false,
      communicationAddress: "Acme Corporation - Bangalore Branch",
      preferredLanguage: "English",
      notes: "Coordinates deliveries and return logistics.",
    },
  ]);

  // Manage documents state with initial mock documents matching Image 5
  const [documents, setDocuments] = useState<CustomerDocument[]>([
    {
      id: "doc-1",
      name: "GST Registration Certificate",
      category: "Tax & Compliance",
      uploadedOn: "10 May 2026",
      expiryDate: "10 May 2027",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "1.2 MB",
      type: "pdf",
    },
    {
      id: "doc-2",
      name: "PAN Card",
      category: "KYC & Identity",
      uploadedOn: "10 May 2026",
      expiryDate: "—",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "512 KB",
      type: "pdf",
    },
    {
      id: "doc-3",
      name: "Bank Statement - Apr 2026",
      category: "Financial",
      uploadedOn: "08 May 2026",
      expiryDate: "—",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "85 KB",
      type: "xlsx",
    },
    {
      id: "doc-4",
      name: "Sales Agreement",
      category: "Agreements",
      uploadedOn: "05 May 2026",
      expiryDate: "05 May 2027",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "2.4 MB",
      type: "pdf",
    },
    {
      id: "doc-5",
      name: "MSME Certificate",
      category: "Tax & Compliance",
      uploadedOn: "01 Apr 2026",
      expiryDate: "31 Mar 2027",
      status: "Expiring Soon",
      uploadedBy: "John Doe",
      size: "1.1 MB",
      type: "pdf",
    },
    {
      id: "doc-6",
      name: "Trade License",
      category: "KYC & Identity",
      uploadedOn: "12 Mar 2026",
      expiryDate: "12 Mar 2026",
      status: "Expired",
      uploadedBy: "John Doe",
      size: "1.5 MB",
      type: "pdf",
    },
    {
      id: "doc-7",
      name: "Insurance Certificate",
      category: "Tax & Compliance",
      uploadedOn: "20 Feb 2026",
      expiryDate: "20 Feb 2027",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "980 KB",
      type: "pdf",
    },
    {
      id: "doc-8",
      name: "Company Profile",
      category: "KYC & Identity",
      uploadedOn: "15 Feb 2026",
      expiryDate: "—",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "320 KB",
      type: "docx",
    },
  ]);

  // Manage tags state initialized with mockup values
  const [tags, setTags] = useState<string[]>(["Corporate", "Priority", "Long Term"]);

  // Manage custom fields state initialized with mockup values
  const [customFields, setCustomFields] = useState<CustomField[]>([
    {
      id: "cf-1",
      name: "Customer Reference No.",
      value: "ACME-REF-2026-001",
      description: "Internal reference number",
    },
    {
      id: "cf-2",
      name: "Annual Turnover",
      value: "₹ 50,00,00,000.00",
      description: "Expected annual turnover",
    },
    {
      id: "cf-3",
      name: "No. of Employees",
      value: "250 - 500",
      description: "Company size",
    },
    {
      id: "cf-4",
      name: "Source",
      value: "Website",
      description: "How did we find this customer?",
    },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Sync addresses modifications into main form state
  const handleAddressChange = (id: string, field: string, value: any) => {
    setAddresses((prev) =>
      prev.map((addr) => {
        if (addr.id === id) {
          return { ...addr, [field]: value };
        }
        // If one address is set as primary billing, disable it on all other cards
        if (field === "isPrimaryBilling" && value === true) {
          return { ...addr, isPrimaryBilling: false };
        }
        return addr;
      })
    );
  };

  const handleAddAddress = () => {
    const newId = `addr-${Date.now()}`;
    const newAddr: CustomerAddress = {
      id: newId,
      type: "Billing Address",
      name: `Address ${addresses.length + 1}`,
      addressText: "",
      country: "India",
      state: "Kerala",
      city: "",
      pincode: "",
      gstTreatment: "Registered Business",
      taxId: "",
      pan: "",
      phone: "",
      email: "",
      mobile: "",
      contactPerson: "",
      designation: "",
      deliveryInstructions: "",
      isPrimaryBilling: addresses.length === 0,
      isPrimaryShipping: false,
    };
    setAddresses((prev) => [...prev, newAddr]);
    setActiveAddressId(newId);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    if (activeAddressId === id) {
      const remaining = addresses.filter((addr) => addr.id !== id);
      setActiveAddressId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // Contact Mutators
  const handleAddContact = () => {
    const newId = `cont-${Date.now()}`;
    const newContact: CustomerContact = {
      id: newId,
      salutation: "Mr.",
      firstName: "",
      lastName: "",
      designation: "",
      department: "",
      contactType: "Secondary Contact",
      email: "",
      phone: "",
      mobile: "",
      alternativePhone: "",
      preferredContactMethod: "Email",
      isPrimary: contacts.length === 0,
      communicationAddress: "",
      preferredLanguage: "English",
      notes: "",
    };
    setContacts((prev) => [...prev, newContact]);
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateContact = (id: string, field: keyof CustomerContact, value: any) => {
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        // Ensure only one contact is primary
        if (field === "isPrimary" && value === true) {
          return { ...c, isPrimary: false };
        }
        return c;
      })
    );
  };

  // Document upload mock handler
  const handleUploadDocument = () => {
    const newId = `doc-${Date.now()}`;
    const newDoc: CustomerDocument = {
      id: newId,
      name: `Uploaded Document ${documents.length + 1}`,
      category: "KYC & Identity",
      uploadedOn: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      expiryDate: "—",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "450 KB",
      type: "pdf",
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  // Tags Handlers
  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  // Custom Fields Handlers
  const handleAddCustomField = (field: Omit<CustomField, "id">) => {
    const newField: CustomField = {
      id: `cf-${Date.now()}`,
      ...field,
    };
    setCustomFields((prev) => [...prev, newField]);
  };

  const handleDeleteCustomField = (id: string) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpdateCustomField = (id: string, name: string, value: string, description: string) => {
    setCustomFields((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          return { ...f, name, value, description };
        }
        return f;
      })
    );
  };

  const handleSave = async (isDraft = false) => {
    setIsSaving(true);
    try {
      const payload = {
        name: formState.name || "Unnamed Customer",
        type: formState.type,
        industry: formState.industry,
        addresses: addresses.map((addr) => ({
          type: addr.type,
          name: addr.name,
          addressText: addr.addressText,
          city: addr.city,
          state: addr.state,
          country: addr.country,
          postalCode: addr.pincode,
          email: addr.email,
          phone: addr.phone,
          taxId: addr.taxId,
        })),
        contacts: contacts.map((c) => ({
          name: `${c.firstName} ${c.lastName}`.trim(),
          designation: c.designation,
          email: c.email,
          phone: c.mobile,
          isPrimary: c.isPrimary,
        })),
        contact: {
          email: formState.email,
          phone: formState.phone,
          website: formState.website,
          taxId: formState.taxId,
        },
        payment: {
          creditLimit: formState.creditLimit,
          paymentTerms: formState.paymentTerms,
          currency: formState.currency,
        },
        status: isDraft ? "draft" : "active",
        notes: formState.notes,
        tags,
        customFields,
      };

      await createCustomer({ payload });
      navigate("/valyron/party/customer");
    } catch (error) {
      console.error("Failed to save customer:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/valyron/party/customer")}
            aria-label="Back to customer list"
            type="button"
            className="h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Sales</span>
              <span>&gt;</span>
              <span>Customers</span>
              <span>&gt;</span>
              <span className="font-medium text-foreground">Create Customer</span>
            </div>
            <h1 className="text-xl font-bold mt-1 text-foreground">Create Customer</h1>
            <p className="text-xs text-muted-foreground">Add a new customer to your organization.</p>
          </div>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <Button
            variant="outline"
            onClick={() => navigate("/valyron/party/customer")}
            type="button"
            className="text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave(true)}
            disabled={isSaving}
            type="button"
            className="text-xs font-semibold"
          >
            Save as Draft
          </Button>
          <div className="flex items-center">
            <Button
              onClick={() => handleSave(false)}
              disabled={isSaving}
              type="button"
              className="text-xs font-semibold rounded-r-none"
            >
              <Save className="mr-1.5 h-3.5 w-3.5" /> Save Customer
            </Button>
            <Button
              size="icon"
              disabled={isSaving}
              type="button"
              className="h-9 w-9 rounded-l-none border-l border-primary-foreground/20"
              aria-label="More save options"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList variant="line" className="w-full justify-start border-b border-border overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-none">
          <TabsTrigger value="general" className="flex-none text-xs font-medium">General</TabsTrigger>
          <TabsTrigger value="addresses" className="flex-none text-xs font-medium">Addresses</TabsTrigger>
          <TabsTrigger value="contacts" className="flex-none text-xs font-medium">Contacts</TabsTrigger>
          <TabsTrigger value="financial" className="flex-none text-xs font-medium">Financial</TabsTrigger>
          <TabsTrigger value="sales-pricing" className="flex-none text-xs font-medium">Sales &amp; Pricing</TabsTrigger>
          <TabsTrigger value="accounting" className="flex-none text-xs font-medium">Accounting</TabsTrigger>
          <TabsTrigger value="documents" className="flex-none text-xs font-medium">Documents</TabsTrigger>
          <TabsTrigger value="additional" className="flex-none text-xs font-medium">Additional</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-6 items-start">
          {/* Main Column */}
          <div className="min-w-0">
            <TabsContent value="general" className="mt-0 focus-visible:outline-none">
              <CustomerGeneralSection
                formState={formState}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
              />
            </TabsContent>

            <TabsContent value="addresses" className="mt-0 focus-visible:outline-none">
              <CustomerAddressesSection
                addresses={addresses}
                activeAddressId={activeAddressId}
                setActiveAddressId={setActiveAddressId}
                onAddressChange={handleAddressChange}
                onAddAddress={handleAddAddress}
                onDeleteAddress={handleDeleteAddress}
              />
            </TabsContent>

            <TabsContent value="contacts" className="mt-0 focus-visible:outline-none">
              <CustomerContactsSection
                contacts={contacts}
                addresses={addresses}
                onAddContact={handleAddContact}
                onDeleteContact={handleDeleteContact}
                onUpdateContact={handleUpdateContact}
              />
            </TabsContent>

            <TabsContent value="financial" className="mt-0 focus-visible:outline-none">
              <CustomerFinancialSection
                formState={formState}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
              />
            </TabsContent>

            <TabsContent value="sales-pricing" className="mt-0 focus-visible:outline-none">
              <CustomerSalesPricingSection
                formState={formState}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
              />
            </TabsContent>

            <TabsContent value="accounting" className="mt-0 focus-visible:outline-none">
              <CustomerAccountingSection
                formState={formState}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
              />
            </TabsContent>

            <TabsContent value="documents" className="mt-0 focus-visible:outline-none">
              <CustomerDocumentsSection
                documents={documents}
                onUploadDocument={handleUploadDocument}
              />
            </TabsContent>

            <TabsContent value="additional" className="mt-0 focus-visible:outline-none">
              <CustomerAdditionalSection
                formState={formState}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                customFields={customFields}
                onAddCustomField={handleAddCustomField}
                onDeleteCustomField={handleDeleteCustomField}
                onUpdateCustomField={handleUpdateCustomField}
                tags={tags}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
              />
            </TabsContent>
          </div>

          {/* Sticky Preview Sidebar */}
          <aside className="lg:sticky lg:top-6 space-y-4">
            <CustomerPreviewSection
              customer={formState}
              contacts={contacts}
              setActiveTab={setActiveTab}
            />
          </aside>
        </div>
      </Tabs>
    </div>
  );
}
