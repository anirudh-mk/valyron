import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/base/tabs.tsx";
import { Button } from "@/components/base/button.tsx";
import { ArrowLeft, ChevronDown, Save } from "lucide-react";
import SupplierGeneralSection from "../sections/SupplierGeneralSection";
import SupplierAddressesSection, { type SupplierAddress } from "../sections/SupplierAddressesSection";
import SupplierContactsSection, { type SupplierContact } from "../sections/SupplierContactsSection";
import SupplierFinancialSection from "../sections/SupplierFinancialSection";
import SupplierPurchasingPricingSection, { type SupplierItemPricing } from "../sections/SupplierPurchasingPricingSection";
import SupplierAccountingSection from "../sections/SupplierAccountingSection";
import SupplierDocumentsSection, { type SupplierDocument } from "../sections/SupplierDocumentsSection";
import SupplierAdditionalSection from "../sections/SupplierAdditionalSection";
import SupplierPreviewSection from "../sections/SupplierPreviewSection";
import { createCustomer } from "@/services/customerService";

export default function SupplierCreate() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form state matching the design from supplier screen mockups
  const [formState, setFormState] = useState({
    name: "Acme Supplies Pvt Ltd",
    code: "SUP-000124",
    type: "Goods Supplier",
    group: "Raw Materials",
    email: "supplier@email.com",
    phone: "+91 98765 43210",
    alternatePhone: "",
    website: "www.acmesupplies.com",
    currency: "INR - Indian Rupee",
    preferredContact: "Email",
    gstTreatment: "Registered Business",
    gstin: "32XXXXXXXXXX125",
    pan: "XXXXX1234X",
    countryOfRegistration: "India",
    yearEstablished: "2015",
    status: "Active",
    industry: "Manufacturing",
    natureOfBusiness: "Goods Supplier",
    vendorSince: "10 May 2026",
    annualTurnover: "₹ 50 Cr - ₹ 250 Cr",
    businessDescription: "",
    bankName: "HDFC Bank",
    accountHolderName: "Acme Supplies Pvt Ltd",
    accountNumber: "5010 1234 5678 90",
    ifscCode: "HDFCC0001234",
    notes: "Primary supplier for raw materials and packaging items.",
    creditLimit: "500000.00",
    creditLimitCurrency: "INR",
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
    approvalRequiredBy: "Procurement Manager",
    notifyCreditApproachesLimit: true,
    preferredPaymentMethod: "Bank Transfer",
    discountAllowed: "Yes",
    cashDiscountPercent: "2.00",
    cashDiscountTerms: "Within 10 days",
    priceList: "Default Supplier Price List",
    salesperson: "John Smith",
    customerGroup: "Raw Materials",
    salesChannel: "Direct Procurement",
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
    specialPricing: "Supplier Specific",
    requireSalesOrder: false,
    requireCustomerPO: true,
    allowBackdatedInvoices: true,
    allowCreditSales: true,
    minOrderAmount: "10000.00",
    minInvoiceAmount: "5000.00",
    partialDelivery: true,
    defaultWarehouse: "Main Warehouse",
    shipFromAddress: "Main Warehouse Address",
    deliveryPriority: "Normal",
    incoterms: "FOB",
    receivableAccount: "20000 - Accounts Payable",
    salesAccount: "51000 - Purchase Expenses",
    advanceAccount: "11000 - Advance to Suppliers",
    writeOffAccount: "53000 - Bad Debts",
    taxCategory: "Inter-State",
    placeOfSupply: "Kerala (32)",
    gstType: "Regular",
    eInvoicingApplicable: true,
    tan: "BLRA12345B",
    cin: "",
    msmeRegistrationNo: "",
    fssaiNo: "",
    itcEligibility: "Eligible",
    tcsApplicable: "No",
    exchangeRateType: "Default Company Rate",
    exchangeRate: "1.0000",
    openingBalance: "25000.00",
    openingBalanceDate: "2024-04-01",
    preferredLanguage: "English",
    timezone: "Asia/Kolkata (UTC +05:30)",
    communicationPreference: "Email",
    preferredContactMethod: "Email",
    marketingEmails: true,
    smsNotifications: false,
    region: "South India",
    defaultPricePrecision: "2 Decimal Places",
    defaultQuantityPrecision: "2 Decimal Places",
    dateFormat: "DD MMM YYYY",
    numberFormat: "Indian (1,23,456.78)",
    advancePaymentPercent: "0.00",
    tdsApplicable: "Yes",
    tdsRatePercent: "0.00",
    accountType: "Current Account",
    branch: "MG Road, Bangalore",
    upiId: "acmesupplies@hdfcbank",
    taxRegistrationType: "Regular",
    isECommerceOperator: false,
    interestOnOverduePercent: "18.00",
    interestGracePeriodDays: "0",
    roundingOff: "2 Decimal Places",
    cashDiscountPercentFinancial: "2.00",
    purchaseUom: "Nos",
    minOrderValue: "5000.00",
    minOrderValueCurrency: "INR",
    leadTimeDays: "7",
    confirmingOrder: "By Email",
    orderAcknowledgementRequired: true,
    acknowledgementWithinDays: "2",
    supplierConfirmationRequired: "For All Orders",
    freightTerms: "To Pay",
    inspectionRequired: false,
    qualityCheckRequired: true,
    priceValidityDays: "30",
    rateRevisionFrequency: "Monthly",
    pricingBasis: "Item Wise",
    discountStructure: "Item Discount",
    taxExclusivePricing: true,
    payableAccountName: "Accounts Payable",
    taxPayableAccount: "22000 - GST Payable",
    discountReceivedAccount: "31000 - Purchase Discounts",
    exchangeRateVarianceAccount: "39000 - Exchange Rate Gain/Loss",
    paymentDiscountAccount: "32500 - Payment Discounts",
    tdsPayableAccount: "22010 - TDS Payable",
    dueDateBasis: "Invoice Date",
    paymentAdviceRequired: true,
    paymentAdviceFormat: "Detailed",
    autoReconciliation: true,
    matchingTolerancePercent: "2.00",
    creditLimitCheck: "On Invoice",
    blockTransactionsCreditExceeded: false,
    allowAdvancePayment: true,
    retainageAccount: "15000 - Retainage Payable",
    retainagePercent: "0.00",
    defaultCostCenter: "",
    defaultProject: "",
    defaultDepartment: "",
    accountingNotes: "",
    ownershipType: "Private Limited",
    legalName: "Acme Supplies Private Limited",
    notesLanguage: "English",
    preferredDeliveryPartner: "Delivery",
    freightPayableBy: "Supplier",
    deliveryInstructions: "Goods to be delivered between 9 AM - 6 PM on working days.",
    swiftCode: "HDFCINBB",
  });

  // Manage addresses state with initial values matching Image 8
  const [addresses, setAddresses] = useState<SupplierAddress[]>([
    {
      id: "addr-1",
      type: "Registered",
      name: "Registered Office",
      addressLine1: "Acme Supplies Pvt Ltd, 123, Industrial Estate",
      addressLine2: "Phase 2",
      landmark: "Near Forum Shantiniketan",
      city: "Whitefield",
      state: "Karnataka",
      country: "India",
      pincode: "560066",
      gstPlaceOfSupply: "Karnataka (29)",
      isBilling: true,
      isShipping: true,
      status: "Active",
    },
    {
      id: "addr-2",
      type: "Billing",
      name: "Billing Address",
      addressLine1: "Acme Supplies Pvt Ltd, #45, 2nd Floor, MG Road",
      addressLine2: "",
      landmark: "",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      pincode: "560001",
      gstPlaceOfSupply: "Karnataka (29)",
      isBilling: true,
      isShipping: false,
      status: "Active",
    },
    {
      id: "addr-3",
      type: "Shipping",
      name: "Warehouse / Shipping Address",
      addressLine1: "Acme Supplies Pvt Ltd, Plot No. 88, KIADB Industrial Area",
      addressLine2: "Hoskote, Bangalore - 562114",
      landmark: "",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      pincode: "562114",
      gstPlaceOfSupply: "Karnataka (29)",
      isBilling: false,
      isShipping: true,
      status: "Active",
    },
  ]);

  const [activeAddressId, setActiveAddressId] = useState<string | null>("addr-1");

  // Manage contacts state with initial mock contacts matching Image 9
  const [contacts, setContacts] = useState<SupplierContact[]>([
    {
      id: "cont-1",
      name: "Ravi Sharma",
      designation: "Purchase Manager",
      phone: "+91 98765 43210",
      email: "ravi.sharma@supplier.com",
      isPrimary: true,
      status: "Active",
      alternatePhone: "",
      relationship: "Primary Contact",
      alternateEmail: "ravi.s@supplier.com",
      preferredCommunication: "Email",
      notes: "",
    },
    {
      id: "cont-2",
      name: "Anita Pillai",
      designation: "Accounts Manager",
      phone: "+91 91234 56789",
      email: "anita.pillai@supplier.com",
      isPrimary: true,
      status: "Active",
      alternatePhone: "",
      relationship: "Primary Contact",
      alternateEmail: "",
      preferredCommunication: "Email",
      notes: "",
    },
    {
      id: "cont-3",
      name: "Suresh Shetty",
      designation: "Sales Executive",
      phone: "+91 99887 66554",
      email: "suresh.shetty@supplier.com",
      isPrimary: false,
      status: "Active",
      alternatePhone: "",
      relationship: "Alternate Contact",
      alternateEmail: "",
      preferredCommunication: "WhatsApp",
      notes: "",
    },
    {
      id: "cont-4",
      name: "Megha Kulkarni",
      designation: "Logistics Coordinator",
      phone: "+91 93412 67890",
      email: "megha.kulkarni@supplier.com",
      isPrimary: false,
      status: "Active",
      alternatePhone: "",
      relationship: "Alternate Contact",
      alternateEmail: "",
      preferredCommunication: "Email",
      notes: "",
    },
  ]);

  // Manage Item Pricing list matching Image 11
  const [itemPricing, setItemPricing] = useState<SupplierItemPricing[]>([
    {
      id: "ip-1",
      itemGroup: "Stainless Steel Sheet",
      itemCode: "SS-SHEET-001",
      uom: "Nos",
      standardPrice: "850.00",
      discountPercent: "5.00",
      effectiveFrom: "01 Apr 2024",
      effectiveTo: "31 Mar 2025",
    },
    {
      id: "ip-2",
      itemGroup: "Mild Steel Rod 12mm",
      itemCode: "MS-ROD-012",
      uom: "Kg",
      standardPrice: "72.00",
      discountPercent: "2.00",
      effectiveFrom: "01 Apr 2024",
      effectiveTo: "31 Mar 2025",
    },
    {
      id: "ip-3",
      itemGroup: "Packaging Box",
      itemCode: "PKG-BOX-001",
      uom: "Nos",
      standardPrice: "28.00",
      discountPercent: "0.00",
      effectiveFrom: "01 Apr 2024",
      effectiveTo: "—",
    },
  ]);

  // Manage documents state with initial mock documents matching Image 13
  const [documents, setDocuments] = useState<SupplierDocument[]>([
    {
      id: "doc-1",
      name: "GST Registration Certificate",
      category: "GST Certificate",
      uploadedOn: "01 Apr 2024",
      expiryDate: "—",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "1.2 MB",
      type: "pdf",
      documentNumber: "29ABCDE1234F1Z5",
    },
    {
      id: "doc-2",
      name: "PAN Card",
      category: "Tax Document",
      uploadedOn: "15 Mar 2024",
      expiryDate: "—",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "512 KB",
      type: "pdf",
      documentNumber: "ABCDE1234F",
    },
    {
      id: "doc-3",
      name: "MSME Certificate",
      category: "Registration",
      uploadedOn: "20 May 2024",
      expiryDate: "19 May 2027",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "800 KB",
      type: "pdf",
      documentNumber: "UDYAM-KR-03-0001234",
    },
    {
      id: "doc-4",
      name: "Bank Statement",
      category: "Financial",
      uploadedOn: "01 May 2024",
      expiryDate: "31 May 2024",
      status: "Expiring Soon",
      uploadedBy: "John Doe",
      size: "1.5 MB",
      type: "pdf",
      documentNumber: "HDFC-2024-05",
      expiryAlertText: "(Expiring in 5 days)",
    },
    {
      id: "doc-5",
      name: "ISO 9001:2015 Certificate",
      category: "Quality Certificate",
      uploadedOn: "10 Jan 2024",
      expiryDate: "09 Jan 2025",
      status: "Expired",
      uploadedBy: "John Doe",
      size: "2.1 MB",
      type: "pdf",
      documentNumber: "ISO/9001/2024/556",
      expiryAlertText: "(Expired)",
    },
    {
      id: "doc-6",
      name: "Trade License",
      category: "License",
      uploadedOn: "05 Apr 2024",
      expiryDate: "04 Apr 2025",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "650 KB",
      type: "pdf",
      documentNumber: "TL/BNG/2024/9987",
    },
    {
      id: "doc-7",
      name: "Supplier Agreement",
      category: "Agreement",
      uploadedOn: "15 Apr 2024",
      expiryDate: "14 Apr 2026",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "3.4 MB",
      type: "pdf",
      documentNumber: "AGR/2024/014",
    },
    {
      id: "doc-8",
      name: "Cancelled Cheque",
      category: "Bank Document",
      uploadedOn: "01 Apr 2024",
      expiryDate: "—",
      status: "Verified",
      uploadedBy: "John Doe",
      size: "450 KB",
      type: "pdf",
    },
  ]);

  // Manage tags state
  const [tags, setTags] = useState<string[]>(["Reliable", "Preferred", "High Priority"]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (id: string, field: string, value: any) => {
    setAddresses((prev) =>
      prev.map((addr) => {
        if (addr.id === id) {
          return { ...addr, [field]: value };
        }
        return addr;
      })
    );
  };

  const handleAddAddress = () => {
    const newId = `addr-${Date.now()}`;
    const newAddr: SupplierAddress = {
      id: newId,
      type: "Billing",
      name: `Address ${addresses.length + 1}`,
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      state: "Karnataka",
      country: "India",
      pincode: "",
      gstPlaceOfSupply: "Karnataka (29)",
      isBilling: false,
      isShipping: false,
      status: "Active",
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

  const handleAddContact = () => {
    const newId = `cont-${Date.now()}`;
    const newContact: SupplierContact = {
      id: newId,
      name: "",
      designation: "",
      phone: "+91 ",
      email: "",
      isPrimary: false,
      status: "Active",
      alternatePhone: "",
      relationship: "Alternate Contact",
      alternateEmail: "",
      preferredCommunication: "Email",
      notes: "",
    };
    setContacts((prev) => [...prev, newContact]);
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateContact = (id: string, field: keyof SupplierContact, value: any) => {
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  const handleAddItemPricing = (item: Omit<SupplierItemPricing, "id">) => {
    const newId = `ip-${Date.now()}`;
    setItemPricing((prev) => [...prev, { id: newId, ...item }]);
  };

  const handleDeleteItemPricing = (id: string) => {
    setItemPricing((prev) => prev.filter((ip) => ip.id !== id));
  };

  const handleUpdateItemPricing = (id: string, field: keyof SupplierItemPricing, value: any) => {
    setItemPricing((prev) =>
      prev.map((ip) => {
        if (ip.id === id) {
          return { ...ip, [field]: value };
        }
        return ip;
      })
    );
  };

  const handleUploadDocument = () => {
    const newId = `doc-${Date.now()}`;
    const newDoc: SupplierDocument = {
      id: newId,
      name: `Uploaded Document ${documents.length + 1}`,
      category: "Tax Document",
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

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSave = async (isDraft = false) => {
    setIsSaving(true);
    try {
      const payload = {
        name: formState.name || "Unnamed Supplier",
        type: formState.type,
        industry: formState.industry,
        addresses: addresses.map((addr) => ({
          type: addr.type,
          name: addr.name,
          addressText: `${addr.addressLine1} ${addr.addressLine2}`.trim(),
          city: addr.city,
          state: addr.state,
          country: addr.country,
          postalCode: addr.pincode,
          email: formState.email,
          phone: formState.phone,
          taxId: formState.gstin,
        })),
        contacts: contacts.map((c) => ({
          name: c.name,
          designation: c.designation,
          email: c.email,
          phone: c.phone,
          isPrimary: c.isPrimary,
        })),
        contact: {
          email: formState.email,
          phone: formState.phone,
          website: formState.website,
          taxId: formState.gstin,
        },
        payment: {
          creditLimit: formState.creditLimit,
          paymentTerms: formState.paymentTerms,
          currency: formState.currency,
        },
        status: isDraft ? "draft" : "active",
        notes: formState.notes,
        party_type: "supplier",
        tags,
        itemPricing,
      };

      await createCustomer({ payload });
      navigate("/valyron/party/supplier");
    } catch (error) {
      console.error("Failed to save supplier:", error);
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
            onClick={() => navigate("/valyron/party/supplier")}
            aria-label="Back to supplier list"
            type="button"
            className="h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Purchases</span>
              <span>&gt;</span>
              <span>Suppliers</span>
              <span>&gt;</span>
              <span className="font-medium text-foreground">Create Supplier</span>
            </div>
            <h1 className="text-xl font-bold mt-1 text-foreground">Create Supplier</h1>
            <p className="text-xs text-muted-foreground">Add a new supplier to your organization.</p>
          </div>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <Button
            variant="outline"
            onClick={() => navigate("/valyron/party/supplier")}
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
              <Save className="mr-1.5 h-3.5 w-3.5" /> Save Supplier
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
          <TabsTrigger value="purchasing-pricing" className="flex-none text-xs font-medium">Purchasing &amp; Pricing</TabsTrigger>
          <TabsTrigger value="accounting" className="flex-none text-xs font-medium">Accounting</TabsTrigger>
          <TabsTrigger value="documents" className="flex-none text-xs font-medium">Documents</TabsTrigger>
          <TabsTrigger value="additional" className="flex-none text-xs font-medium">Additional</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-6 items-start">
          {/* Main Column */}
          <div className="min-w-0">
            <TabsContent value="general" className="mt-0 focus-visible:outline-none">
              <SupplierGeneralSection
                formState={formState}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
              />
            </TabsContent>

            <TabsContent value="addresses" className="mt-0 focus-visible:outline-none">
              <SupplierAddressesSection
                addresses={addresses}
                activeAddressId={activeAddressId}
                setActiveAddressId={setActiveAddressId}
                onAddressChange={handleAddressChange}
                onAddAddress={handleAddAddress}
                onDeleteAddress={handleDeleteAddress}
              />
            </TabsContent>

            <TabsContent value="contacts" className="mt-0 focus-visible:outline-none">
              <SupplierContactsSection
                contacts={contacts}
                onAddContact={handleAddContact}
                onDeleteContact={handleDeleteContact}
                onUpdateContact={handleUpdateContact}
              />
            </TabsContent>

            <TabsContent value="financial" className="mt-0 focus-visible:outline-none">
              <SupplierFinancialSection
                formState={formState}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
              />
            </TabsContent>

            <TabsContent value="purchasing-pricing" className="mt-0 focus-visible:outline-none">
              <SupplierPurchasingPricingSection
                formState={formState}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                itemPricing={itemPricing}
                onAddItemPricing={handleAddItemPricing}
                onDeleteItemPricing={handleDeleteItemPricing}
                onUpdateItemPricing={handleUpdateItemPricing}
              />
            </TabsContent>

            <TabsContent value="accounting" className="mt-0 focus-visible:outline-none">
              <SupplierAccountingSection
                formState={formState}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
              />
            </TabsContent>

            <TabsContent value="documents" className="mt-0 focus-visible:outline-none">
              <SupplierDocumentsSection
                documents={documents}
                onUploadDocument={handleUploadDocument}
              />
            </TabsContent>

            <TabsContent value="additional" className="mt-0 focus-visible:outline-none">
              <SupplierAdditionalSection
                formState={formState}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                tags={tags}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
              />
            </TabsContent>
          </div>

          {/* Sticky Preview Sidebar */}
          <aside className="lg:sticky lg:top-6 space-y-4">
            <SupplierPreviewSection
              supplier={formState}
              contacts={contacts}
              addresses={addresses}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
          </aside>
        </div>
      </Tabs>
    </div>
  );
}
