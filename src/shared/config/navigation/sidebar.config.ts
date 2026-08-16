import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  FileText,
  Settings2,
  SquareTerminal,
  PieChart,
} from "lucide-react";

export const sidebarConfig = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shaedcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  groups: [
    {
      label: "Platform",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: SquareTerminal,
          isActive: false,
          items: [],
        },
      ],
    },
    {
      label: "Sales",
      items: [
        {
          title: "Sales Dashboard",
          url: "/dashboard/sales/dashboard",
          icon: TrendingUp,
          isActive: false,
          items: [],
        },
        {
          title: "Leads & Opportunities",
          url: "/dashboard/sales/leads",
          icon: Users,
          isActive: false,
          items: [
            {
              title: "Leads",
              url: "/dashboard/sales/leads",
            },
            {
              title: "Opportunities",
              url: "/dashboard/sales/opportunities",
            },
            {
              title: "Activities",
              url: "/dashboard/sales/activities",
            },
            {
              title: "Follow-ups",
              url: "/dashboard/sales/followups",
            },
            {
              title: "Sales Pipeline",
              url: "/dashboard/sales/pipeline",
            },
          ],
        },
        {
          title: "Estimates",
          url: "/dashboard/sales/estimate/list",
          icon: FileText,
          isActive: false,
          items: [
            {
              title: "Estimate List",
              url: "/dashboard/sales/estimate/list",
            },
            {
              title: "Create Estimate",
              url: "/dashboard/sales/estimate/create",
            },
            {
              title: "Estimate Details",
              url: "/dashboard/sales/estimate/details",
            },
            {
              title: "Estimate Revisions",
              url: "/dashboard/sales/estimate/revisions",
            },
            {
              title: "Estimate Approval",
              url: "/dashboard/sales/estimate/approval",
            },
            {
              title: "Estimate → Quotation",
              url: "/dashboard/sales/estimate/to-quotation",
            },
          ],
        },
        {
          title: "Quotations",
          url: "/dashboard/sales/quotation/list",
          icon: FileText,
          isActive: false,
          items: [
            {
              title: "Quotation List",
              url: "/dashboard/sales/quotation/list",
            },
            {
              title: "Send Quotations",
              url: "/dashboard/sales/quotation/send",
            },
            {
              title: "Expired Quotations",
              url: "/dashboard/sales/quotation/expired",
            },
            {
              title: "Quotation Approvals",
              url: "/dashboard/sales/quotation/approval",
            },
          ],
        },
        {
          title: "Sales Orders",
          url: "/dashboard/sales/order",
          icon: FileText,
          items: [],
        },
        {
          title: "Invoices",
          url: "/dashboard/sales/invoice",
          icon: FileText,
          items: [],
        },
        {
          title: "Sales Returns",
          url: "/dashboard/sales/return",
          icon: FileText,
          items: [],
        },
      ],
    },
    {
      label: "Purchase",
      items: [
        {
          title: "Purchase",
          url: "/valyron/purchase/invoice",
          icon: ShoppingCart,
          isActive: false,
          items: [
            {
              title: "Invoice",
              url: "/valyron/purchase/invoice",
            },
            {
              title: "Order",
              url: "/valyron/purchase/order",
            },
            {
              title: "Return",
              url: "/valyron/purchase/return",
            },
          ],
        },
      ],
    },
    {
      label: "Contacts",
      items: [
        {
          title: "Party",
          url: "/valyron/party/customer",
          icon: Users,
          isActive: false,
          items: [
            {
              title: "Customer",
              url: "/valyron/party/customer",
            },
            {
              title: "Supplier",
              url: "/valyron/party/supplier",
            },
          ],
        },
      ],
    },
    {
      label: "Essentials",
      items: [
        {
          title: "Products",
          url: "/valyron/products",
          icon: Package,
          items: [],
        },
        {
          title: "Reports",
          url: "/valyron/reports",
          icon: PieChart,
          items: [],
        },
        {
          title: "Settings",
          url: "/valyron/settings",
          icon: Settings2,
          items: [
            {
              title: "General",
              url: "/valyron/settings",
            },
            {
              title: "Team",
              url: "#",
            },
            {
              title: "Billing",
              url: "#",
            },
            {
              title: "Limits",
              url: "#",
            },
          ],
        },
      ],
    },
  ],
  projects: [],
};