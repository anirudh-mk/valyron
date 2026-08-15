import {
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  FileText
} from "lucide-react"

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
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: false,
      items: [],
    },
    {
      title: "Sales",
      url: "/dashboard/sales/dashboard",
      icon: TrendingUp,
      isActive: false,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard/sales/dashboard",
        },
        {
          title: "Invoices",
          url: "/dashboard/sales/invoice",
        },
        {
          title: "Sales Orders",
          url: "/dashboard/sales/order",
        },
        {
          title: "Customers",
          url: "/valyron/party/customer",
        },
        {
          title: "Products",
          url: "/valyron/products",
        },
        {
          title: "Sales Returns",
          url: "/dashboard/sales/return",
        },
      ],
    },
    {
      title: "Estimates",
      url: "/dashboard/sales/estimate",
      icon: FileText,
      isActive: true,
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
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Settings",
      url: "#",
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
  projects: [
    // {
    //   name: "Design Engineering",
    //   url: "#",
    //   icon: Frame,
    // },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
  ],
}